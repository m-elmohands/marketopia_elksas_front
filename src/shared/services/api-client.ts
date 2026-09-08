const API_URL = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1";
const TIMEOUT_MS = 5000;

export async function apiGet<T>(path: string, attempts = 2): Promise<T | null> {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(`${API_URL}${path}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (response.status === 404) return null;
      if (response.ok) return (await response.json()) as T;
      if (response.status < 500) return null;
    } catch {
      // A single retry handles short API restarts without delaying the fallback UI.
    }
  }

  return null;
}
