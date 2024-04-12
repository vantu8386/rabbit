// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "API",
      script: "../app.js", 
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
    },
    {
      name: "consumer",
      script: "../configs/queue/consumer.js",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
    },
  ],
};
