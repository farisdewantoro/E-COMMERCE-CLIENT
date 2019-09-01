module.exports = {
  apps : [{
    name: 'CLIENT-SERVER',
    script: './server/index.js',
    autorestart: true,
    watch: false,
    env: {
      PORT:"5500",
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: "./err.log",
    out_file: "./out.log"
  }],
};
