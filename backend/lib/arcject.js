import {arcjet,shield,tokenBucket} from "@arcjet/node";

import "dotenv/config";

//init arcjet

export const aj= arcjet({
    KEY:process.env.ARCJET_KEY,
})