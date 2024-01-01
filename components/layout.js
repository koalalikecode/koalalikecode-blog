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

export default function Layout({ children, active }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  const [menu, setMenu] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`${theme} transition-colors duration-500`} id="layout">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="blog cá nhân" />
        <title>koalalikecode</title>
      </Head>
      <header
        className={`sticky top-0 z-10 backdrop-blur transition-colors duration-500 border-b supports-backdrop-blur:bg-white/60 ${
          theme === "dark"
            ? "border-slate-50/[0.06] bg-[#0f172a]/90"
            : "bg-white/95 border-slate-900/10"
        }`}
      >
        <nav className="py-4">
          <div className="max-w-6xl mx-auto px-4 flex items-center lg:max-w-4xl sm:max-w-lg">
            <Link href="/">
              <a className="grow text-xl font-bold">koalalikecode</a>
            </Link>

            <div
              id="menu"
              className={`md:absolute transition-colors duration-500 md:top-14 md:flex-col md:inset-x-0 md:shadow-md md:shadow-black/10 ${
                menu ? "md:flex md:animate-fade-down" : "md:hidden"
              }`}
            >
              <Link href="/">
                <a
                  className={`opacity-70 hover:opacity-100 mr-6 py-4 md:px-6 md:mr-0 ${
                    active == "home"
                      ? "text-blue-550 opacity-100 font-semibold border-b-2 border-blue-550 md:border-l-4 md:border-b-0"
                      : ""
                  }`}
                >
                  Home
                </a>
              </Link>
              <Link href="/categories/code">
                <a
                  className={`opacity-70 hover:opacity-100 mr-6 py-4 md:px-6 md:mr-0 ${
                    active == "code"
                      ? "text-blue-550 opacity-100 font-semibold border-b-2 border-blue-550 md:border-l-4 md:border-b-0"
                      : ""
                  }`}
                >
                  Coding Posts
                </a>
              </Link>
              <Link href="/categories/life">
                <a
                  className={`opacity-70 hover:opacity-100 mr-6 py-4 md:px-6 md:mr-0 ${
                    active == "life"
                      ? "text-blue-550 opacity-100 font-semibold border-b-2 border-blue-550 md:border-l-4 md:border-b-0"
                      : ""
                  }`}
                >
                  Life Stories
                </a>
              </Link>
              <Link href="#">
                <a
                  className={`opacity-70 hover:opacity-100 mr-8 md:px-6 md:mr-0 md:py-4 ${
                    active == "about"
                      ? "text-blue-550 opacity-100 font-semibold border-b-2 border-blue-550 md:border-l-4 md:border-b-0"
                      : ""
                  }`}
                >
                  About me
                </a>
              </Link>
            </div>
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
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-4 lg:max-w-4xl pb-10 sm:max-w-lg">
        {children}
      </main>

      <footer className="border-t border-gray-400 max-w-6xl mx-auto px-4 py-5 lg:max-w-4xl sm:max-w-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-3">Contacts</h3>
            <div className="flex">
              <Link href="https://github.com/koalalikecode">
                <a target="_blank" className="text-4xl hover:opacity-80 mr-2">
                  <AiFillGithub className="duration-200 fill-slate-500 hover:fill-black" />
                </a>
              </Link>
              <Link href="https://www.linkedin.com/in/duy-nguyen-97845a217/">
                <a target="_blank" className="text-4xl hover:opacity-80 mr-2">
                  <AiFillLinkedin className="duration-200 fill-slate-500 hover:fill-sky-600" />
                </a>
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=100041242865819">
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
