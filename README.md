## Getting started

```
npm install react-redux-jc;
```
or
```
yarn add react-redux-jc
```

### Usage
```
import redux from "react-redux-jc";
```
Add your initial storage in the index of your project

### Initial state settings, example
```
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

### Insert data

```
redux.push('sessions', {username:jc, data:'example'});
```
### Insert data and store in localstorage 

```
redux.push('sessions', {username:jc, data:'example'}, true);
```

### Query data

```
redux.get('sessions');
```
### Query data, if it is true query the localstorage

```
redux.get('sessions', true);
```
### Remove from localstorage

```
redux.remove('sessions');
```

### See all data

```
redux.all();
```

### Event listener, using hooks

```
useEffect(() => {

  const unsubscribe = redux.subscribe( () => {
    if(redux.is('sessions')){
      console.log('It is my event');
    }
  });
  return () => {
    unsubscribe();
  }
}, []);
```
### Event listener, using class

```
componentDidMount = () => {
  this.unsubscribe = redux.subscribe( () => {
    if(redux.is('sessions')){
      console.log('It is my event');
    }
  });
};

componentWillUnmount = () => {
  this.unsubscribe();
};
```


