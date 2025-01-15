import { useCallback, useState } from "react";

import {
  getCookie,
  removeCookie,
  setCookie,
  getCookieFormate,
} from "@/lib/jsCookies";

import { TCookieOptions } from "@/types/cookies";

export default function useCookie(key: string, initialValue?: string) {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue);
  });

  const removeItem = useCallback(() => {
    setItem(undefined);
    removeCookie(key);
  }, [key]);

  const updateItem: (value: string, options?: TCookieOptions) => void =
    useCallback(
      (value, options) => {
        setItem(value);
        setCookie(key, value, options);
      },
      [key],
    );

  return { item, updateItem, removeItem };
}

export function useCookies() {
  const setTheCookie: (
    key: string,
    value: string,
    options?: TCookieOptions,
  ) => void = useCallback((key, value, options) => {
    const initialValue = value || "";
    setCookie(key, initialValue, options);
  }, []);

  const deleteCookie = useCallback((key: string) => {
    removeCookie(key);
  }, []);

  const updateCookie: (
    key: string,
    value: string,
    options?: TCookieOptions,
  ) => void = useCallback((key, value, options) => {
    setCookie(key, value, options);
  }, []);

  return {
    setTheCookie,
    getCookie,
    getCookieFormate,
    updateCookie,
    deleteCookie,
  };
}
