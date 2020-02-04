/************************************* MAIN *************************************/
/************************************ POPUP *************************************/
import Logger from 'js-logger';
import { assertIsNotNullOrUndefined } from '../common/assertions';
import CommandManager from './command-manager';

const logger = Logger.get('main()');

Logger.useDefaults();
Logger.setLevel(Logger.INFO);
Logger.setLevel(Logger.TRACE);
Logger.setLevel(Logger.DEBUG);

const removeUnacceptedReqButton = document.getElementById(
    'remove-unaccepted-requests'
);

removeUnacceptedReqButton?.addEventListener('click', async () => {
    logger.info('remove Remove Unaccepted Requests');

    const url =
        'https://www.facebook.com/friends/requests/?fcref=ft&outgoing=1';

    const { id } = await CommandManager.createTab({
        url
    });

    assertIsNotNullOrUndefined(id, {
        message: '[main()] id not found in the created tab'
    });

    await CommandManager.navigate(id, { url });

    // await CommandManager.wait(5);
    // await CommandManager.click(
    //     tabId,
    //     By.XPATH,
    //     "//a[text()='See More Requests']"
    // );

    console.log('removing friends ended!!!');
});
