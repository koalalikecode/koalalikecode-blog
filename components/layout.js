import Head from "next/head";
import Link from "next/link";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiOutlineCopyright,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose,
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
import SearchBar from "./ui/SearchBar";

function DrawerLink({ href, label, isActive, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors duration-200 ${
        isActive
          ? "bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold"
          : "hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      {label}
    </Link>
  );
}

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

      {/* Gradient accent line pinned at top */}
      <div className="h-[3px] bg-gradient-to-r from-blue-500 to-violet-500" />

      <header
        className={`sticky top-0 z-10 backdrop-blur transition-colors duration-300 border-b supports-backdrop-blur:bg-white/60 ${
          theme === "dark"
            ? "border-slate-50/[0.06] bg-[#0f172a]/90"
            : "bg-white/95 border-slate-900/10"
        }`}
      >
        <div className="py-4">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center lg:max-w-4xl sm:max-w-lg">
            <Link href="/" className="text-xl font-bold font-mon">
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                koalalikecode
              </span>
            </Link>
            <div className="flex gap-8 md:gap-0 items-center">
              {/* Desktop nav — always hidden on mobile via menu={false} */}
              <Menu menu={false} active={active} onNavigate={() => {}} />
              <Link
                href="/search"
                aria-label="Go to search page"
                className="text-lg text-slate-500 transition hover:text-blue-550 md:hidden"
              >
                <AiOutlineSearch />
              </Link>
              <button
                type="button"
                className="cursor-pointer rounded-full p-1.5 hover:ring-1 hover:ring-blue-500/30 transition"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                onClick={() => {
                  const newTheme = theme === "dark" ? "light" : "dark";
                  setTheme(newTheme);
                  window.localStorage.setItem("theme", newTheme);
                }}
              >
                {theme === "light" && <LightThemeIcon />}
                {theme === "dark" && <DarkThemeIcon />}
              </button>

              <button
                onClick={() => setMenu(!menu)}
                className="hidden cursor-pointer ml-3 text-xl md:block"
                aria-label={menu ? "Close menu" : "Open menu"}
                aria-expanded={menu}
                aria-controls="mobile-drawer"
              >
                <AiOutlineMenu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 hidden md:block ${
          menu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenu(false)}
        aria-hidden="true"
      />

      {/* Mobile slide-in drawer */}
      <div
        id="mobile-drawer"
        className={`fixed top-0 right-0 z-50 h-full w-72 shadow-2xl flex-col hidden md:flex transition-transform duration-300 ${
          menu ? "translate-x-0" : "translate-x-full"
        } ${
          theme === "dark"
            ? "bg-[#0f172a] border-l border-slate-700"
            : "bg-white border-l border-slate-200"
        }`}
      >
        <div
          className={`flex items-center justify-between p-5 border-b ${
            theme === "dark" ? "border-slate-700" : "border-slate-200"
          }`}
        >
          <Link
            href="/"
            onClick={() => setMenu(false)}
            className="text-lg font-bold font-mon bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent"
          >
            koalalikecode
          </Link>
          <button
            onClick={() => setMenu(false)}
            className="text-xl rounded-full p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close menu"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="p-4">
          <SearchBar compact />
        </div>
        <nav className="flex flex-col px-4 gap-1">
          <DrawerLink
            href="/"
            label="Home"
            isActive={active === "home"}
            onClick={() => setMenu(false)}
          />
          <DrawerLink
            href="/categories/code"
            label="Coding Posts"
            isActive={active === "code"}
            onClick={() => setMenu(false)}
          />
          <DrawerLink
            href="/categories/life"
            label="Life Stories"
            isActive={active === "life"}
            onClick={() => setMenu(false)}
          />
          <DrawerLink
            href="/search"
            label="Search"
            isActive={active === "search"}
            onClick={() => setMenu(false)}
          />
        </nav>
        <div
          className={`mt-auto p-5 border-t ${
            theme === "dark" ? "border-slate-700" : "border-slate-200"
          } flex gap-3`}
        >
          <a
            href="https://github.com/koalalikecode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl"
          >
            <AiFillGithub className="duration-200 fill-slate-400 hover:fill-slate-900 dark:hover:fill-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/duy-nguyen-97845a217/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl"
          >
            <AiFillLinkedin className="duration-200 fill-slate-400 hover:fill-sky-600" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100041242865819"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl"
          >
            <AiFillFacebook className="duration-200 fill-slate-400 hover:fill-blue-550" />
          </a>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 lg:max-w-4xl pb-10 sm:max-w-lg">
        {children}
      </main>

      <footer
        className={`mt-16 border-t ${
          theme === "dark" ? "border-slate-700" : "border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-10 lg:max-w-4xl sm:max-w-lg">
          <div className="grid grid-cols-3 gap-8 mb-8 sm:grid-cols-1">
            {/* Column 1: Logo + tagline */}
            <div>
              <Link href="/" className="text-lg font-bold font-mon">
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  koalalikecode
                </span>
              </Link>
              <p className="mt-2 text-sm opacity-70 leading-relaxed">
                A personal blog about code and life. Sharing what I learn along
                the way.
              </p>
            </div>

            {/* Column 2: Quick links */}
            <div>
              <h4 className="font-semibold font-mon mb-3 text-sm uppercase tracking-wider opacity-60">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="opacity-70 hover:opacity-100 hover:text-blue-550 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/code"
                    className="opacity-70 hover:opacity-100 hover:text-blue-550 transition-colors"
                  >
                    Coding Posts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/life"
                    className="opacity-70 hover:opacity-100 hover:text-blue-550 transition-colors"
                  >
                    Life Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="opacity-70 hover:opacity-100 hover:text-blue-550 transition-colors"
                  >
                    Search
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Social */}
            <div>
              <h4 className="font-semibold font-mon mb-3 text-sm uppercase tracking-wider opacity-60">
                Connect
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/koalalikecode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl"
                >
                  <AiFillGithub className="duration-200 fill-slate-500 hover:fill-black dark:hover:fill-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/duy-nguyen-97845a217/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl"
                >
                  <AiFillLinkedin className="duration-200 fill-slate-500 hover:fill-sky-600" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100041242865819"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl"
                >
                  <AiFillFacebook className="duration-200 fill-slate-500 hover:fill-blue-550" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright row */}
          <div
            className={`pt-6 border-t ${
              theme === "dark" ? "border-slate-700" : "border-slate-200"
            } flex items-center justify-center`}
          >
            <p className="flex items-center text-sm opacity-60">
              <AiOutlineCopyright className="mr-1" />
              2024 koalalikecode. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
