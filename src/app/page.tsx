import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "./components/forms/SignupForm";

export default function Home() {
  return (
    <main className="flex flex-col">
      <nav className="flex flex-col">
        <div className="ml-4 font-bold mt-4 text-2xl">
          <h1>YuJin</h1>
        </div>
        <Image
          src="/logo.svg"
          alt="Yujin Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
        <Link href={"http://localhost:3000/signin"}>
          <button className="font-bold ml-2 mt-96 bg-slate-200">
            Sign In/Up
          </button>
        </Link>
      </nav>
    </main>
  );
}
