const reducer = require("./reducer.js");
// store.js
const createStore = (reducer, heightener) => {    
  // heightener是一个高阶函数,用于增强createStore    
  //如果存在heightener,则执行增强后的createStore    
  if (heightener) {        
      return heightener(createStore)(reducer)    
  }        
  let currentState = {}    
  let observers = []             //观察者队列    
  function getState() {        
      return currentState    
  }    
  function dispatch(action) {        
      currentState = reducer(currentState, action);        
      observers.forEach(fn => fn())    
  }    
  function subscribe(fn) {        
      observers.push(fn)    
  }    
  dispatch({ type: '@@REDUX_INIT' })//初始化store数据    
  return { getState, subscribe, dispatch }
}

const logger = store => next => action => {    
  console.log('log1')    
  let result = next(action)    
  return result
}

const thunk = store => next =>action => {
  console.log('thunk')    
  const { dispatch, getState } = store 
  console.log(store.dispatch.toString())   
  return typeof action === 'function' ? action(store.dispatch) : next(action)
}

const logger2 = store => next => action => {    
  console.log('log2')    
  let result = next(action)    
  return result
}

const applyMiddleware = (...middlewares) => createStore => reducer => {    
  const store = createStore(reducer)    
  let { getState, dispatch } = store    
  const params = {      
      getState,      
      dispatch: (action) => dispatch(action)      
      //解释一下这里为什么不直接 dispatch: dispatch      
      //因为直接使用dispatch会产生闭包,导致所有中间件都共享同一个dispatch,如果有中间件修改了dispatch或者进行异步dispatch就可能出错    
  }    

  const middlewareArr = middlewares.map(middleware => middleware(params)) 
 
  dispatch = compose(...middlewareArr)(dispatch)    
  return { ...store, dispatch }
}

//compose这一步对应了middlewares.reverse(),是函数式编程一种常见的组合方法
function compose(...fns) {
  if (fns.length === 0) return arg => arg    
  if (fns.length === 1) return fns[0]    
  return fns.reduce((res, cur) =>(...args) => res(cur(...args)))
}


const store = createStore(reducer, applyMiddleware(logger, thunk, logger2)); 

function addCountAction(dispatch) {  
  setTimeout(() => {    
      dispatch({ type: 'plus' })  
  }, 1000)
}

store.dispatch(addCountAction); 
