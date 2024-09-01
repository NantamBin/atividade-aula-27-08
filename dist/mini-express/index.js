"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniExpress = void 0;
const http_1 = __importDefault(require("http"));
class MiniExpress {
    constructor() {
        this.middlewares = [];
    }
    use(handler) {
        this.middlewares.push(handler);
    }
    listen(port, callback) {
        const server = http_1.default.createServer((req, res) => {
            let idx = 0;
            const next = () => {
                if (idx < this.middlewares.length) {
                    const handler = this.middlewares[idx++];
                    handler(req, res, next);
                }
                else {
                    res.end();
                }
            };
            next();
        });
        server.listen(port, callback);
    }
}
exports.MiniExpress = MiniExpress;
