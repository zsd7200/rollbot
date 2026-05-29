import basic from '../config/basic.json' with { type: 'json' };

type ConfigArgs = {
    toReplace: string,
    replaceWith: string,
};

const formatConfigString = (message: string, args: Array<ConfigArgs> = []) => {
    // use callback functions for prefix/currency/botname since $$ = $ in replace
    let returnStr = message
        .replace('basic.prefix', () => basic.prefix)
        .replace('basic.botName', () => basic.botName);

    if (args.length == 0) return returnStr;

    for (let i = 0; i < args.length; i++) {
        returnStr.replace(args[i]?.toReplace ?? '', args[i]?.replaceWith ?? '');
    }

    return returnStr;
};

export default formatConfigString;

