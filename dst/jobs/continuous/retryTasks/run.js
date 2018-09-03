"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * タスクリトライ
 */
const chevre = require("@toei-jp/chevre-domain");
const connectMongo_1 = require("../../../connectMongo");
connectMongo_1.connectMongo().then(() => {
    let count = 0;
    const MAX_NUBMER_OF_PARALLEL_TASKS = 10;
    const INTERVAL_MILLISECONDS = 500;
    const RETRY_INTERVAL_MINUTES = 10;
    const taskRepo = new chevre.repository.Task(chevre.mongoose.connection);
    setInterval(() => __awaiter(this, void 0, void 0, function* () {
        if (count > MAX_NUBMER_OF_PARALLEL_TASKS) {
            return;
        }
        count += 1;
        try {
            yield chevre.service.task.retry(RETRY_INTERVAL_MINUTES)({ task: taskRepo });
        }
        catch (error) {
            console.error(error);
        }
        count -= 1;
    }), INTERVAL_MILLISECONDS);
}).catch((err) => {
    console.error('connetMongo:', err);
    process.exit(1);
});
