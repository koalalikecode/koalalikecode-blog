import Head from "next/head";
import Link from "next/link";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiOutlineCopyright,
  AiOutlineMenu,
} from "react-icons/ai";
import { useContext, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-scss.min";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-bash";
import "prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js";
import { useEffect } from "react";
import LightThemeIcon from "../icons/LightThemeIcon";
import DarkThemeIcon from "../icons/DarkThemeIcon";
import { ThemeContext } from "../store/themeContext";
import Menu from "./menu";

export default function Layout({ children, active }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  const [menu, setMenu] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`${theme} transition-colors duration-300`} id="layout">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="koalalikecode" />
      </Head>
      <header
        className={`sticky top-0 z-10 backdrop-blur transition-colors duration-300 border-b supports-backdrop-blur:bg-white/60 ${
          theme === "dark"
            ? "border-slate-50/[0.06] bg-[#0f172a]/90"
            : "bg-white/95 border-slate-900/10"
        }`}
      >
        <div className="py-4">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center lg:max-w-4xl sm:max-w-lg">
            <Link legacyBehavior href="/">
              <a className="text-xl font-bold">koalalikecode</a>
            </Link>
            <div className="flex gap-8 md:gap-0 items-center">
              <Menu menu={menu} active={active} />
              <div
                className="cursor-pointer"
                onClick={() => {
                  const newTheme = theme === "dark" ? "light" : "dark";
                  setTheme(newTheme);
                  window.localStorage.setItem("theme", newTheme);
                }}
              >
                {theme === "light" && <LightThemeIcon />}
                {theme === "dark" && <DarkThemeIcon />}
              </div>

              <button
                onClick={() => setMenu(!menu)}
                className="hidden cursor-pointer ml-3 text-xl md:block"
              >
                <AiOutlineMenu />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 lg:max-w-4xl pb-10 sm:max-w-lg">
        {children}
      </main>

      <footer className="border-t border-gray-400 max-w-6xl mx-auto px-4 py-5 lg:max-w-4xl sm:max-w-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-3">Contacts</h3>
            <div className="flex">
              <Link legacyBehavior href="https://github.com/koalalikecode">
                <a target="_blank" className="text-4xl hover:opacity-80 mr-2">
                  <AiFillGithub className="duration-200 fill-slate-500 hover:fill-black" />
                </a>
              </Link>
              <Link
                legacyBehavior
                href="https://www.linkedin.com/in/duy-nguyen-97845a217/"
              >
                <a target="_blank" className="text-4xl hover:opacity-80 mr-2">
                  <AiFillLinkedin className="duration-200 fill-slate-500 hover:fill-sky-600" />
                </a>
              </Link>
              <Link
                legacyBehavior
                href="https://www.facebook.com/profile.php?id=100041242865819"
              >
                <a target="_blank" className="text-4xl hover:opacity-80">
                  <AiFillFacebook className="duration-200 fill-slate-500 hover:fill-blue-550" />
                </a>
              </Link>
            </div>
          </div>
          <div>
            <p className="flex items-center sm:text-sm opacity-70">
              <AiOutlineCopyright className="mr-1 text-sm opacity-70" />
              2024 koalalikecode
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
