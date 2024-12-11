import { useTheme } from "./ThemeProvider"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border dark:border-dark-4 bg-[#FFFFFF] dark:bg-dark-4 hover:bg-[#fdf2f8] dark:hover:bg-dark-3">
      <span className="sr-only">Toggle theme</span>
      {theme === "light" ? (
        <img src="/assets/icons/moon.svg" alt="dark mode" className="w-5 h-5" />
      ) : (
        <img src="/assets/icons/sun.svg" alt="light mode" className="w-5 h-5 invert" />
      )}
    </button>
  )
}

export default ThemeToggle
