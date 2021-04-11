import React, { useState, createContext, Dispatch, SetStateAction } from 'react'

interface ContextType {
  userState: [
    user: boolean,
    setUser?: Dispatch<SetStateAction<boolean>>
  ]
}

export const AppContext = createContext<ContextType>({userState: [false]})

export const AppProvider = (props: any) => {
  const [user, setUser] = useState<boolean>(false)

  return (
    <AppContext.Provider value={{ userState: [user, setUser] }}>
      {props.children}
    </AppContext.Provider>
  )
}
