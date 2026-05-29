import type { Message, TextChannel } from 'discord.js';
import dotenv from 'dotenv';
import basic from '../../config/basic.json' with { type: 'json' };
import { timeToJson } from '../../helper/timeHelper.js';

const isProd = (process.env.NODE_ENV === 'prod');
if (!isProd) dotenv.config();

const cooldowns = new Map();

export default {
    name: 'messageCreate',
    description: 'Activates a command upon receiving a message',
    async execute(message: Message) {
        const prefix = basic.prefix ?? '$$';
        const client = message.author.client;
        const channel = message.channel as TextChannel;
        if (message.author.bot) return;

        if (!message.content.startsWith(prefix)) {
            return;
        }

        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        const cmd = args.shift()?.toLowerCase();
        const command = client.commands.get(cmd) ?? client.commands.find(a => a.aliases && a.aliases.includes(cmd));

        // check for cooldown and apply that if necessary
        if (command && command.cooldown && !args.includes('help') && (args[0] != null)) { //|| noArgCmds.includes(command.name))) {
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Map());
            }

            const currTime = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmt = (command.cooldown) * 1000;

            // print out how much time if left on cooldown
            if (timestamps.get(message.author.id)) {
                const expTime = timestamps.get(message.author.id) + cooldownAmt;

                if (currTime < expTime) {
                    // format time in a nicer way if above 60 sec
                    const totalLeft = timeToJson(Math.floor(expTime - currTime));

                    const hDisp = totalLeft.hour > 0 ? totalLeft.hour + (totalLeft.hour == 1 ? ' hour, ' : ' hours, ') : '';
                    const mDisp = totalLeft.minute > 0 ? totalLeft.minute + (totalLeft.minute == 1 ? ' minute, and ' : ' minutes, and ') : '';
                    const sDisp = totalLeft.second > 0 ? totalLeft.second + (totalLeft.second == 1 ? ' second' : ' seconds') : '';

                    const msg = `Please wait ${hDisp + mDisp + sDisp} before using ${command.name} again.`;

                    return channel.send(msg);
                }
            }

            // updates current time in the timestamps map
            timestamps.set(message.author.id, currTime);
        }

        if (command) command.execute(message, args);
        else return channel.send('This command does not exist!');
    },
};
