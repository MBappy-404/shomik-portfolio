// lib/utils.ts
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export const stripHtmlTags = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

export default cn;
