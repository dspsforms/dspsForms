const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");



// check to make sure we have the env variables loaded
console.log("RECAPTCHA_SERVER_KEY=", process.env.RECAPTCHA_SERVER_KEY);
console.log("JSON_WEB_TOKEN_SERVER_KEY=", process.env.JSON_WEB_TOKEN_SERVER_KEY);

// https://stackoverflow.com/questions/5999373/how-do-i-prevent-node-js-from-crashing-try-catch-doesnt-work#
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

console.log("RECAPTCHA_SERVER_KEY=", process.env.RECAPTCHA_SERVER_KEY);

const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
