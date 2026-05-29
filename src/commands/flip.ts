import type { Message, TextChannel } from 'discord.js';
import { randomInt } from '../helper/randomNumber.js';
import basic from '../config/basic.json' with { type: 'json' };
import config from '../config/commands.json' with { type: 'json' };

export default {
    name: 'flip',
    aliases: config.flip?.aliases ?? [],
    cooldown: config.flip?.cooldown ?? 0,
    async execute(message: Message, args: Array<string>) {
        const channel = message.channel as TextChannel;
        const acceptable = ['heads', 'tails',];
        let desiredOutcome;

        if (args[0] === '?' || args[0]?.toLowerCase() === 'help') {
            return channel.send(
                `Use this command to flip a coin.\n` +
                'If you do not specify heads or tails, it will assume **heads**.\n' +
                `Syntax: **${basic.prefix ?? '$$'}flip [heads or tails]**` +
                `${(config.flip?.aliases) ? '\nAliases: ' + config.flip.aliases.join(', ') : ''}`
            );
        }

        if (args.length > 1) {
            return channel.send(
                `Incorrect number of arguments. If you need help, please use **${basic.prefix ?? '$$'}flip help**.`,
            );
        }

        if (!args[0] || !acceptable.includes(args[0].toLowerCase().trim())) {
            args[0] = 'heads';
        }

        desiredOutcome = args[0].toLowerCase().trim();

        channel.send(
            `Flipping for ${desiredOutcome}...`
        );

        // make them wait for it lol
        setTimeout(() => {
            channel.send(
                'The result is...',
            );

            setTimeout(() => {
                const result = randomInt(0, 2);

                if ((desiredOutcome.toLowerCase() === 'heads' && result === 0) ||
                   (desiredOutcome.toLowerCase() === 'tails' && result === 1)) {
                    channel.send(
                        `**${desiredOutcome.toUpperCase()}**! You win! \n` +
                        'Congratulations!'
                    );
                }
                else {
                    const face = (desiredOutcome?.toLowerCase() === 'heads') ? 'Tails' : 'Heads';
                    channel.send(
                        '**' + face + '**...\n' +
                        `You lost, better luck next time.\n`
                    );
                }
            }, config.flip?.wait.result ?? 1000);
        }, config.flip?.wait.initial ?? 500);
    },
};
