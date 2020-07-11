import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({
    database:(state={}, action) => (action.type==="database")? action.database : state
  }), 
  applyMiddleware(
    store => next => action => next(action), 
    thunk
  )
);

const subscribe = store.subscribe;

const database = () => store.getState().database;

const storage = (key, data, v='@rjc-') => (data)? localStorage.setItem(v+key,JSON.stringify(data) ) : JSON.parse(localStorage.getItem(v+key));

const is = (name) => (database().latest===name)? ((name==='search' && typeof database().search === 'boolean')? false : true) : false;

const all = () => database();

const get = (key, warehouse) => {
  
  if(warehouse===true){
    const data = storage(key);
    return (data) ? data : get(key);
  }
  return database()[key];
};

const push = (name, data, warehouse) => {

  store.dispatch( dispacth => { dispacth({ type:'database', database: {...database(), latest:name, [name]:data } }) });
  if(warehouse===true){
    storage(name,data);
  } 
};

export default {
  store:(init)=> store.dispatch( dispacth => { dispacth({ type:'database', database: init }) }), 
  is, all, get, push, subscribe
};
