module.exports = {
  apps: [{
    name: 'KVote Client Server',
    script: 'server.js',

    instances: 1,
    env: {
      PORT: 7001,
      NODE_ENV: 'development'
    },
    env_production: {
      PORT: 7001,
      NODE_ENV: 'production'
    }
  }],
};
