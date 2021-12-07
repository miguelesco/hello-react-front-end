import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

const initialState = {
  greetings: [
    {
      id: 1,
      name: 'Hello',
    },
    {
      id: 2,
      name: 'World',
    },
  ],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_GREETINGS_SUCCESS':
      return { greetings: action.json };
    default:
      return state;
  }
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
}
