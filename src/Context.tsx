import React, { useState, createContext, Dispatch, SetStateAction } from 'react'

interface ContextType {
  stageState: [
    stage: string,
    setStage: Dispatch<SetStateAction<string>>
  ]
  joinClubState: [
    joinClub: string,
    setJoinClub: Dispatch<SetStateAction<string>>
  ]
}

export const AppContext = createContext<ContextType>({} as any)

export const AppProvider = (props: any): JSX.Element => {
  const [stage, setStage] = useState<string>('getStarted')
  const [joinClub, setJoinClub] = useState<string>('')

  return (
    <AppContext.Provider value={{ stageState: [stage, setStage], joinClubState: [joinClub, setJoinClub] }}>
      {props.children}
    </AppContext.Provider>
  )
}
