const http = require("http");
const anggota = require("./member");
const user = require("./users");
const moment = require("moment");

const server = http.createServer((req, res) => {
  const url = req.url;
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (url === "/") {
    res.write("This is the home page");
  } else if (url === "/about") {
    res.write(
      JSON.stringify({
        status: "success",
        message: "response success",
        description: "Exercise3",
        date: moment().format(),
        data: anggota,
      })
    );
  } else if (url === "/users") {
    res.write(JSON.stringify(user));
  }
  res.end();
});

const port = 3000;
const hostName = "127.0.0.1";
server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});
