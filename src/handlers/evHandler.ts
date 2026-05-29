import { Client } from 'discord.js';
import fs from 'fs';

const evHandler = (client: Client) => {
    const loadDir = async (dirs: string) => {
        const evFiles = fs.readdirSync(`./dist/events/${dirs}`).filter(file => file.endsWith('.js'));

        for (const file of evFiles) {
            const ev = await import(`../events/${dirs}/${file}`);
            const evName = file.split('.')[0];
            if (evName) client.on(evName, (...args) => ev.default.execute(...args));
        }
    };
    ['client'].forEach(e => loadDir(e));
};

export default evHandler;