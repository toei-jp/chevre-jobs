/**
 * 上映イベント集計タスク実行
 */
import * as chevre from '@toei-jp/chevre-domain';

import { connectMongo } from '../../../connectMongo';

connectMongo().then(() => {
    let count = 0;

    const MAX_NUBMER_OF_PARALLEL_TASKS = 10;
    const INTERVAL_MILLISECONDS = 100;
    const taskRepo = new chevre.repository.Task(chevre.mongoose.connection);

    setInterval(
        async () => {
            if (count > MAX_NUBMER_OF_PARALLEL_TASKS) {
                return;
            }

            count += 1;

            try {
                await chevre.service.task.executeByName(
                    chevre.factory.taskName.AggregateScreeningEvent
                )({
                    taskRepo: taskRepo,
                    connection: chevre.mongoose.connection
                });
            } catch (error) {
                console.error(error);
            }

            count -= 1;
        },
        INTERVAL_MILLISECONDS
    );
}).catch((err) => {
    console.error('connetMongo:', err);
    process.exit(1);
});
