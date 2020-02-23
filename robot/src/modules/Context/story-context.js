import React from 'react'
import { testStories } from './test-content'

const StoryStateContext = React.createContext()
const StoryDispatchContext = React.createContext()

function storyReducer(state, action) {
  switch (action.type) {
    case 'clear': {
      return {stories : []}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function StoryProvider({children}) {
  const [state, dispatch] = React.useReducer(storyReducer, {stories: testStories})
  return (
    <StoryStateContext.Provider value={state}>
      <StoryDispatchContext.Provider value={dispatch}>
        {children}
      </StoryDispatchContext.Provider>
    </StoryStateContext.Provider>
  )
}

function useStoryState() {
  const context = React.useContext(StoryStateContext)
  if (context === undefined) {
    throw new Error('useStoryState must be used within a StoryProvider')
  }
  return context
}

function useStoryDispatch() {
  const context = React.useContext(StoryStateContext)
  if (context === undefined) {
    throw new Error('useCStoryDispatch must be used within a StoryProvider')
  }
  return context
}

export {StoryProvider, useStoryState, useStoryDispatch}