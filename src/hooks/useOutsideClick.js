import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          //  console.log("click outside");
          handler();
        }
      }
      // 当点击add new cabin 按钮时，出发了两个listener，一个是按钮上的open，一个是根上的close(handler)。由于冒泡，所以close最后执行。但是改成true就是捕获了，open最后执行
      document.addEventListener("click", handleClick, listenCapturing);
      return () => document.removeEventListener("click", handleClick);
    },
    [handler, listenCapturing]
  );
  return ref;
}
