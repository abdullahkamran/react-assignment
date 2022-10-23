import { Action, Dispatch, configureStore, createAction, combineReducers, PayloadAction } from "@reduxjs/toolkit";

export const increment = createAction<number>("increment");
export const decrement = createAction<number>("decrement");
export const setStep = createAction<number>("setStep");

export interface RootState {
    counter: number,
    step: number,
}

/**
 * Reducer to increment or decrement counter.
 * Checks the action and increments or decrements counter according to it.
 * @param {number} state The current state of counter (defaults to 0).
 * @param {PayloadAction<number>} action The redux action (increment or decrement) with step as payload which defaults to 1.
 * @return {number} The resulting counter.
 */
export const counter = (state = 0, action: PayloadAction<number>) => {
    const step = action.payload || 1;
    return increment.match(action) ? state + step : decrement.match(action) ? state - step : state;
}

/**
 * Reducer update step state in store.
 * @param {number} state The current state of step (defaults to 1).
 * @param {PayloadAction<number>} action The redux action with payload to set new step value.
 * @return {number} The resulting step.
 */
const step = (state = 1, action: PayloadAction<number>) => action.payload || state;

const root = combineReducers({ counter, step });

/**
 * Redux middleware that dispatches an increment action every second.
 */
const timer = ({ getState, dispatch }: { getState: () => RootState, dispatch: Dispatch }) => {

    setInterval(() => {
        const { counter, step } = getState();
        if (counter < 0) {
            dispatch(decrement(step));
        }
        else if (counter + step <= 10) {
            dispatch(increment(step));
        }
    }, 1000);

    return (next: Dispatch) => (action: Action) => {
        next(action);
    };
};

export const store = configureStore({
    reducer: root,
    middleware: [timer],
});
