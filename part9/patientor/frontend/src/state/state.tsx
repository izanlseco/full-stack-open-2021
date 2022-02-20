import { Diagnosis, Gender, Patient } from "../types";
import React, { createContext, useContext, useReducer } from "react";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patient: Patient;
  diagnoses: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  patient: { 
    id: "",
    name: "",
    occupation: "",
    gender: Gender.Other
  },
  diagnoses: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
