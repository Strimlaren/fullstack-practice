import { loginModalProps } from "../types/types";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";

const LoginModal = ({
  setIsModalOpen,
  setIsLoggedIn,
  setLoggedUser,
  handlePopup,
}: loginModalProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      setLoggedUser(email);
      setIsLoggedIn(true);
      setIsModalOpen(false);
      handlePopup(`Welcome, ${email}`);
      navigate("/campaigns");
    } else {
      handlePopup(`Authentication failed.`);
      navigate("/");
    }
  };

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className="absolute flex flex-col justify-center items-center bg-black bg-opacity-80 w-screen h-screen z-10">
      <div className="flex flex-col w-96 p-0 rounded-md items-center">
        <EnvelopeOpenIcon className="size-7 text-white mb-3" />
        <h2 className="text-3xl text-white">Login to SPAM Email</h2>
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white flex border p-3 border-gray-400 flex-col w-full mt-3 rounded-md shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-slate-600 focus:ring-slate-900 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <p className="font-medium text-slate-600 hover:text-slate-900">
                  Forgot your password?
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-slate-800 text-white px-4 py-2 rounded-md shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-5 w-full">
          <p className="text-slate-400">
            Don't have an account?
            <Link to="/register">
              <p className="text-slate-500 hover:text-slate-700 inline">
                {" "}
                Register
              </p>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
