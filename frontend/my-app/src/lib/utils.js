import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes and handles conditional logic
 * Example: cn("px-2", isTrue && "bg-red-500")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
