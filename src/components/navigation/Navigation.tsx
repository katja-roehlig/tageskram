import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import {
  PlusCircleIcon,
  CalendarDotsIcon,
  ChartBarIcon,
  HouseIcon,
  GearSixIcon,
} from "@phosphor-icons/react";

const links: Array<[string, string, React.ComponentType<any>]> = [
  ["/", "Übersicht", HouseIcon],
  ["/entry", "Heute", PlusCircleIcon],
  ["/calendar", "Kalender", CalendarDotsIcon],
  ["/evaluation", "Auswertung", ChartBarIcon],
  ["/settings", "Einstellungen", GearSixIcon],
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={styles.navList}>
      {links.map(([path, label, IconComponent]) => {
        const isActive =
          location.pathname === path ||
          (path === "/entry" && location.pathname.startsWith("/entry/"));

        return (
          <button
            key={path}
            className={`${styles.navButton} ${isActive ? styles.navButtonActive : ""}`}
            onClick={() => navigate(path)}
          >
            <span className={styles.iconWrapper}>
              <IconComponent size={36} />
            </span>
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
