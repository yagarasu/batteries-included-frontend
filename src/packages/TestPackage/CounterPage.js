import React from 'react'

export default (props) => {
  const onIncrementClick = (e) => props.increment(1)
  const onDecrementClick = (e) => props.decrement(1)
  const onAsyncIncrementClick = (e) => props.asyncIncrement(5)
  return (
    <div>
      <h1>Counter</h1>
      <p>Counter: {props.counter}</p>
      <p>
        <button onClick={onIncrementClick}>Increment</button>
        <button onClick={onDecrementClick}>Decrement</button>
        <button onClick={onAsyncIncrementClick}>Async Increment</button>
      </p>
    </div>
  )
}
