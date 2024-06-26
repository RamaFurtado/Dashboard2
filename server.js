import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`JSON Server está funcionando en el puerto ${PORT}`);
});