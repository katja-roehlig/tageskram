import { useTracker } from "../app/TrackerProvider";
import styles from "./SettingsPage.module.css";
import { TRACKER_STORAGE_KEY } from "../state/trackerStorage";

export function SettingsPage() {
  const { data } = useTracker();
  console.log(data);
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
      <header>
        <div>
          <p className={styles.eyebrow}>Nützliches</p>
          <h2>Einstellungen</h2>
        </div>
      </header>
      <section className={styles.section}>
        <h3>Darstellung</h3>
        <p className={styles.hint}>Dark Mode (Bald verfügbar)</p>
      </section>

      <section className={styles.section}>
        <h3>Datensicherung</h3>
        <p className={styles.hint}>
          Sichere deine täglichen Tracker-Daten als Datei auf deinem Gerät.
        </p>
        <button className={styles.downloadButton} onClick={() => exportData()}>
          Backup erstellen
        </button>
      </section>

      <section className={styles.section}>
        <h3>Daten wieder abrufen</h3>
        <p className={styles.hint}>
          Wähle eine zuvor gespeicherte JSON-Datei aus, um deine Daten
          wiederherzustellen.
        </p>
        <label htmlFor="backup-upload" className={styles.importLabel}>
          Backup einspielen (Import)
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
