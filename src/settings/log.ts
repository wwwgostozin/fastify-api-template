import chalk from "chalk";

type LogParams = [message?: any, ...params: any[]];
function info(...params: LogParams){
    return console.log(...params);
}

function success(...params: LogParams){
    return info(chalk.green(`✓`), ...params)
}
function warn(...params: LogParams){
    return console.warn(chalk.yellow(`▲`), ...params)
}
function error(...params: LogParams){
    return console.error(chalk.red(`✖︎`), ...params)
}

export const log = {
    info,
    success,
    warn,
    error,
};