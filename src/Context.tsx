import React, { useState, createContext, Dispatch, SetStateAction } from 'react'

interface ContextType {
  stageState: [
    stage: String,
    setStage: Dispatch<SetStateAction<String>>
  ]
  joinClubState: [
    joinClub: String,
    setJoinClub: Dispatch<SetStateAction<String>>
  ]
}

export const AppContext = createContext<ContextType>({} as any)

export const AppProvider = (props: any): JSX.Element => {
  const [stage, setStage] = useState<String>('getStarted')
  const [joinClub, setJoinClub] = useState<String>('')

  return (
    <AppContext.Provider value={{ stageState: [stage, setStage], joinClubState: [joinClub, setJoinClub] }}>
      {props.children}
    </AppContext.Provider>
  )
}
