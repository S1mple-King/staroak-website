module.exports = {
  apps: [
    {
      name: 'staroak-official-website',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production',
        PORT: '3000'
      },
      max_memory_restart: '512M'
    }
  ]
};
