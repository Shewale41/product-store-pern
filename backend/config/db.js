import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGHOST,PGUSER ,PGDATABASE , PGPASSWORD }= process.env;

//creates a SQL connection using apna env
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
)
//yeh sql function se we can write sql queries
