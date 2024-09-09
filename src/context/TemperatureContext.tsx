import React, { createContext, useReducer, ReactNode } from 'react'

interface TemperatureState {
  minValue: number
  maxValue: number
}

type TemperatureAction =
  | { type: 'SET_MIN_VALUE'; payload: number }
  | { type: 'SET_MAX_VALUE'; payload: number }

const initialState: TemperatureState = {
  minValue: -50,
  maxValue: 50,
}

const temperatureReducer = (
  state: TemperatureState,
  action: TemperatureAction,
): TemperatureState => {
  switch (action.type) {
    case 'SET_MIN_VALUE':
      return { ...state, minValue: action.payload }
    case 'SET_MAX_VALUE':
      return { ...state, maxValue: action.payload }
    default:
      return state
  }
}

export interface TemperatureContextType {
  minValue: number
  maxValue: number
  setMinValue: (value: number) => void
  setMaxValue: (value: number) => void
}

export const TemperatureContext = createContext<TemperatureContextType>({
  minValue: initialState.minValue,
  maxValue: initialState.maxValue,
  setMinValue: () => {},
  setMaxValue: () => {},
})

interface TemperatureProviderProps {
  children: ReactNode
}

export const TemperatureProvider: React.FC<TemperatureProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(temperatureReducer, initialState)

  const setMinValue = (value: number) => {
    dispatch({ type: 'SET_MIN_VALUE', payload: value })
  }

  const setMaxValue = (value: number) => {
    dispatch({ type: 'SET_MAX_VALUE', payload: value })
  }

  return (
    <TemperatureContext.Provider
      value={{
        minValue: state.minValue,
        maxValue: state.maxValue,
        setMinValue,
        setMaxValue,
      }}
    >
      {children}
    </TemperatureContext.Provider>
  )
}
