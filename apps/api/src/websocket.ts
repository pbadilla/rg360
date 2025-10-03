// websocket.ts
import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  console.log("[WS] Client connected");
  ws.send(JSON.stringify({ message: "Connected to enrichment progress" }));
});
