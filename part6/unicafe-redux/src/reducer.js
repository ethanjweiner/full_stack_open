// Reducer

// Types of actions:
// - Those that increment a particular review type
// - ZERO: Resets the reviews to zero

// Tests:
// - Test that the incrementation/zeroing properly updates state
// - Test that reducers are immutable (by deep freezing state)

const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 };
    case 'OK':
      return { ...state, ok: state.ok + 1 };
    case 'BAD':
      return { ...state, bad: state.bad + 1 };
    case 'ZERO':
      return { ...initialState };
    default:
      return state;
  }
};

export default counterReducer;
