import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text ,Image,CheckboxGroup,Checkbox,Input,Form} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add,add2, del, asyncAdd ,change,allchange,alldel} from '../../actions/counter'

import './index.scss'

if (process.env.TARO_ENV === 'weapp') {
  require('./weapp.scss')
} else if (process.env.TARO_ENV === 'h5') {
  require('./h5.scss')
}

import namedPng from '../../assets/arrowd.png'
import namedPng2 from '../../assets/arrowdown.png'

import arrow from '../../assets/yuan.png'
import arrowactive from '../../assets/yuanactive.png'



@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  add2 (data) {
    dispatch(add2(data))
  },
  del (data) {
    dispatch(del(data))
  },
  asyncAdd () {
    dispatch(asyncAdd())
  },
  change(data){
    dispatch(change(data))
  },
  allchange(data,type){
    dispatch(allchange(data,type))
  },
  alldel(){
    dispatch(alldel())
  }
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  saveNewTodo (e) {
    console.log(111111111)
    let { newTodo } = this.state
  //  // if (!e.detail.value || e.detail.value === newTodo) return

    this.setState({
     newTodo: e.detail.value
    })
   }
   
   addTodo () {
    let { newTodo } = this.state
    let { add2 } = this.props
    if (!newTodo) return
    
    add2(newTodo)
    this.setState({
     newTodo: ''
    })
   }

   changeTodo(e){
    
    let { change } = this.props
     if(this.state.current==1){
      this.props.counter.todos.forEach(item=>{
        if(item.bstop){
          e.detail.value.push(item.id)
        }
      })
      change(e.detail.value)
     }else if(this.state.current==2){
      change(e.detail.value)
     }
     else{
      change(e.detail.value)
     }
    
   }
   
   delTodo (id) { 
    let { del } = this.props
    del(id)
   }

   allchange(id){
    let { allchange } = this.props
    allchange(id) 
   }
   changeTab(id){
     this.setState({
       current:id
     })
   }
   clear(){
    let {alldel}=this.props
    alldel()
   }
  
   changeone(id,bstop){
    let { change } = this.props
    let arr=[]
     this.props.counter.todos.forEach((res,index)=>{
       if(res.id==id){
         res.bstop=bstop
       }
      if(res.bstop){
        arr.push(res.id)
      }
      
     })
   
     change(arr)
     
   }
   constructor (props) {
    super (props)
   
    this.state = {
     newTodo: '',
     current:'0'
    }
   }

  componentWillReceiveProps (nextProps) {
  
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
     // 获取未经处理的todos并展示
   let { newTodo,current } = this.state
   let { todos, add, del } = this.props  //事件
   let list=['1','2','3']
   let num=0
   this.props.counter.todos.forEach(item=>{
    if(item.bstop==true){
      num++
    }
   })
   const todosJsx = this.props.counter.todos.filter(todo=>{
     if(current==1){
      if(!todo.bstop){
        return todo
      }
     }else if(current==2){
      if(todo.bstop){
        return todo
      }
     }
     else{
       return todo
     }
   }).map((todo,index) => {
   
    return (
     <View key={todo.id}  className='todos_item'>
       {/* <Checkbox  key={todo.id} className="check-item"  value={todo.id} checked={todo.bstop} ></Checkbox> */}
      {!todo.bstop?
         <Image onClick={this.changeone.bind(this, todo.id,true)} className="check-item-img"  src={arrow}></Image>:
         <Image onClick={this.changeone.bind(this, todo.id,false)} className="check-item-img" src={arrowactive}></Image>
        }
       {todo.bstop
        ? <View  className='todos_item_tis todos_item_tischs'>{todo.text}</View>
        : <View  className='todos_item_tis'>{todo.text}</View>
      }
       <View className='del' onClick={this.delTodo.bind(this, todo.id)}>x</View>
    </View>
    )
   })
   


    return (
      <View className='index'>
         <View className='idnex_h1'>todos</View>
       
        <View className='index todos'>
          <View className='add_wrap'>
     
          {this.props.counter.all?
          <Image  onClick={this.allchange.bind(this,1)}  className='add_im' src={namedPng2}>

          </Image>:<Image onClick={this.allchange.bind(this,2)}   className='add_im' src={namedPng}></Image>}
         
            <Input  onConfirm={this.addTodo.bind(this)} className='inputezx'  placeholder="填写新的todo" onInput={this.saveNewTodo.bind(this)} value={newTodo} />
         
            {/* <View className='add' onClick={this.addTodo.bind(this)}>+</View> */}
          </View>
          
          <View>
             <CheckboxGroup onChange={this.changeTodo.bind(this)}>{ todosJsx }</CheckboxGroup>
          </View> 
        
          {this.props.counter.todos.length>0 && 
          <View className="bottom">
              <View className="bottom-item-first">{num} item left</View>  
              <View  onClick={this.changeTab.bind(this,0)} className={this.state.current==0?'bottom-item hover':'bottom-item '}>All</View>
              <View  onClick={this.changeTab.bind(this,1)}  className={this.state.current==1?'bottom-item hover':'bottom-item '}>Active</View>
              <View  onClick={this.changeTab.bind(this,2)} className={this.state.current==2?'bottom-item hover':'bottom-item '}>Completed</View>

              {num>0 && <View  onClick={this.clear.bind(this)} className='bottom-item'>Clear</View>}
          </View>
          
          }
         

          </View>
      </View>
      
    )


  
  
   
  }
}

export default Index
