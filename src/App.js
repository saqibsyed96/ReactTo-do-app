import React, { Component } from 'react'
import './App.css'
import ListItems from './ListItems'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Scrollbars} from 'react-custom-scrollbars'
import Textarea from './Textarea'

library.add(faTrash)
toast.configure()

export default class App extends Component {
  constructor(props){
    super(props);
      this.state={
        items:[],
        currentItem:{
          text:'',
          key:'',
          textL:0
        },
        count:0
      }
      this.handleInput = this.handleInput.bind(this);
      this.addItem = this.addItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.setUpdate = this.setUpdate.bind(this);
      this.notifyMsg = this.notifyMsg.bind(this);
      this.notify = this.notify.bind(this);    
    }

    handleInput(e) {
      this.setState({
        currentItem:{
          text: e.target.value,
          key:Date.now(),
          textL: e.target.value.length
        }
        
      })
    }

    addItem(e){
      e.preventDefault();
      const newItem = this.state.currentItem;
      if(newItem.text !== ""){
        const newItems = [...this.state.items, newItem];
        this.setState({
          items:newItems,
          currentItem:{
            text:"",
            key:"",
            textL:0
          },
          count: this.state.count + 1
        })
      }
    }
    deleteItem(key){
      const filteredItems = this.state.items.filter(item =>
        item.key !== key);
        this.setState({
          items:filteredItems,
        count: this.state.count - 1
        })
        this.notify()
      }
    setUpdate(text, key){
        const items = this.state.items;
        // eslint-disable-next-line array-callback-return
        items.map(item => {
          if(item.key === key){
            item.text= text;
          }
        })
        this.setState({
          items: items
        })
    }
    notifyMsg = () => {
      toast.success("Add Note Successfully..!!" , {
        autoClose:2000
      })
    }
    notify = () => {
      toast.error("Note Deleted..!!", {
        autoClose:2000
      })
    }
  render() {
    return (
      <div className="App" >
        <Scrollbars style={{width:"400px", height:"530px"}} >
        <h1>Syed's To Do List</h1>
        <h3  className="counter">Total Notes: {this.state.count}</h3>
        <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <Textarea className="textarea"
              type="text" placeholder="Enter Text"
              value={this.state.currentItem.text} 
              onChange={this.handleInput}
              cleartext = {this.clearText}
              />
          <button type="submit" onClick={this.notifyMsg} > Add </button>
          <span id="char">
            Max Character {this.state.currentItem.textL}/150
          </span>
        </form>
      </header>
      <ListItems items={this.state.items} 
      deleteItem={this.deleteItem}
      setUpdate = {this.setUpdate}
      />
      </Scrollbars>
      </div>
    )
  }
}

