import { demoCategories, moods } from "../data/defaults";
import type { TrackerData } from "../types";

export const TRACKER_STORAGE_KEY = "daily-tracker-state";

export const createInitialTrackerData = (): TrackerData => ({
  categories: demoCategories,
  moods,
  entries: {},
});
export const writeTrackerState = (data: TrackerData): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(data));
  } catch {}
};
export const readTrackerState = (): TrackerData => {
  if (typeof window === "undefined") return createInitialTrackerData();
  try {
    const rawFile = localStorage.getItem(TRACKER_STORAGE_KEY);
    if (!rawFile) return createInitialTrackerData();
    return JSON.parse(rawFile) as TrackerData;
  } catch {
    return createInitialTrackerData();
  }
};
