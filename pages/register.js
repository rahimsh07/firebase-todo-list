import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/component/Loader";
import Link from "next/link";

const provider = new GoogleAuthProvider();

const RegisterForm = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { authUser, isLoading, setAuthUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      console.log(isLoading, authUser);
      router.push("/");
    }
  }, [authUser, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) return;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        username,
      });
      setAuthUser({
        uid: user.uid,
        email: user.email,
        username,
      });
    } catch (err) {
      console.error({ err });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(errr);
    }
  };

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <main className="flex lg:h-[100vh]">
      <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
        <div className="p-8 w-[600px]">
          <h1 className="text-6xl font-semibold">Sign Up</h1>
          <p className="mt-6 ml-1">
            Already have an account ?{" "}
            <Link
              href={"/login"}
              className="underline hover:text-blue-400 cursor-pointer"
            >
              Login
            </Link>
          </p>

          <div
            className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
            onClick={signInWithGoogle}
          >
            <FcGoogle size={22} />
            <span className="font-medium text-black group-hover:text-white">
              Login with Google
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Name</label>
              <input
                required
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Email</label>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Password</label>
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
            >
              Sign Up
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

export default RegisterForm;
