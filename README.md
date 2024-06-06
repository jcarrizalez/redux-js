![redux-js](https://github.com/jcarrizalez/redux-js/assets/8440072/03743174-1560-4e12-b8ec-f22ebdb37510)

## Getting started

```
npm install redux-js;
```
or
```
yarn add redux-js;
```

## Usage
```
import redux from redux-js";
```
Add your initial storage in the index of your project

## Initial state version deprecated
This option is only in this version in case you want to continue using 'database' as action and reducer unique for the whole store,for the next version this option will no longer be available.

```jsx
redux.deprecated();
```

## Initial state settings, example
```jsx
redux.store({
  environment:env,
  storage_cache:[],
  requests_executed:[],
  path:'',
  sessions:{},
  authorize:{},
  pag_count:10, 
  pag_position:'top', 
  list_type:'table'
});
```

## Insert data

```jsx
redux.push('sessions', {username:jc, data:'example'});
```
## Insert data and store in localstorage 

```jsx
redux.push('sessions', {username:jc, data:'example'}, true);
```

## Query data

```jsx
redux.get('sessions');
```
## Query data, if it is true query the localstorage

```jsx
redux.get('sessions', true);
```
## Remove from localstorage

```jsx
redux.remove('sessions');
```

## See all data

```jsx
redux.all();
```

## Event listener, using hooks (IN THE NEXT VERSION)
```jsx
// single
useEffect(() => {

  const unsubscribe = redux.subscribe('session', value => {
    console.log('It is my event session', value);
  });
  return () => unsubscribe();
});

// all
useEffect(() => {

  const unsubscribe = redux.subscribe( (value, key) => {
    if(key==='sessions'){
        console.log('It is my event session', value);
    }
  });
  return unsubscribe();
}, []);
```

## Event listener, using hooks
```jsx
useEffect(() => {

  const unsubscribe = redux.subscribe( () => {
    //Use 'is' or 'current'
    
    //Using is return boolean
    if(redux.is('sessions')){
      console.log('It is my event');
    }
    
    //Using current return string
    if(redux.current()==='sessions'){
      console.log('It is my event');
    }
  });
  return () => {
    unsubscribe();
  }
}, []);
```
## Event listener, using class

```jsx
componentDidMount = () => {
  this.unsubscribe = redux.subscribe( () => {
    //Use 'is' or 'current'
    
    //Using is return boolean
    if(redux.is('sessions')){
      console.log('It is my event');
    }
    
    //Using current return string
    if(redux.current()==='sessions'){
      console.log('It is my event');
    }
  });
};

componentWillUnmount = () => {
  this.unsubscribe();
};
```

## Using Redux DevTools Extension - "not required"

### 1. For Chrome

```
- from [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd);
```
### 2. For Firefox
```
- from [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/);
```

### 3. For other browsers and non-browser environment
```
- use [`remote-redux-devtools`](https://github.com/zalmoxisus/remote-redux-devtools).
```

## Animation Example
![redux-js-example1](https://github.com/jcarrizalez/redux-js/assets/8440072/544b7342-ab57-49aa-8503-f1f9b687fa5f)
