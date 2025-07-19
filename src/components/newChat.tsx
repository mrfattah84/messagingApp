import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { User } from "@heroui/user";
import { Input } from "@heroui/input";

function NewChat({ isOpen, onOpenChange, socket, created }: any) {
  const [users, setUsers] = useState<any>([]);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [name, setName] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "");

  useEffect(() => {
    socket.emit("getUsers");
    socket.on("getUsers", (data: any) => {
      setUsers(data);
    });
  }, [isOpen]);

  return (
    <Modal
      className="text-foreground"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">New Chat</ModalHeader>
            <ModalBody>
              {users.map(
                (user: any) =>
                  localStorage.getItem("user") !== null &&
                  user.id !==
                    JSON.parse(localStorage.getItem("user") || "").id && (
                    <User
                      className={`hover:bg-background-tertiary w-full justify-start px-5 py-3 rounded-none ${
                        selectedUsers.includes(user.id)
                          ? "bg-background-tertiary"
                          : ""
                      }`}
                      key={user.id}
                      onClick={() => {
                        selectedUsers.includes(user.id)
                          ? setSelectedUsers(
                              selectedUsers.filter((id: any) => id !== user.id)
                            )
                          : setSelectedUsers([...selectedUsers, user.id]);
                      }}
                      avatarProps={{
                        src: user.img,
                        classNames: {
                          img: "object-contain",
                        },
                      }}
                      name={user.uname || "Unknown"}
                      description={user.bio}
                    />
                  )
              )}
            </ModalBody>
            <ModalFooter>
              <Input
                required={selectedUsers.length > 1}
                className="w-full"
                placeholder="Chat Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button
                className="text-white"
                color="primary"
                onPress={async () => {
                  let flag = false;
                  if (selectedUsers.length === 0) flag = true;
                  if (selectedUsers.length > 1 && name.length === 0) {
                    alert("name is required for group chats");
                    flag = true;
                  }
                  if (selectedUsers.length === 1) {
                    users.forEach((user: any) => {
                      if (user.id === selectedUsers[0]) {
                        created.forEach((chat: any) => {
                          if (chat.name === user.uname) {
                            flag = true;
                          }
                        });
                      }
                    });
                  }
                  flag ||
                    socket.emit("newChat", {
                      name,
                      users: [...selectedUsers, user.id],
                    });
                  setSelectedUsers([]);
                  onClose();
                  window.location.reload();
                }}
              >
                Start Chat
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default NewChat;
