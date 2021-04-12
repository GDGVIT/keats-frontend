import React, { useState, createContext, Dispatch, SetStateAction } from 'react'

interface ContextType {
  stageState: [
    stage: String,
    setStage: Dispatch<SetStateAction<String>>
  ]
}

export const AppContext = createContext<ContextType>({} as any)

export const AppProvider = (props: any): JSX.Element => {
  const [stage, setStage] = useState<String>('getStarted')

  return (
    <AppContext.Provider value={{ stageState: [stage, setStage] }}>
      {props.children}
    </AppContext.Provider>
  )
}
