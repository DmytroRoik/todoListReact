import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import Task from './Task/Task.js';
import Modal from './Modal/Modal.js';

class App extends Component {
  state={
    active:[],
    completed:[],
    isModalShow:true,
    total_id:0
  };
  onTaskChangeHandler=(index,task)=>{
    let curTask_temp=this.state.active[index];

    let curTask={...curTask_temp,status:'completed'}
    this.state.completed.push(curTask);
    this.setState(this.state.completed);

    this.state.active.splice(index,1);
    this.setState(this.state.active);
  };

  onTaskDeleteClickHandler=(task,index)=>{
    if(task.status=='completed'){
      this.state.completed.splice(index,1);
      this.setState(this.state.completed);
    }
    else{
      this.state.active.splice(index,1);
      this.setState(this.state.active);
    }
    let tasks=JSON.stringify([JSON.stringify(this.state.active),JSON.stringify(this.state.completed)]);
    localStorage.setItem('tasks',tasks);
  };
  onClickCloseModalHandler=()=>{
    this.setState({isModalShow:false});
  };
  onCreateTaskHandler=(e,app)=>{
    e.preventDefault();
    let title=document.getElementById('titleTask').value;
    let status='active';
    if(!title)return;

    this.state.active.push({
      id: ++this.state.total_id,
      title:title,
      status:status
    });
    this.setState(this.state.active);
    let tasks=JSON.stringify([JSON.stringify(this.state.active),JSON.stringify(this.state.completed)]);
    localStorage.setItem('tasks',tasks);
    this.onClickCloseModalHandler();
  }

  render() {
    //TODO: Read from localStorage
    return (
      <div className="App">
        <header >
        <h1>Welcome to Your TODO List</h1>
        </header>
        <div id="modal">
          {this.state.isModalShow?
          <Modal
           title={'New Task'}
           isModalShow={this.state.isModalShow}
           onCreateTask={(e)=>this.onCreateTaskHandler(e,this)}
           onClickCloseModalHandler={this.onClickCloseModalHandler}
           >
          </Modal>
          :null}
        </div>
        <div className="ActiveTask container">
        <h4>Active Task <button className="btn-floating btn-large waves-effect waves-light btnAddTask" onClick={()=>{
          this.setState({isModalShow:true});
        }} >+</button></h4>
          {
            this.state.active.map((task,i)=>{
              return(
                  <Task
                    index={task.id}
                    status={task.status}
                    onChange={this.onTaskChangeHandler.bind(this,i,task)}
                    onClickDeleteTask={this.onTaskDeleteClickHandler.bind(this,task,i)}
                    key={task.id}
                    >
                    {task.title}
                  </Task>
              );
            })
          }

        </div>
        <div className="container">
          <h4>Completed Task</h4>
          {
            this.state.completed.map((task,i)=>{
              return(
                <Task
                 index={task.id}
                 status={task.status}
                 key={task.id}
                 onClickDeleteTask={this.onTaskDeleteClickHandler.bind(this,task,i)}
                 >
                 {task.title}
                </Task>
              );
            })
          }
        </div>
        </div>
      );
    }
  }
  export default App;
