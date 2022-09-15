import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

const crtl = '@@CTRJC';

const reload = '@@INIT-RELOAD-BY:';

const development = (process.env.NODE_ENV === 'development') ? true : false;

const enhancers = [
  applyMiddleware(
    store => next => action => next(action), 
    thunk
  )
];

if (development) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true,
      serialize: true,
      actionsBlacklist: [crtl],
    })
    : f => f
  );
}

const createReducers = (data=undefined, new_key=false, reducers = {}) => {

  if(data === undefined){
    return combineReducers({
      [crtl]: (state = [], action) => (action.type === crtl) ? action[crtl] : state
    });
  }

  if(new_key!==false){
    reducers[reload+new_key] = (state = data[new_key], action) => (action.type === reload+new_key) ? action[reload+new_key] : state
  }

  Object.keys(data).forEach( name => {

    var init_state = data[name];

    if(init_state === undefined){
      if(development) {
        init_state = null;
        console.warn('redux-js reducer property "'+name+'" cannot be "undefined", by default it is set to "null"');
      }
    }
    reducers[name] = (state = init_state, action) => (action.type === name) ? action[name] : state
  });

  return combineReducers(reducers);
}

const store = createStore(
  createReducers(),
  compose(...enhancers)
);

store[crtl] = [];

store.latest = null;

const getState = () => store.getState();

const dispatch = (name, data) => {

  //asigno el actual y va antes del dispacth para que este disponible en el update
  store.latest = name;
  //Luego del latest
  store.dispatch(dispacth => { dispacth({ type: name, [name]: data }) });
}

store.injectStore = (data, new_key=false) => {

  Object.keys(data).forEach((name) => {

    //agrego al control interno de propiedades existentes
    if(store[crtl].indexOf(name) === -1){
      store[crtl].push(name);
      if(new_key === name){
        store.dispatch(dispacth => { dispacth({ type: reload+name, [reload+name]: 'you must add "'+name+'" in redux.store()' }) });
      }
    }

    var value = data[name];
    
    if(value === undefined){
      value = null;
    }
    //si el valor es igual no ejecuto el dispatch
    if(JSON.stringify(value) !== JSON.stringify(getState()[name])){
      dispatch(name, value);
    }
  });
}

const loadStore = (data, new_key=false) => {
  //remplazo del estado actual
  store.replaceReducer( createReducers(data, new_key) );
  store.injectStore(data, new_key);
}

const storage = (type, key, data, v = '@rjc-') => {

  if (type === 'push' && data !== undefined) localStorage.setItem(v + key, JSON.stringify(data));
  else if (type === 'remove') localStorage.removeItem(v + key);
  else return JSON.parse(localStorage.getItem(v + key));
}

const get = (key, warehouse) => {

  if (warehouse === true) {
    return storage('get', key) || get(key);
  }
  return getState()[key];
};

const push = (name, data, warehouse) => {

  //Valido existencia de registro 
  if(store[crtl].indexOf(name) === -1){
    if (development) {
      console.warn('redux-js reload reducers by property: "'+name+'", must add '+name+" to redux.store(), if not added, more memory is used for reloading");
    }
    loadStore({...getState(),[name]:data}, name);
  }
 
  dispatch(name, data);
  //si es data que va al localstore, escribo registro
  if (warehouse === true) {
    storage('push', name, data);
  }
};

const subscribe = (closure1, closure2) => {
  
  if(closure1 === undefined && closure2 === undefined){
    return store.subscribe();
  }

  if(typeof closure1 === 'function' && closure2 === undefined){
    return store.subscribe( () => closure1(store.getState()[store.latest], store.latest)  );
  }

  let key = closure1;
  let fnc = closure2;

  if(typeof closure1 === 'function'){
    key = closure2;
    fnc = closure1;
  }

  return store.subscribe( () => (store.latest === key) ? fnc(store.getState()[key]) : undefined);
}

export default {
  store: init => loadStore(init),
  is: name => (store.latest === name) ? true : false,
  all: () => getState(),
  current: () => store.latest, 
  remove: key => storage('remove', key), //remove from localstore
  get, push, subscribe,
};
