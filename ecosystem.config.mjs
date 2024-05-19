export const apps = [
  {
    name: "skribbl",
    script: "./server/server.mjs",
    instances: "4",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      PORT: 4300
    }
  }
];