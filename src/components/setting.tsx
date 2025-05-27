import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { Button } from "@heroui/button";
import { Cloudinary } from "@cloudinary/url-gen";
import imageCompression from "browser-image-compression";

function Setting({ socket }) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [pfp, setPfp] = useState(loggedUser.img);

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUD_NAME,
    },
  });

  const uploadImg = async (e) => {
    setPfp(URL.createObjectURL(e.target.files[0]));
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(e.target.files[0], options);
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", uploadPreset);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // File uploaded successfully
        setPfp(data.secure_url);
      })
      .catch((error) => {
        alert("Error uploading file");
        console.error("Error uploading file:", error);
      });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    socket.emit("saveChanges", {
      img: pfp,
      uname: e.target[1].value,
      bio: e.target[2].value,
      setting: { darkMode: loggedUser.setting.darkMode },
    });

    socket.on("saveChanges", (data) => {
      localStorage.setItem("user", JSON.stringify(data));
    });
  };

  return (
    <form className="flex flex-col gap-5 px-5" onSubmit={saveChanges}>
      <div className="relative">
        <input
          type="file"
          name="img"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          onChange={uploadImg}
          accept="image/*"
        />
        <img src={pfp} alt="profilePicture" />
      </div>

      <Input
        className="max-w-full"
        placeholder="username"
        radius="full"
        type="text"
        name="uname"
        defaultValue={loggedUser.uname}
        autoComplete="off"
        variant="bordered"
      />
      <Input
        className="max-w-full"
        placeholder="bio"
        radius="full"
        type="text"
        name="bio"
        defaultValue={loggedUser.bio}
        autoComplete="off"
        variant="bordered"
      />
      <div className="flex justify-between">
        <Switch
          defaultSelected={loggedUser.setting.darkMode}
          onChange={(e) => {
            loggedUser.setting.darkMode = e.target.checked;
            localStorage.setItem("user", JSON.stringify(loggedUser));
            e.target.checked
              ? document.body.classList.add("dark")
              : document.body.classList.remove("dark");
          }}
        >
          Dark Mode
        </Switch>

        <Button radius="full" className="p-1 bg-success-500" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}

export default Setting;
