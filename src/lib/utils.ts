
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createBulletPoint(text: string) {
  return `<div class="flex items-center mb-2">
    <span class="text-flyboy-gold mr-2">•</span>
    <span>${text}</span>
  </div>`;
}

export function createGoldHeading(text: string) {
  return `<h3 class="text-flyboy-gold text-xl font-bold mb-4">${text}</h3>`;
}
