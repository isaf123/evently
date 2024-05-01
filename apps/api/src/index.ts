import App from './app';
import dotenv from 'dotenv'
dotenv.config()

const main = () => {
  // init db here

  const server = new App();
  server.start();
};

main();
