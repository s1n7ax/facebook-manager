import Logger from 'js-logger';
import CommandType from '../common/commands/command-type';
import CommandRequestModel from '../common/commands/models/command-request-model';
import ActionFactory from './actions/action-factory';

const logger = Logger.get('Content::CommandManager');

export default class CommandManager {
    static async handleCommands(data: any) {
        logger.info('>>> background command received', data);

        let message = data as CommandRequestModel;

        switch (message.command) {
            case CommandType.READY: {
                return true;
            }

            default: {
                try {
                    return await ActionFactory.get(message.command).run(
                        message.data
                    );
                } catch (e) {
                    return {
                        error: e
                    };
                }
            }
        }
    }
}
