const app = require('./app');

async function server() {
  let port = process.env.PORT || 8080;
  await app.listen({ port: port }, (err, address) => {
    if (err) throw err
    console.log("[INFO] Server started on port " + port);
  });
}

server();