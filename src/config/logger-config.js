const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logger = createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ level, message, timestamp }) => {
            return `${timestamp} : ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ],
});

module.exports = logger;
