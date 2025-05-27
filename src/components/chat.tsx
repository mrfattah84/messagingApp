import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import Message from "./message";
import CustomUser from "./user";
import { useRef, useEffect } from "react";

function Chat({ chat, socket, setChat }) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("sendMessage", {
      chatId: chat.id,
      text: e.target.message.value,
      senderId: loggedUser.id,
    });

    socket.on("sendMessage", (data) => {
      setChat({
        ...chat,
        messages: [...chat.messages, { ...data, sender: true }],
      });
    });

    e.target.reset();
  };

  return (
    <div
      className="h-full w-full flex flex-col relative overflow-y-auto bg-background"
      ref={containerRef}
    >
      {chat.id && (
        <div className="flex justify-between bg-background-tertiary sticky top-0 w-full z-10">
          <CustomUser
            key={chat.id}
            item={chat}
            socket={socket}
            setChat={setChat}
          />
          <Icon
            icon={"solar:close-circle-bold"}
            className="my-auto mx-5 text-3xl text-muted"
            onClickCapture={() => {
              setChat({ messages: [], users: [] });
            }}
          />
        </div>
      )}

      {chat.messages.map((item) => (
        <Message key={item.id} {...item} />
      ))}

      {chat.id && (
        <form
          className="sticky bottom-0 w-full px-5 py-3 flex gap-2 items-center z-10 mt-auto"
          onSubmit={sendMessage}
        >
          <Input
            className="max-w-full"
            placeholder="message"
            radius="full"
            type="text"
            name="message"
            autoComplete="off"
          />
          <Button
            isIconOnly
            radius="full"
            className="p-1  bg-primary"
            type="submit"
          >
            <Icon
              icon="solar:map-arrow-square-bold"
              className="w-full h-full text-white"
            />
          </Button>
        </form>
      )}
    </div>
  );
}

export default Chat;
