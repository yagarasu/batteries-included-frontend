import { createAction, handleActions } from 'redux-actions'

const defaultState = {
  counter: 10
}

const INCREMENT = 'INCREMENT'
const incrementReducer = (state, { payload }) => ({ counter: state.counter + payload })
export const increment = createAction(INCREMENT)

const DECREMENT = 'DECREMENT'
const decrementReducer = (state, { payload }) => ({ counter: state.counter + payload })
export const decrement = createAction(DECREMENT)

export const asyncIncrement = (number, timeout) => dispatch => {
  setTimeout(() => {
    dispatch(increment(number))
  }, timeout)
}

export const actions = {
  increment,
  decrement,
  asyncIncrement
}

export default handleActions({
  [INCREMENT]: incrementReducer,
  [DECREMENT]: decrementReducer
}, defaultState)
