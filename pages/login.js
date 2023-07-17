import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/component/Loader";
import Link from "next/link";

const provider = new GoogleAuthProvider();

const LoginForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error({ err });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <main className="flex lg:h-[100vh]">
      <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
        <div className="p-8 w-[600px]">
          <h1 className="text-5xl font-semibold">Login</h1>
          <p className="mt-6 ml-1">
            Don't have an account ?{" "}
            <Link href={'/register'} className="underline hover:text-blue-400 cursor-pointer">
              Sign Up
            </Link>
          </p>

          <div
            className="bg-black/[0.05] text-white w-full py-4 mt-8 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
            onClick={signInWithGoogle}
          >
            <FcGoogle size={22} />
            <span className="font-medium text-black group-hover:text-white">
              Login with Google
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-8 pl-1 flex flex-col">
              <label>Email</label>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="font-medium border-b border-black p-3 outline-0 focus-within:border-blue-400"
              />
            </div>
            <div className="mt-8 pl-1 flex flex-col">
              <label>Password</label>
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="font-medium border-b border-black p-3 outline-0 focus-within:border-blue-400"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div
        className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
        style={{
          backgroundImage: "url('/login-banner.jpg')",
        }}
      ></div>
    </main>
  );
};

export default LoginForm;
