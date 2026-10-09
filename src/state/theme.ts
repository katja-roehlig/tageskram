export type Theme = "light" | "dark" | "minimal";

export const THEME_STORAGE_KEY = "tageskram-theme";

export function initializeTheme(): Theme {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const theme: Theme =
    savedTheme === "light" || savedTheme === "dark" || savedTheme === "minimal"
      ? savedTheme
      : localStorage.length === 0 &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

  document.documentElement.dataset.theme = theme;
  return theme;
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.dataset.theme = theme;
}

export function getActiveTheme(): Theme {
  const theme = document.documentElement.dataset.theme;
  return theme === "dark" || theme === "minimal" ? theme : "light";
}
