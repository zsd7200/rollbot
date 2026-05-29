import { ColorResolvable } from "discord.js";

declare module "basic" {
    export interface Basic {
        prefix: string,
        botName: string,
        presenceMsg: string,
        timeZone: string,
        botColor: ColorResolvable,
    };
}