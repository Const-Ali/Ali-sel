import React from "react";
import { createContext, useContext, useState } from "react";

// function Test() {
//   return <div>Test</div>;
// }

// export default Test;

// تعریف نوع برای خروجی useCounter
interface CounterHook {
  count: number;
  increment: () => void;
  decrement: () => void;
}

function useCounter(initialValue: number = 0): CounterHook {
  const [count, setCount] = useState<number>(initialValue);

  const increment = (): void => setCount(count + 1);
  const decrement = (): void => setCount(count - 1);

  return { count, increment, decrement };
}

function restr() {
  const { count, increment, decrement } = useCounter(10); // شروع شمارش از 10

  return (
    <div className="p-4 m-4">
      <p>شمارش: {count}</p>
      <button className="p-2 m-4 bg-slate-300" onClick={increment}>
        افزایش
      </button>
      <button className="p-2 m-4 bg-slate-400" onClick={decrement}>
        کاهش
      </button>
    </div>
  );
}

export default restr;
