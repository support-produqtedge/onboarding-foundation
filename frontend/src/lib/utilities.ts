import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-UK", {
    weekday: 'long',
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
export function formatTime(input: string): string {
  const date = new Date(input);
  return date.toLocaleString("en-UK", {
    timeStyle: 'short',
  })
};

export function formatDateAndTime(input: string): string {
  const date = new Date(input);
  const formatter = new Intl.DateTimeFormat('en-UK', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const formattedDate = formatter.format(date);
  return formattedDate;
}

export function formatDay(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-UK", {
    weekday: 'long'
  })
}

export function generateRandomKey() {
  const randomId = Math.floor(10000000 + Math.random() * 90000000);
  return randomId;
}

export function dateWithoutTimezone(input: Date): string {
  const tzOffset = new Date(input).getTimezoneOffset() * 60000;
  const withoutTimezone = new Date(input.valueOf() - tzOffset)
  .toISOString()
  .slice(0, -1);

  return withoutTimezone;
}
