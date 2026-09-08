import type { Locale } from "./config";
import ar from "./messages/ar.json";
import en from "./messages/en.json";
export type Messages = typeof ar;
export function getMessages(locale: Locale): Messages { return locale === "ar" ? ar : en; }
