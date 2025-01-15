"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContexts";

//

const Header = () => {
  const { isLogged, logout, userData } = useAuth();

  return (
    <header className="flex w-full shadow-sm mb-2 py-2 border-b border-gray-50 dark:border-white">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex w-full py-1 justify-between items-center">
          <Link href={"/"}>
            <Image
              className="dark:invert max-w-28"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
          </Link>
          <div className="cont-info-user flex">
            <div className="user flex justify-center items-center">
              <div className="avatar flex h-10 w-10 rounded-full bg-slate-300 justify-center items-center fill-slate-700 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="name text-sm mx-2">{userData && userData.name}</p>
            </div>
            {!isLogged && (
              <Link
                href={"/auth/login"}
                className="bg-primary-blue rounded-sm p-2 px-4 ml-2 text-white"
              >
                Login
              </Link>
            )}
            {isLogged && (
              <button
                onClick={logout}
                className="bg-primary-blue rounded-sm px-4 ml-2 text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
