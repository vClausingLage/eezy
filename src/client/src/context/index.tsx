import React, { createContext, useState } from 'react'

type PropType = {
    children: JSX.Element | JSX.Element[]
}

type AppContextValue = {
    contextState: any
    setContextState: React.Dispatch<React.SetStateAction<any>>
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const AppContextProvider = ({ children }: PropType) => {
    const [contextState, setContextState] = useState({})

    return (
        <AppContext.Provider value={{ contextState, setContextState }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider }