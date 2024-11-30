import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme} className="text-xl">{theme === "light" ? <BiMoon /> : <BiSun />}</button>;
}
