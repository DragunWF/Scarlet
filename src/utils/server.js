import express from "express";

const server = express();

server.all("/", (request, response) => {
  response("Your bot has now been awakened!");
});

function keepServerRunning() {
  server.listen(3000, () => {
    console.log("The server is now ready!");
  });
}

export default keepServerRunning;