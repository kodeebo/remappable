import * as React from 'react'

const ScoreContext = React.createContext()

function scoreReducer(state, action) {
  switch (action.type) {
    case 'add': {
      return {score: state.score + action.score, countries: [...state.countries, action.code]}
    }
    case 'finish': {
      return state // ??
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function ScoreProvider({children}) {
  const [state, dispatch] = React.useReducer(scoreReducer, {score: 0, countries: []})
  const value = {state, dispatch}
  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
}

function useScore() {
  const context = React.useContext(ScoreContext)
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider')
  }
  return context
}

export {ScoreProvider, useScore}