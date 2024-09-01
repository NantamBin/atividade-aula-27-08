import { MiniExpress } from '/media/john/HD/Linux/Estudo/atividades-arthur/atividade-aula-27-08/src/mini-express/index.ts';
const app = new MiniExpress();
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    res.setHeader('Content-Type', 'text/plain');
    next();
});
app.use((req, res, next) => {
    if (req.url === '/') {
        res.write('Hello, World!');
    } else if (req.url === '/about') {
        res.write('About Page');
    }
    next();
});
app.use((req, res) => {
    res.end();
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});