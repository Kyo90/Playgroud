const reducer = require("./reducer.js");

const createStore = (reducer) => {
  let currentState = {};
  let observers = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    observers.forEach((fn) => fn());
  }
  function subscribe(fn) {
    observers.push(fn);
  }
  dispatch({ type: "@@REDUX_INIT" });
  return { getState, dispatch, subscribe };
};

const store = createStore(reducer); //创建store

function logger(store) {    
  let next = store.dispatch    
  return (action) => {        
      console.log('logger1')        
      let result = next(action)        
      return result    
  }
}

function thunk(store) {    
  let next = store.dispatch    
  return (action) => {        
      console.log('thunk')        
      return typeof action === 'function' ? action(store.dispatch) : next(action)    
  }
}

function logger2(store) {    
  let next = store.dispatch        
  return (action) => {        
      console.log('logger2')        
      let result = next(action)        
      return result    
  }
}

function applyMiddleware(store, middlewares) {    
  middlewares = [ ...middlewares ]      
  middlewares.reverse()     
  middlewares.forEach(middleware =>      
      store.dispatch = middleware(store)    
  )
}

applyMiddleware(store, [ logger, thunk, logger2 ])


function addCountAction(dispatch) {  
  setTimeout(() => {    
      dispatch({ type: 'plus' })  
  }, 1000)
}

store.dispatch(addCountAction); 


//console.log(store.getState());
