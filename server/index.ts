import { Server } from './server';

const server = new Server();
server.start()
  .then(() => {
    console.log(`[${new Date().toISOString()}][SERVER START][SUCCESS]`);
  }).catch((error) => {
    console.log(`[${new Date().toISOString()}][SERVER START][FAILED][ERROR] > `, error);
  });
