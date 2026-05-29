// Require the necessary discord.js classes
import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import dotenv from 'dotenv';
import { randomInt } from './helper/randomNumber.js';
import basic from './config/basic.json' with { type: 'json' };
import cmdHandler from './handlers/cmdHandler.js';
import evHandler from './handlers/evHandler.js';

// require dotenv if not production build
const isProd = (process.env.NODE_ENV === 'prod');
if (!isProd) dotenv.config();

// set token
const token = process.env.TOKEN || '';

// Create a new client instance
const client = new Client({
    presence: { activities: [{ name: basic.presenceMsg ? basic.presenceMsg.replace('{number}', () => '' + (randomInt(0, 20) + 1)) : '$help' }] },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message],
});

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

cmdHandler(client);
evHandler(client);

// Login to Discord with your client's token
client.login(token);

export default client;