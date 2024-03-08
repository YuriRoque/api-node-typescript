import server from './server/Server';

const port = process.env.SERVER_PORT;

server.listen(port, () => console.log(`Server HTTP is running on ${port}...`));
