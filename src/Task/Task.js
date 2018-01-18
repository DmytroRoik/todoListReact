import React from 'react';
import './Task.css';

const Task=(props)=>{
  let classes=['Task'];
  if(props.status=='completed'){
    classes.push('completed');
  }
  return(
    <div className={classes.join(' ')}>
      <p>
        {props.status=='completed'?
        <input type="checkbox" disabled id={"task-"+props.index}/>
          :<input type="checkbox" id={"task-"+props.index}
          onChange={props.onChange}/>}

      <label htmlFor={"task-"+props.index}>{props.children}</label>
      <button className="deleteTask" onClick={props.onClickDeleteTask}>x</button>
      </p>
    </div>
  );
}
export default Task;
