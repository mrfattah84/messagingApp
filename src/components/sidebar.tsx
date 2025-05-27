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
    <div className="h-full w-full md:w-1/3 bg-background-secondary relative overflow-auto">
      <div className="flex justify-between px-5 py-3.5  items-center">
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
      <Icon
        className="text-4xl absolute right-5 bottom-3 cursor-pointer z-10 text-primary hover:text-primary-500"
        icon="solar:pen-new-round-bold"
        onClick={onOpen}
      />
      <NewChat isOpen={isOpen} onOpenChange={onOpenChange} socket={socket} />
    </div>
  );
}

export default Sidebar;
