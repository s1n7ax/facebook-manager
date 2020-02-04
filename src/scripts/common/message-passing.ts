import Logger from 'js-logger';
import { assertIsNotNullOrUndefined, assertIsNumber } from './assertions';
import { browser } from 'webextension-polyfill-ts';
import Time from '../common/time';
import CommandType from './commands/command-type';
import TimeoutException from './exceptions/timeout-exception';

const logger = Logger.get('@waitUntilTabIsReads');
/**
 * this decorator is going to wait until the tab is ready to take messages
 * this check if the tab is avaibale IF NOT throw
 * IF avaibale, it sends CommandType.READY action each second upto given time
 * and wait for a successful response
 */
export const waitUntilTabIsReady = (timeout: number) => {
    return (
        _target: any,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const defaultMethod = descriptor.value;

        descriptor.value = async (tabId: number, ...args: any) => {
            logger.time('started');
            logger.debug('find tab');

            assertIsNotNullOrUndefined(tabId, {
                message:
                    '[@waitUntilTabIsReady] tabId should be the first parameter'
            });

            assertIsNumber(tabId, {
                message: '[@waitUntilTabIsReady] tabId should be a number'
            });

            const tab = await browser.tabs.get(tabId);

            assertIsNotNullOrUndefined(tab, {
                message: `[@waitUntilTabIsReady] no existing tab found with tabId::${tabId}`
            });

            logger.debug('find tab - successful');

            let isTimeout = false;
            let isTabReady = false;

            setTimeout(() => {
                isTimeout = true;
            }, timeout);

            do {
                try {
                    isTabReady = await browser.tabs.sendMessage(tabId, {
                        command: CommandType.READY
                    });
                } catch (error) {
                    logger.debug('ignore error message', error);
                }

                logger.debug('waiting tab to be ready');

                await Time.sleep(1000);
            } while (!isTabReady && !isTimeout);

            if (!isTabReady) {
                logger.error(
                    'readyToReceiveMessage():: timeout while waiting tab to be ready'
                );
                throw new TimeoutException('Tab is not ready');
            }

            await defaultMethod(tabId, ...args);
        };
    };
};

/**
 * this method will throw if the message response has response.error value
 */
export const throwResponseErrors = () => {
    return (
        _target: any,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const defaultMethod = descriptor.value;

        descriptor.value = async (...args: any) => {
            const result = await defaultMethod(...args);

            if (result.error) throw result.error;

            return result;
        };
    };
};
