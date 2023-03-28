const { createLogger, transports, format } = require("winston");
const { combine, printf } = format;

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let log = `${timestamp}[${level}]: ${message}`;

    if (metadata) {
        log += JSON.stringify(metadata);
    }

    return log;
});

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: "warn",
            filename: "./src/logs/logsWarnings.log"
        }),
        new transports.File({
            level: "error",
            filename: "./src/logs/logsErrors.log"
        }),
    ],

    format: combine(
        format.json(),
        format.timestamp(),
        format.colorize(),
        myFormat
    ),
});

module.exports = logger;