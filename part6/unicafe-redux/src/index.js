import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const addRating = (type) => {
    store.dispatch({ type });
  };

  const reset = () => store.dispatch({ type: 'ZERO' });

  return (
    <div>
      <button onClick={() => addRating('GOOD')}>good</button>
      <button onClick={() => addRating('OK')}>ok</button>
      <button onClick={() => addRating('BAD')}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
