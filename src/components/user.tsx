import { User } from "@heroui/user";

function CustomUser({ item, socket, setChat }: any) {
  const openChat = (id: any) => () => {
    socket.emit("getChat", id);

    socket.on("getChat", (data: any) => {
      setChat(data);
    });
  };

  return (
    <User
      className="hover:bg-background-quaternary w-full justify-start px-5 py-3 rounded-none"
      onClick={openChat(item.id)}
      avatarProps={{
        src: item.img,
        classNames: {
          img: "object-contain",
        },
      }}
      name={item.name}
      description={
        item.isGroup
          ? ""
          : "last seen: " + new Date(item.lastSeen).toLocaleString("en-US") ||
            "Online"
      }
    />
  );
}

export default CustomUser;
