const express = require("express");
const path = require("path");
const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: "*",
  },
};

const nms = new NodeMediaServer(config);
nms.run();

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("HTTP Server running on http://localhost:3000");
});
