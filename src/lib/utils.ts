import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Public asset URL that respects Vite base (works on Vercel root and GH Pages subpath). */
export const assetUrl = (path: string): string => {
  const normalizedPath = path.replace(/^\//, "")
  return `${import.meta.env.BASE_URL}${encodeURI(normalizedPath)}`
}
