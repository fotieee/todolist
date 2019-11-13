import {
  ADD,
  MINUS,
  ADD2,
  DELETE,
  CHANGE,
  ALL,
  ALLDEL
} from '../constants/counter'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

export const add2 = (data) => {

  return {
    data,
    type: ADD2  
  }
}

export const del = (id) => {
  return {
    id,
    type: DELETE  
  }
}


export const change = (data) => {
  return {
    data,
    type: CHANGE  
  }
}


export const allchange = (data) => {
  return {
    data,
    type: ALL  
  }
}

export const alldel = () => {
  return {
  
    type: ALLDEL  
  }
}



// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
