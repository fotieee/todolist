import { ADD, MINUS,ADD2,DELETE,CHANGE ,ALL,ALLDEL} from '../constants/counter'

const INITIAL_STATE = {
 
  todos: [
    // {id: 0, text: '第一條todo'}
  ],
  all:false
}
function in_array(stringToSearch, arrayToSearch) {
  for (let s = 0; s < arrayToSearch.length; s++) {
   let thisEntry = arrayToSearch[s].toString();
   if (thisEntry == stringToSearch) {
    return true;
   }
  }
  return false;
}
export default function counter (state = INITIAL_STATE, action) {
  // 獵取當前todos條數，用以id自增
  let todoNum = state.todos.length+''
  
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }
     case ADD2:
     
        return {
          ...state,
          todos: state.todos.concat({
            id: todoNum,
            text: action.data,
            bstop:false
          }),
          all:false
        }
      case DELETE:
          let newTodos = state.todos.filter(item => {
            return item.id !== action.id
          })
          return {
            ...state,
            todos: newTodos
          }
          case CHANGE:
            // let newTodos2=[]
            // state.todos.forEach((item,index)=>{
            //   newTodos2[index]={}
            //   if(in_array(item.id,action.data)){
            //     newTodos2[index]=item
            //     newTodos2[index].bstop=true
            //   }else{
            //     newTodos2[index]=item
            //    newTodos2[index].bstop=false
            //   }
             
            // })
            let newTodos2=state.todos.map(item=>{
                if(in_array(item.id,action.data)){
                item.bstop=true
              }else{
                item.bstop=false
              }
              return item
            })
            let newbsop=false
            if(state.todos.length==action.data.length){
              newbsop=true
            }else{
              newbsop=false
            }
           
            return {
              ...state,
               todos: newTodos2,
               all:newbsop
            }
      case ALL:
          let newTodos3=[]
          let newbsop2=false
            state.todos.forEach((item,index)=>{
              newTodos3[index]={}
              if(action.data==2){
                newTodos3[index]=item
                newTodos3[index].bstop=true
                newbsop2=true
              }else{
                newTodos3[index]=item
                newTodos3[index].bstop=false
                newbsop2=false
              }
             
            })
            return{
              ...state,
              todos: newTodos3,
              all:newbsop2
            }
      case ALLDEL:
          let newTodosgg = state.todos.filter(item => {
            return !item.bstop 
          })
          return {
            ...state,
            todos: newTodosgg
          }

     default:
       return state
  }
}
