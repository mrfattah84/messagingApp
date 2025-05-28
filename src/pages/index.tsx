import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "@/components/sidebar";
import Chat from "@/components/chat";

const token = localStorage.getItem("token");
const socket =
  token &&
  io(import.meta.env.VITE_API_URL, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

function Index() {
  if (!token) {
    return <Navigate to={"/signin"} />;
  }

  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState<any>({ messages: [], users: [] });

  useEffect(() => {
    JSON.parse(localStorage.getItem("user") || "")?.setting?.darkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  socket &&
    socket.on("initData", (data: any) => {
      setChats(data);
    });

  socket &&
    socket.on("newMessage", (data: any) => {
      setChat({
        ...chat,
        messages: [...chat.messages, data],
      });
    });

  const isMobile = window.innerWidth <= 767;

  return isMobile ? (
    <div className="h-full flex ">
      {chat.users.length === 0 ? (
        <Sidebar chats={chats} setChat={setChat} socket={socket} />
      ) : (
        <Chat chat={chat} setChat={setChat} socket={socket} />
      )}
    </div>
  ) : (
    <div className="h-full flex ">
      <Sidebar chats={chats} setChat={setChat} socket={socket} />
      <Chat chat={chat} setChat={setChat} socket={socket} />
    </div>
  );
}

export default Index;
