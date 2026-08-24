module.exports = {
  apps: [
    {
      name: 'tanhoangnga',
      cwd: '/www/wwwroot/tanhoangnga.com',
      script: 'server.js',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '0.0.0.0',
        PORT: 3022,
      },
    },
  ],
};
