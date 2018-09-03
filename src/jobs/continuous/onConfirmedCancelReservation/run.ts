/**
 * 確定予約キャンセル取引監視
 */
import * as chevre from '@toei-jp/chevre-domain';
import * as createDebug from 'debug';

import { connectMongo } from '../../../connectMongo';

const debug = createDebug('chevre-jobs:*');

connectMongo().then(() => {
    let countExecute = 0;

    const MAX_NUBMER_OF_PARALLEL_TASKS = 10;
    const INTERVAL_MILLISECONDS = 200;
    const taskRepo = new chevre.repository.Task(chevre.mongoose.connection);
    const transactionRepo = new chevre.repository.Transaction(chevre.mongoose.connection);

    setInterval(
        async () => {
            if (countExecute > MAX_NUBMER_OF_PARALLEL_TASKS) {
                return;
            }

            countExecute += 1;

            try {
                debug('exporting tasks...');
                await chevre.service.transaction.cancelReservation.exportTasks(
                    chevre.factory.transactionStatusType.Confirmed
                )({ task: taskRepo, transaction: transactionRepo });
            } catch (error) {
                console.error(error);
            }

            countExecute -= 1;
        },
        INTERVAL_MILLISECONDS
    );
}).catch((err) => {
    console.error('connetMongo:', err);
    process.exit(1);
});
