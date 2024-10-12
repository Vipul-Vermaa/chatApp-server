const WebSocket = require('ws');

module.exports = ({ env }) => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      setTimeout(()=>{
      ws.send(`Echo: ${message}`);  
    },500)
    });

    ws.send('welcome!!');
  });

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
  };
};
