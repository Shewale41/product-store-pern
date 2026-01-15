import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcject.js";

const app = express();
const PORT = process.env.PORT || 3000;
// console.log(PORT);

app.use(helmet());  //provides various http headers and security middleware samjhe
//middlewares 
app.use(express.json());
app.use(cors());




app.use(morgan("dev")); //log the requests kitna time laga hai konsa response code hai karke


//this is rate limiting ka logic 
app.use(async (req,res,next)=>{
    try {
        const decision=await aj.protect(req,{
            requested:1, //tells that each req consumes 1 token
        });

        //yaha woh teeno cases check karenge jiske liye req denied ki hai
        //toh woh user to bata denge ki limit issue hai ,ya bot issue hai , ya kuch aur jaise ki forbidden
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({error:"Too many requests broo"});
            }else if(decision.reason.isBot()){
                res.status(403).json({error:"Bot access denied"});
            }else{
                res.status(403).json({error:"Forbidden"});
            }
            return; 
        }

        //check for spoofed bots - aise bots jo khudko bot nahi dikhate ya samjhte (shaane wale bots)
        if(decision.result.some((result)=>result.reason.isBot() && result.reason.isSpoofed() )){
            res.status(403).json({error:"Spoofed Bot detected"});
            return;
        }
        next()        
    } catch (error) {
        console.log("Arcject error :",error);
        next(error);
    }
});

app.use('/api/products',productRoutes);

async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        console.log("Database intialized successfully");
    } catch (error) {
        console.log("initDB error",error.message);
    }
}

initDB().then(()=>
    app.listen(PORT,()=>{
    console.log("server is runnig on port " + PORT);
})
)

app.get("/",(req,res)=>{
    // console.log(res.getHeaders());  //just to see what headers are there for security and all 
    res.send("hello from the backend ")
});

