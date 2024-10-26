import { useState, useEffect } from "react";

//惰性初始化。传入一个函数，只在初次渲染时调用。如果传入一个函数的名字，则每次渲染都会调用

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
