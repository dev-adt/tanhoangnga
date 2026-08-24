module.exports = {
  apps: [
    {
      name: 'tanhoangnga',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3022',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3022
      }
    }
  ]
};
