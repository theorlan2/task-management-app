"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { persistor, AppStore, makeStore } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={storeRef.current}>{children}</Provider>
    </PersistGate>
  );
}
