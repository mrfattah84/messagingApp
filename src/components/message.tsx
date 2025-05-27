import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import React, { useEffect } from "react";

function Message(data) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/signin";
    }
  }, []);

  return (
    <div
      className={`flex ${data.sender !== true ? "flex-row-reverse" : "justify-start"} mt-2`}
    >
      <Avatar
        className="mx-2 mt-auto"
        src={
          data.sender !== true
            ? data.sender.img
            : JSON.parse(localStorage.getItem("user")).img
        }
        classNames={{
          img: "object-contain",
        }}
      />

      <div
        className={`max-w-xs px-4 py-2 rounded-2xl shadow-md
          ${data.sender !== true ? "bg-primary text-white rounded-br-none" : "bg-background-tertiary rounded-bl-none"}`}
      >
        <div className="flex flex-col">
          {data.text}
          <div
            className={`ml-auto -mr-2 text-xs mt-1 -mb-1 ${
              data.sender !== true
                ? "text-[rgba(255, 255, 255, 0.65)]"
                : "text-muted"
            }`}
          >
            {new Date(data.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
