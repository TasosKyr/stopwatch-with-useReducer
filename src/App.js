import "./index.css";

import { useReducer, useEffect, useRef } from "react";

const initialState = {
  isRunning: false,
  time: 0
};

function reducer(state, action) {
  if (!action.type) throw new Error();
  const states = {
    start: { ...state, isRunning: true },
    pause: { ...state, isRunning: false },
    reset: { isRunning: false, time: 0 },
    tick: { ...state, time: state.time + 1 }
  };
  return states[action.type];
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  useEffect(() => {
    if (!state.isRunning) {
      return;
    }
    idRef.current = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => {
      clearInterval(idRef.current);
      idRef.current = 0;
    };
  }, [state.isRunning]);

  return (
    <div className="stopwatch">
      {state.time}s
      <div>
        <button onClick={() => dispatch({ type: "start" })}>Start</button>
        <button onClick={() => dispatch({ type: "pause" })}>Stop</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}


