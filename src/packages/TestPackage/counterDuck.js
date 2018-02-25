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

export const asyncIncrement = (number, timeout) => container => dispatch => {
  setTimeout(() => {
    dispatch(increment(number))
  }, timeout)
}

export const randomIncrement = () => ({ RandomNum }) => dispatch => {
  return RandomNum.getRandom().then((num) => {
    dispatch(increment(num))
    return num
  })
}

export const actions = {
  increment,
  decrement,
  asyncIncrement,
  randomIncrement
}

export default handleActions({
  [INCREMENT]: incrementReducer,
  [DECREMENT]: decrementReducer
}, defaultState)
