import dotenv from "dotenv";
dotenv.config();
import App from "./app";

const main = () => {
  const server = new App();

  server.start();
};

main();
