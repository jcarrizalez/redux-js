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

## Initial state settings, example
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

## Insert data

```
redux.push('sessions', {username:jc, data:'example'});
```
## Insert data and store in localstorage 

```
redux.push('sessions', {username:jc, data:'example'}, true);
```

## Query data

```
redux.get('sessions');
```
## Query data, if it is true query the localstorage

```
redux.get('sessions', true);
```
## Remove from localstorage

```
redux.remove('sessions');
```

## See all data

```
redux.all();
```

## Event listener, using hooks

```
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

```
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
- or download `extension.zip` from [last releases](https://github.com/zalmoxisus/redux-devtools-extension/releases), unzip, open `chrome://extensions` url and turn on developer mode from top left and then click; on `Load Unpacked` and select the extracted folder for use
- or build it with `npm i && npm run build:extension` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./build/extension`;
- or run it in dev mode with `npm i && npm start` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./dev`.
```
### 2. For Firefox
```
- from [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/);
- or build it with `npm i && npm run build:firefox` and [load the extension's folder](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) `./build/firefox` (just select a file from inside the dir).
```
### 3. For Electron
```
- just specify `REDUX_DEVTOOLS` in [`electron-devtools-installer`](https://github.com/GPMDP/electron-devtools-installer).
```
### 4. For other browsers and non-browser environment
```
- use [`remote-redux-devtools`](https://github.com/zalmoxisus/remote-redux-devtools).
```

### Monitoring

Use one of our monitor apps to inspect and dispatch actions:
* [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) - Click "Remote" button (or press [`Cmd+Ctrl+Arrow up`](https://github.com/zalmoxisus/redux-devtools-extension#keyboard-shortcuts)) to open remote monitoring.
* [remotedev-rn-debugger](https://github.com/jhen0409/remotedev-rn-debugger) - Used in React Native debugger as a dock monitor.
* [atom-redux-devtools](https://github.com/zalmoxisus/atom-redux-devtools) - Used in Atom editor.
* [redux-dispatch-cli](https://github.com/jhen0409/redux-dispatch-cli) - A CLI tool for Redux remote dispatch.
* [vscode-redux-devtools](https://github.com/jkzing/vscode-redux-devtools) - Used in Visual Studio Code.
