import http from 'http';

type RequestHandler = (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => void;

export class MiniExpress {
    private middlewares: RequestHandler[] = [];

    use(handler: RequestHandler) {
        this.middlewares.push(handler);
    }

    listen(port: number, callback?: () => void) {
        const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
            let idx = 0;

            const next = () => {
                if (idx < this.middlewares.length) {
                    const handler = this.middlewares[idx++];
                    handler(req, res, next);
                } else {
                    res.end();
                }
            };

            next();
        });

        server.listen(port, callback);
    }
}
