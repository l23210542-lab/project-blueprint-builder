import { useSyncExternalStore } from "react";

type State = {
  carrito: string[];
  wishlist: string[];
  biblioteca: string[];
};

const initial: State = {
  carrito: ["2"],
  wishlist: ["3", "5"],
  biblioteca: ["6", "4"],
};

let state: State = initial;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());

export const store = {
  get: () => state,
  add: (k: keyof State, id: string) => {
    if (state[k].includes(id)) return;
    state = { ...state, [k]: [...state[k], id] };
    emit();
  },
  remove: (k: keyof State, id: string) => {
    state = { ...state, [k]: state[k].filter(x => x !== id) };
    emit();
  },
  has: (k: keyof State, id: string) => state[k].includes(id),
};

export function useStore() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    store.get,
    store.get,
  );
}
