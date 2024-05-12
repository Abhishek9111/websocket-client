import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
      setSocket(newSocket);
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setMsg(message.data);
    };
    return () => newSocket.close();
  }, []);
  if (!socket) {
    return <div>Loading...</div>;
  }
  return <>{msg}</>;
}

export default App;
