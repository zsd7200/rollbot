import { type ColorResolvable, type Message, type TextChannel } from 'discord.js';
import type { Commands } from 'commands';
import { Pagination } from 'pagination.djs';
import formatConfigString from '../helper/formatConfigString.js';
import basic from '../config/basic.json' with { type: 'json' };
import config from '../config/commands.json' with { type: 'json' };

export default {
    name: 'help',
    aliases: config.help?.aliases ?? [],
    async execute(message: Message) {
        const botColor = (basic.botColor ?? '#0052FE') as ColorResolvable;
        const pagination = new Pagination(message);
        pagination
            .setColor(botColor);
        const keys = Object.keys(config);

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === '$schema' || !config[keys[i] as keyof Commands].enabled) continue;
            const name = basic.prefix + keys[i];
            const description = formatConfigString(config[keys[i] as keyof Commands].description);
            pagination.addFields([{ name: name, value: description }]);
        }
        pagination.paginateFields(true);

        return pagination.render();
    },
};