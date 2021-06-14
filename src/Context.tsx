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
  activeReaderState: [
    activeReader: {
      activePage: number
      activeClub: string
    },
    setActiveReader: React.Dispatch<React.SetStateAction<{
      activePage: number
      activeClub: string
    }>>
  ]
}

export const AppContext = createContext<ContextType>({} as any)

export const AppProvider = (props: any): JSX.Element => {
  const [stage, setStage] = useState<string>('getStarted')
  const [joinClub, setJoinClub] = useState<string>('')
  const [activeReader, setActiveReader] = useState<ContextType['activeReaderState'][0]>({ activePage: 1, activeClub: '' })

  return (
    <AppContext.Provider
      value={{
        stageState: [stage, setStage],
        joinClubState: [joinClub, setJoinClub],
        activeReaderState: [activeReader, setActiveReader]
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
