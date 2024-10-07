import React from "react";
import { Link } from "react-router-dom";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { registerProps } from "../types/types";

const Register = ({ setIsModalOpen }: registerProps) => {
  return (
    <div className="flex flex-col justify-center w-96 p-0 rounded-md items-center">
      <EnvelopeIcon className="size-7 text-white" />
      <h2 className="text-3xl text-slate-900">Create an account</h2>
      <div className="bg-white flex p-3 flex-col w-full mt-3 rounded-md shadow-md">
        <form className="space-y-6">
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
              <a
                href="#"
                className="font-medium text-slate-600 hover:text-slate-900">
                Forgot your password?
              </a>
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
        <p className="text-slate-500">
          Already have an account?
          <a
            className="text-slate-500 hover:text-slate-900 cursor-pointer"
            onClick={() => setIsModalOpen(true)}>
            {" "}
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
