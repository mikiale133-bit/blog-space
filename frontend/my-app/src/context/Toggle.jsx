import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="w-full flex gap-2 items-center hover:bg-muted transition-colors">
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
