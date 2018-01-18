import React, { Component } from 'react';
import './App.css';
import Task from './Task/Task.js';

class App extends Component {

  state={
    active:[
      {id:'1', status: 'immediate', title:'create TODO1 List' },
      {id:'2', status: 'immediate', title:'create TODO2 List' },
      {id:'3', status: 'immediate', title:'create TasdsdODO List' },
      {id:'7', status: 'immediate', title:'create TODO3 List' }
    ],
    completed:[
      {id:'4', status: 'completed', title:'create TODO4 List' },
      {id:'5', status: 'completed', title:'create TODO5 List' }
    ]
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
      console.log(1);
    }
    else{
      this.state.active.splice(index,1);
      this.setState(this.state.active);
      console.log(2);
    }
  };

  render() {
    return (
      <div className="App">
        <header >
        <h1>Welcome to Your TODO List</h1>
        </header>
        <div className="ActiveTask container">
        <h4>Active Task</h4>
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
