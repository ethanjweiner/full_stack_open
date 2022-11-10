# Requirements

- Implement functionality for voting for anecdotes
  - Dispatch vote actions upon clicks
    - Contains the anecdote's `id`
  - Update UI to match state of store
- Implement filter functionality
  - Implement the filter component (uncontrolled)
  - Add a `filter` to the Redux store state
    - Add a new reducer to the store
    - Create the new reducer and action creators with `createSlice`
  - Use the global `filter` to update the displayed list of anecdotes