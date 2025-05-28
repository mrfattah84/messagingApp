"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  //pw validator
  const [lowerValidated, setLowerValidated] = useState(true);
  const [upperValidated, setUpperValidated] = useState(true);
  const [numberValidated, setNumberValidated] = useState(true);
  const [specialValidated, setSpecialValidated] = useState(true);
  const [lengthValidated, setLengthValidated] = useState(true);

  const validatePw = (value: string) => {
    setPw(value);
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");

    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };

  //pw conf validate
  const [pw, setPw] = useState("");
  const [pwConfValidated, setPwConfValidated] = useState(true);

  const validatePwConf = (value: string) => {
    value === pw ? setPwConfValidated(true) : setPwConfValidated(false);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const respoinse = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uname: event.target.uname.value,
            email: event.target.email.value,
            pw: event.target.pw.value,
          }),
        }
      );

      if (!respoinse.ok) {
        alert("username or email already exists");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <img className="w-16 mx-auto py-8" src="logo.svg" alt="Logo" />

        <p className="pb-4 text-left text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
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
            onChange={(e) => {
              validatePw(e.target.value);
            }}
            isInvalid={
              !(
                lowerValidated &&
                upperValidated &&
                numberValidated &&
                specialValidated &&
                lengthValidated
              )
            }
          />
          <div className="ml-4 text-danger">
            {lowerValidated || <div>At least one lowercase letter</div>}
            {upperValidated || <div>At least one uppercase letter</div>}
            {numberValidated || <div>At least one number</div>}
            {specialValidated || <div>At least one special character</div>}
            {lengthValidated || <div>At least 8 characters</div>}
          </div>
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
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
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
            onChange={(e) => {
              validatePwConf(e.target.value);
            }}
            isInvalid={!pwConfValidated}
          />
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link className="relative z-[1]" href="#" size="sm">
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link className="relative z-[1]" href="#" size="sm">
              Privacy Policy
            </Link>
          </Checkbox>
          <Button color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <p className="text-center text-small">
          <Link href="/signin" size="sm">
            Already have an account? Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
