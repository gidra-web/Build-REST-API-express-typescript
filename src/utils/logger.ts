import pino from 'pino';
import dayjs from 'dayjs';

const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            colorizeObjects: true,
            minimumLevel: 'info',
            levelFirst: true,
            ignore: 'pid,hostname,timestamp', // Correctly specify fields to ignore
            
        }
        
    },
    timestamp: () => `,"time":"${dayjs().format('h:mm A')}"`,
});

export default log;