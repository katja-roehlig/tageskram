import { useTracker } from "../app/TrackerProvider";
import { useTrackerProgress } from "../hooks/useTrackerProgress";
import styles from "./HomePage.module.css";
import type { Quote } from "../types";

export function HomePage({
  quote,
  onEntry,
  onCalendar,
}: {
  quote: Quote;
  onEntry: () => void;
  onCalendar: () => void;
}) {
  const { items } = useTracker();
  const progress = useTrackerProgress();
  const active = items.filter((item) => item.gamification.enabled);
  return (
    <div className={styles.homeContainer}>
      <header className={styles.top}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Dein täglicher Begleiter</p>
          <h2>Schön, dich zu sehen!</h2>
        </div>
        <span className={styles.avatar}>☀️</span>
      </header>
      <section className={styles.hero}>
        <div className={styles.quoteContainer}>
          <p className={styles.eyebrow}>Zitat des Tages</p>
          <blockquote className={styles.quote}>{quote.text}</blockquote>
          <cite className={styles.quoteAuthor}>{quote.author}</cite>
        </div>
      </section>
      <section className={styles.sectionHead}>
        <h3 className={styles.heading}>Deine Ziele</h3>
      </section>
      <div className={styles.goals}>
        {active.map((item) => {
          const value = progress(item);
          return (
            <div
              className={styles.goalCard}
              key={item.id}
              style={{ "--accent": item.color } as React.CSSProperties}
            >
              <div className={styles.goalHeader}>
                <p className={styles.goalName}>{item.name}</p>
                {value && (
                  <strong className={styles.goalProgressNumber}>
                    {value.value} / {value.target}
                  </strong>
                )}
              </div>
              <div className={styles.goalDetails}>
                <div className={`centerElement ${styles.itemIcon}`}>
                  {item.icon}
                </div>
                {value && (
                  <div className={styles.goalBody}>
                    <div className={styles.progress}>
                      <i
                        className={styles.progressBar}
                        style={{
                          width: `${Math.min(100, (value.value / value.target) * 100)}%`,
                        }}
                      />
                    </div>
                    <small className={styles.goalPeriod}>{value.label}</small>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {!active.length && (
        <p className={styles.empty}>Noch keine Ziele angelegt.</p>
      )}
    </div>
  );
}
