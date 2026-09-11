import "../styles/globals.css";
import "../styles/prism_dracula.css";
import { ThemeContext } from "../store/themeContext";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const preferredDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    const localTheme = window.localStorage.getItem("theme");
    const initialTheme = localTheme || (preferredDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    document.body.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp;
