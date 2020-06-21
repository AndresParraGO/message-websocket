
const WebSocket = require("ws"),
		express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app)

const webSocketServer = new WebSocket.Server({server: server, path: '/messages'})


server.listen(8000, () => {
  console.log('Listen in localhost:8080')
})


webSocketServer.on('connection', (webSocket) => {
  webSocket.on('message', (message) => {
    broadcast(message)
  })
})


function broadcast(data) {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}