const express = require("express");
const path = require("path");
const NodeMediaServer = require("node-media-server");

const app = express();
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
    mediaroot: path.join(__dirname, "media"), // HLS 파일 저장 경로
  },
  trans: {
    ffmpeg: "/opt/homebrew/bin/ffmpeg", // FFmpeg 설치 경로로 변경
    tasks: [
      {
        app: "live",
        ac: "aac", // 오디오 코덱
        vc: "libx264", // 비디오 코덱
        hls: true, // HLS 출력 설정
        hlsFlags: "[hls_time=1:hls_list_size=10:hls_flags=delete_segments]", // HLS 옵션
      },
    ],
  },
};

// NodeMediaServer 실행
const nms = new NodeMediaServer(config);
nms.run();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("HTTP Server running on http://localhost:3000");
});
