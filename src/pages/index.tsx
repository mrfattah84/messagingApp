import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "@/components/sidebar";
import Chat from "@/components/chat";

const socket = io(import.meta.env.VITE_API_URL, {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

function Index() {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState<any>({ messages: [], users: [] });

  useEffect(() => {
    const token = localStorage.getItem("token");
    token || navigate("/signin");
  }, [navigate]);

  useEffect(() => {
    JSON.parse(localStorage.getItem("user") || "")?.setting?.darkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  socket.on("initData", (data: any) => {
    setChats(data);
  });

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
