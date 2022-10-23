// This program uses redux to show a counter that can be incremented or decremented from buttons.
// Also it has a timer that increases counter automatically.
// A dropdown has been added to change the step of increment/decrement.
// Unit tests have been provided for redux actions and reducers.

import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, RootState, setStep } from "./store";
import './App.css';

export const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter);
  const step = useSelector((state: RootState) => state.step);

  useEffect(() => {
    // Log timestamp when component did mount
    console.log(Date());
  }, []);

  useEffect(() => {
    // Trigger an alert when counter reaches 20
    if (counter === 20) {
      alert('Counter reached 20.');
    }
  }, [counter]);

  function onStepChanged(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(setStep(Number(event.target.value)));
  }

  return (
    <>
      <button onClick={() => dispatch(decrement(step))}>-</button>
      {counter}
      <button onClick={() => dispatch(increment(step))}>+</button>
      <div>
        <label htmlFor="stepSelect">Step</label>
        <select id="stepSelect" value={step} onChange={onStepChanged}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </>
  );
};
