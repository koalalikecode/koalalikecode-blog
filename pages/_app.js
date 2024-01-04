import "../styles/globals.css";
import "../styles/prism_dracula.css";
import { ThemeContext } from "../store/themeContext";
import { useLayoutEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  // On mount, read the theme from localStorage and update the state
  useLayoutEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp;
