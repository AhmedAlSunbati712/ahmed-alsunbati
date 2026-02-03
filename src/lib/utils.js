import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

/** Public asset URL that respects Vite base (works on Vercel root and GH Pages subpath). */
export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
