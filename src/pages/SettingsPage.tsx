import { useState } from "react";
import { useTracker } from "../app/TrackerProvider";
import styles from "./SettingsPage.module.css";
import { TRACKER_STORAGE_KEY } from "../state/trackerStorage";
import {
  DownloadSimpleIcon,
  DropIcon,
  MoonStarsIcon,
  SunIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react";
import { getActiveTheme, saveTheme, type Theme } from "../state/theme";

export function SettingsPage() {
  const { data } = useTracker();
  const [theme, setCurrentTheme] = useState<Theme>(getActiveTheme);
  const selectTheme = (nextTheme: Theme) => {
    saveTheme(nextTheme);
    setCurrentTheme(nextTheme);
  };
  const exportData = () => {
    const jsonData = JSON.stringify(data);
    const fileBlob = new Blob([jsonData], { type: "application/json" });
    const fileUrl = URL.createObjectURL(fileBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "tageskram_backup.json";
    downloadLink.click();
    URL.revokeObjectURL(fileUrl);
  };
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = event.target.files;
    if (!fileData || fileData.length === 0) return;
    const jsonFile = fileData[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const textResult = e.target?.result as string; //der reader extrahiert den Text, liest ihn aber nicht
      try {
        JSON.parse(textResult);
        localStorage.setItem(TRACKER_STORAGE_KEY, textResult);
        window.location.reload();
      } catch (error) {
        alert("Error: file is not a backup-file");
      }
    };
    reader.readAsText(jsonFile);
  };

  return (
    <div className={styles.settingsContainer}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Nützliches</p>
        <h2>Einstellungen</h2>
      </header>
      <section className={styles.section}>
        <div>
          <h3 className={styles.sectionTitle}>Darstellung</h3>
          <p className={styles.hint}>Wähle ein Design.</p>
        </div>
        <div
          className={styles.themeOptions}
          role="group"
          aria-label="Theme auswählen"
        >
          <button
            type="button"
            className={`${styles.themeButton} ${
              theme === "light" ? styles.themeButtonActive : ""
            }`}
            aria-pressed={theme === "light"}
            onClick={() => selectTheme("light")}
          >
            <SunIcon size={32} />
            Light
          </button>
          <button
            type="button"
            className={`${styles.themeButton} ${
              theme === "dark" ? styles.themeButtonActive : ""
            }`}
            aria-pressed={theme === "dark"}
            onClick={() => selectTheme("dark")}
          >
            <MoonStarsIcon size={32} />
            Dark
          </button>
          <button
            type="button"
            className={`${styles.themeButton} ${
              theme === "minimal" ? styles.themeButtonActive : ""
            }`}
            aria-pressed={theme === "minimal"}
            onClick={() => selectTheme("minimal")}
          >
            <DropIcon size={32} />
            Minimal
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <div>
          <h3 className={styles.sectionTitle}>Datensicherung</h3>
          <p className={styles.hint}>
            Sichere deine täglichen Tracker-Daten als Datei auf deinem Gerät.
          </p>
        </div>
        <button className={styles.downloadButton} onClick={() => exportData()}>
          <span className={styles.buttonIcon} aria-hidden="true">
            <DownloadSimpleIcon size={24} />
          </span>
          Sichern
        </button>
      </section>

      <section className={styles.section}>
        <div>
          <h3 className={styles.sectionTitle}>Daten wieder abrufen</h3>
          <p className={styles.hint}>
            Wähle eine gespeicherte JSON-Datei aus, um deine Daten
            wiederherzustellen.
          </p>
        </div>
        <label htmlFor="backup-upload" className={styles.importLabel}>
          <span className={styles.buttonIcon} aria-hidden="true">
            <UploadSimpleIcon size={24} />
          </span>
          Laden
        </label>
        <input
          id="backup-upload"
          type="file"
          accept=".json"
          onChange={importData}
          className={styles.hiddenInput}
        />
      </section>
    </div>
  );
}
