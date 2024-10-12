import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { EnvelopeIcon } from "@heroicons/react/24/outline";

import { registerProps } from "../types/types";

const Register = ({ setIsModalOpen, handlePopup }: registerProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      handlePopup("Passwords must match.");
      return;
    }

    const response = await fetch(`/api/users/${email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data.user) {
        if (data.user.email === email) {
          handlePopup("User already exists.");
          return;
        }
      }

      const createUser = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (createUser.ok) {
        handlePopup("User successfully created.");
        navigate("/");
      } else {
        handlePopup("Failed to create user.");
        return;
      }
    } else {
      handlePopup("Server error.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center w-96 p-0 rounded-md items-center">
        <EnvelopeIcon className="size-7 text-white" />
        <h2 className="text-3xl text-slate-900">Create an account</h2>
        <h3 className="text-center text-sm text-slate-500">
          Join our spamming platform and start filling up those inboxes.
        </h3>
        <div className="bg-white flex p-3 flex-col w-full mt-3 rounded-md shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="passwordAgain"
                className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordAgain"
                name="passwordAgain"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
              />
            </div>

            <div className="relative">
              <button
                type="submit"
                className="w-full bg-slate-800 text-white px-4 py-2 rounded-md shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 mt-6">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-5 w-full">
          <p className="text-slate-500">
            Already have an account?{" "}
            <a
              className="text-slate-500 hover:text-slate-900 cursor-pointer underline"
              onClick={() => setIsModalOpen(true)}>
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
