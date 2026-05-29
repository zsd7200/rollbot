import { Client } from 'discord.js';
import type { Commands } from 'commands';
import fs from 'fs';
import config from '../config/commands.json' with { type: 'json' };

const cmdHandler = async (client: Client) => {
    const cmdFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));

    for (const file of cmdFiles) {
        const cmdImport = await import(`../commands/${file}`);
        const cmd = cmdImport.default;

        if (cmd.name && (!config[cmd.name as keyof Commands] || config[cmd.name as keyof Commands].enabled)) client.commands.set(cmd.name, cmd);
        else continue;
    }
};

export default cmdHandler;