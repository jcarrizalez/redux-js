import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

const enhancers = [
  applyMiddleware([
    store => next => action => next(action), 
    thunk
    ]
  )
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
      serialize: true
    })
    : f => f;
  enhancers.push(devToolsExtension);
}

const store = createStore(
  combineReducers({
    database: (state = {}, action) => (action.type === "database") ? action.database : state
  }),
  compose(...enhancers)
);

const subscribe = store.subscribe;

const database = () => store.getState().database;

const storage = (type, key, data, v = '@rjc-') => {

  if (type === 'push' && data !== undefined) localStorage.setItem(v + key, JSON.stringify(data));
  else if (type === 'remove') localStorage.removeItem(v + key);
  else return JSON.parse(localStorage.getItem(v + key));
}

const is = name => (database().latest === name) ? ((name === 'search' && typeof database().search === 'boolean') ? false : true) : false;

const current = () => database().latest;

const remove = key => storage('remove', key);

const all = () => database();

const get = (key, warehouse) => {

  if (warehouse === true) {
    return storage('get', key) || get(key);
  }
  return database()[key];
};

const push = (name, data, warehouse) => {

  store.dispatch(dispacth => { dispacth({ type: 'database', database: { ...database(), latest: name, [name]: data } }) });
  if (warehouse === true) {
    storage('push', name, data);
  }
};

export default {
  store: (init) => store.dispatch(dispacth => { dispacth({ type: 'database', database: init }) }),
  is, current, all, get, push, remove, subscribe
};
