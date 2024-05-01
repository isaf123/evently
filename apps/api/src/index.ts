import App from './app';
import dotenv from 'dotenv'
dotenv.config()

const main = () => {

  const server = new App();
  server.start();
};

main();
