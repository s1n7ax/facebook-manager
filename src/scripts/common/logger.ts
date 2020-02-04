import Logger from 'js-logger';

export const methodDebugLog = () => {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const logger = Logger.get(target.constructor.name);

        const defaultMethod = descriptor.value;

        descriptor.value = (...args: any) => {
            logger.time(`${propertyKey}():: ended`);
            logger.debug(`${propertyKey}():: started`, ...args);

            defaultMethod(...args);

            logger.timeEnd(`${propertyKey}():: ended`);
        };
    };
};
