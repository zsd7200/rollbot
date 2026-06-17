import type { Message, TextChannel } from 'discord.js';
import { randomInt } from '../helper/randomNumber.js';
import basic from '../config/basic.json' with { type: 'json' };
import config from '../config/commands.json' with { type: 'json' };

export default {
    name: 'roll',
    aliases: config.roll?.aliases ?? [],
    cooldown: config.roll?.cooldown ?? 0,
    async execute(message: Message, args: Array<string>) {
        const channel = message.channel as TextChannel;
        const MAX_ROLLS = config.roll?.maxRolls ?? 20;
        const MAX_DIE = config.roll?.maxDie ?? 1000;
        let count = 1;
        let die = 20;
        let match = null;

        if (args[0] === '?' || args[0]?.toLowerCase() === 'help') {
            return channel.send(
                `Use this command to roll dice.\n` +
                'If you do not specify amount or type of dice, it will assume rolling one D20.\n' +
                `Syntax: **${basic.prefix ?? '$$'}roll [count] [type of die]**` +
                `${(config.roll?.aliases) ? '\nAliases: ' + config.roll.aliases.join(', ') : ''}`
            );
        }

        if (args.length > 2) {
            return channel.send(
                `Incorrect number of arguments. If you need help, please use **${basic.prefix ?? '$$'}roll help**.`,
            );
        }

        if (!args[0]) {
            args[0] = '1';
            args[1] = '20';
        }

        count = parseInt(args[0]);
        match = args[0].match(/[dD]\d*/);
        if (isNaN(count) || count == 0) {
            return channel.send(
                `Incorrect amount of dice. If you need help, please use **${basic.prefix ?? '$$'}roll help**.`,
            );
        }
        count = Math.abs(count);
        if (count >= MAX_ROLLS) {
            channel.send(
                `Maximum amount of rolls is ${MAX_ROLLS}.`
            );
            count = MAX_ROLLS;
        }

        if (args[1]) {
            if (args[1].charAt(0).toLowerCase() == 'd') {
                args[1] = args[1].substring(1);
            }

            die = parseInt(args[1]);
            if (isNaN(die)) {
                return channel.send(
                    `Incorrect type of die. If you need help, please use **${basic.prefix ?? '$$'}roll help**.`,
                );
            }
            die = Math.abs(die);
        }

        if (!args[1] && match) {
            const substr = match[0].substring(1); // matching in this way will ALWAYS have a d in front
            die = parseInt(substr);
        }

        if (die > MAX_DIE) {
            channel.send(
                `Maximum amount of die faces is ${MAX_DIE}.`
            );
            die = MAX_DIE;
        }

        channel.send(
            `Rolling ${count} d${die}...`
        );

        // make them wait for it lol
        setTimeout(() => {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const result = randomInt(0, die) + 1;
                    const content = `Roll ${i + 1}: ${
                            (result == die) 
                                ? ('**' + result + '!**') 
                                : (result == 1)
                                    ? result + '...'
                                    : result
                        }`;

                    message.reply({
                        allowedMentions: { repliedUser: false },
                        content: content,
                    });
                }, config.roll?.wait.between ?? 100);
            }
        }, config.roll?.wait.initial ?? 500);
    },
};
