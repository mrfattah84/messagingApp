import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import NewChat from "./newChat";
import Setting from "./setting";
import CustomUser from "./user";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

function Sidebar({ chats, setChat, socket }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <div className="h-full w-full md:w-1/3 bg-background-secondary relative flex flex-col">
      <div className="flex justify-between px-5 py-3.5 items-center sticky top-0 z-10 bg-background-secondary">
        <Dropdown className="text-foreground">
          <DropdownTrigger>
            <Icon
              icon="solar:hamburger-menu-linear"
              className="text-4xl hover:bg-background-quaternary rounded-full p-2 cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key={"1"}
              startContent={
                isSettingOpen ? (
                  <Icon icon={"solar:chat-round-linear"} />
                ) : (
                  <Icon icon={"solar:settings-linear"} />
                )
              }
              onPress={() => {
                setIsSettingOpen(!isSettingOpen);
              }}
            >
              {isSettingOpen ? "Chats" : "Settings"}
            </DropdownItem>
            <DropdownItem
              key={"2"}
              startContent={<Icon icon={"solar:logout-2-outline"} />}
              onPress={() => {
                localStorage.clear();
                window.location.href = "/signin";
              }}
            >
              logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <img className="w-9" src="logo.svg" alt="Logo" />
      </div>
      <div className="flex-1 overflow-auto">
        {isSettingOpen ? (
          <Setting socket={socket} />
        ) : (
          chats.map((item: any) => (
            <CustomUser
              key={item.id}
              item={item}
              socket={socket}
              setChat={setChat}
            />
          ))
        )}
      </div>
      <div className="absolute bottom-0 right-0 flex justify-end p-5">
        <Icon
          className="text-5xl cursor-pointer text-primary hover:text-primary-500 z-10"
          icon="solar:pen-new-round-bold"
          onClick={onOpen}
        />
      </div>
      <NewChat
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        socket={socket}
        created={chats}
      />
    </div>
  );
}

export default Sidebar;
