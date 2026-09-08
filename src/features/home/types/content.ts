export interface Category { id: number; slug: string; name: string; description: string | null; }
export interface MediaImage { url: string; name: string; }
export interface Motorcycle { id: number; slug: string; name: string; manufacturer: string; model_year: number; engine_cc: number | null; power_hp: number | null; price: string | null; currency: string; summary: string; details?: string | null; images: MediaImage[]; category?: Category | null; }
export interface Article { id: number; slug: string; title: string; excerpt: string; body?: string | null; image_url: string | null; published_at: string; category?: Category | null; }
export interface HomeContent { settings: Record<string, string | null>; categories: Category[]; motorcycles: Motorcycle[]; articles: Article[]; }
export interface ApiEnvelope<T> { data: T; message: string | null; errors: Record<string, string[]> | null; }
export interface PaginatedEnvelope<T> extends ApiEnvelope<T[]> { meta: { current_page: number; last_page: number; per_page: number; total: number; }; }
