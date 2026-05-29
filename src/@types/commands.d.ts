declare module "commands" {
    export interface Commands {
        roll: {
            enabled: boolean,
            aliases: Array<string>,
            description: string,
            commandType: CommandType,
            cooldown: number,
            wait: {
                initial: number,
                between: number,
            },
        },
        flip: {
            enabled: boolean,
            aliases: Array<string>,
            description: string,
            commandType: CommandType,
            cooldown: number,
            wait: {
                initial: number,
                result: number,
            },
        },
        help: {
            enabled: boolean,
            aliases: Array<string>,
            description: string,
            commandType: CommandType,
            cooldown: number,
        },
    };
}

type CommandType = 'util' | 'game';
type TrendPercentType = {
    chanceToChange: number,
    changeToVariance: number,
};
type MinMaxType = {
    min: number,
    max: number,
};

export type CommandName = 
    'roll' | 'flip' | 'help';