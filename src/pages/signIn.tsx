import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const respoinse = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uname: event.target.uname.value,
            pw: event.target.pw.value,
          }),
        }
      );

      if (!respoinse.ok) {
        alert("username or password is incorrect");
      } else {
        const data = await respoinse.json();
        localStorage.setItem("token", data.token); // Store the token in local storage
        localStorage.setItem("user", JSON.stringify(data.user)); // Store the user ID in local storage
        navigate("/"); // Redirect to the home page
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <img className="w-16 mx-auto py-8" src="logo.svg" alt="Logo" />

        <p className="pb-4 text-left text-3xl font-semibold">
          Log In
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <Form
          className="flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Username"
            labelPlacement="outside"
            name="uname"
            placeholder="Enter your username"
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            name="pw"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox defaultSelected name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Log In
          </Button>
        </Form>
        <p className="text-center text-small">
          <Link href="/signup" size="sm">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
