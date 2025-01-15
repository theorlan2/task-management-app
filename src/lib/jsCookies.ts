import { TCookieOptions } from "@/types/cookies";

const isBrowser = typeof window !== "undefined";

export function getCookie(
  name: string,
  initialValue?: string,
): string | undefined {
  return (
    (isBrowser &&
      document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, "")) ||
    initialValue
  );
}

export function getCookieFormate<T = object>(name: string): T | undefined {
  if (isBrowser) {
    const result = document.cookie.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
    try {
      return JSON.parse(result);
    } catch (error) {
      console.log("error cookies", error);
    }
  }
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function stringifyOptions(options: TCookieOptions): string {
  return Object.keys(options).reduce((acc: string, key: string) => {
    if (key === "days") {
      return acc;
    } else {
      if ((options as any)[key] === false) {
        return acc;
      } else if ((options as any)[key] === true) {
        return `${acc}; ${key}`;
      } else {
        return `${acc}; ${key}=${(options as any)[key]}`;
      }
    }
  }, "");
}

export function setCookie(
  name: string,
  value: string,
  options?: TCookieOptions,
) {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: "/",
    ...options,
  };

  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5,
  ).toUTCString();

  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    stringifyOptions(optionsWithDefaults);
}
