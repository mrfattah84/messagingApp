import React, { useEffect, useState } from "react";
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

function NewChat({ isOpen, onOpenChange, socket }) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.emit("getUsers");
    socket.on("getUsers", (data) => {
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
              {users.map((user) => (
                <User
                  className={`hover:bg-foreground-200 w-full justify-start px-5 py-3 rounded-none ${
                    selectedUsers.includes(user.id) ? "bg-foreground-200" : ""
                  }`}
                  key={user.id}
                  onClick={() => {
                    selectedUsers.includes(user.id)
                      ? setSelectedUsers(
                          selectedUsers.filter((id) => id !== user.id)
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
              ))}
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
                  if (selectedUsers.length === 0) return;
                  if (selectedUsers.length > 1 && name.length === 0) {
                    alert("name is required for group chats");
                    return;
                  }
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
