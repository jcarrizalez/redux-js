<p align="center">
<img src="https://assets.cdnar.net/assets/public/qubit/app/_redux-js.jpg">
</p>

## Getting started

```
npm install redux-js;
```
or
```
yarn add redux-js;
```

## Usage
```jsx
import redux from 'redux-js';
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

## Event listener, using hooks by key
```jsx
useEffect(() => {

  const unsubscribe = redux.subscribe('session', value => {
    console.log('It is my event sessions', value);
  });
  return () => unsubscribe();
});
```
## Event listener, using hooks by (value, key) 
```jsx
useEffect(() => {

  const unsubscribe = redux.subscribe( (value, key) => {
    if(key === 'sessions'){
        console.log('It is my event sessions', value);
    }
  });
  return unsubscribe();
}, []);
```
## Event listener, using hooks (old versions: Use 'is' or 'current') 
```jsx
useEffect(() => {

  const unsubscribe = redux.subscribe( () => {
    
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
## Event listener, using class: (value and key are allowed, example hooks)

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
<span align="center">
   <img src="https://assets.cdnar.net/assets/public/qubit/app/redux-js-example1.gif" width="500" height="300">
</span>
