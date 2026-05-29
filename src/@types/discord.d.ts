import { Collection } from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<any, any>,
    aliases: Collection<any, any>,
    events: Collection<any, any>,
  }
}