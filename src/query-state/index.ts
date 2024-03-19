import { useEffect, useMemo, useState } from "react";

export const createQueryState = <S extends object>(initialState?: S) => {
  let state = Object.assign({}, initialState) as S;

  const listeners = new Set<VoidFunction>();
  const getStateSnapshot = () => {
    return state;
  };

  const resetState = () => {
    state = Object.assign({}, initialState);
  };

  const notifyListeners = () => listeners.forEach((cb) => cb());

  const syncURL = () => {
    //replaceState into url
  };

  // const rwLocalStateFromURL = () => {
  // const search = new URLSearchParams(location.search);
  // search.forEach((value, key) => {
  //   if (Object.keys(state).includes(key) && value) {
  //     state[key as keyof S] = JSON.parse(value);
  //   }
  // });
  // };

  const subscribe = (cb: VoidFunction) => {
    // if (!listeners.size) {
    //   if (location.search) rwLocalStateFromURL();
    //   replaceState();
    // }
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
      if (listeners.size === 0) resetState();
    };
  };
  return <T = S>(selector: (state: S) => T = (state) => state as unknown as T) => {
    const [_state, _setState] = useState<T>(selector(getStateSnapshot()));
    useEffect(() => subscribe(() => _setState(selector(getStateSnapshot()))), [selector]);

    const query = useMemo(
      () => ({
        getState: getStateSnapshot,
        set: (s: Partial<S>) => {
          state = { ...state, ...s };
          notifyListeners();
          syncURL();
        },
      }),
      []
    );

    return [_state as T, query] as const;
  };
};
