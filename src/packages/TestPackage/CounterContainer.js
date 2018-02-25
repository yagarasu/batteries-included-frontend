import { connect } from 'react-redux'
import { actions } from './counterDuck'
import CounterPage from './CounterPage'

const mapStateToProps = state => ({
  counter: state.counter.counter
})

const mapDispatchToProps = dispatch => ({
  increment: (number) => dispatch(actions.increment(number)),
  decrement: (number) => dispatch(actions.decrement(number)),
  asyncIncrement: (number) => dispatch(actions.asyncIncrement(number, 1000)),
  randomIncrement: () => dispatch(actions.randomIncrement())
})

export default connect(mapStateToProps, mapDispatchToProps)(CounterPage)
