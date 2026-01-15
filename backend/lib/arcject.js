import {arcjet,detectBot,shield,tokenBucket} from "@arcjet/node";

import "dotenv/config";

//init arcjet

export const aj= arcjet({
    key:process.env.ARCJET_KEY,
    characteristics:["ip_src"],
    rules:[
        //shield protects our app from xss,csrf,sql injection attacks
        shield({mode:"LIVE"}),
        //detects and block bots 
        detectBot({
            mode:"LIVE",
            //allows only the mentioned bots and other bots will be denied
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),

        //rate limiting
        tokenBucket({
            mode:"LIVE",
            refillRate:5,
            interval:10,
            capacity:10,
        }),
    ],
})