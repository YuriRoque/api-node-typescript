import server from './server/server';

const port = process.env.SERVER_PORT;

server.listen(port, () => console.log(`Server HTTP is running on ${port}...`));
