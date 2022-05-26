import "dotenv/config";
import express from "express";

const server = express();
const port = process.env.PORT || 8530;

server.all("/", (request, response) => {
  response("Scarlet is now awake!");
});

function keepServerRunning() {
  server.listen(port, () => {
    console.log("The server is now ready!");
  });
}

export default keepServerRunning;
