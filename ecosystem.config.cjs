module.exports = {
  apps: [
    {
      name: "skribbl",
      script: "./server/index.mjs",
      instances: "4",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
