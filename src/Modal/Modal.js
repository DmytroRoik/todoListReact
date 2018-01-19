import React, { Component } from 'react';
import './Modal.css';
import $ from 'jquery';


export default class Modal extends Component{
  constructor(props){
    super(props);
  };
componentDidUpdate=()=>{
  console.log(1);

}
componentDidMount=()=>{
  console.log(2);

}
  render(){

    const optionsState=['active','general'];
    if(!this.props.isModalShow)return null;
    return(
      <section className="Modal">
        <div className="Modal-content">
          <div  className="Modal-head">
          <button className=" Modal-close" onClick={this.props.onClickCloseModalHandler}>x</button>
          <h4>
            {this.props.title}
            </h4>
          </div>
          <form>
            <div>
              <label htmlFor="titleTask">Title</label>
              <input type="text" id="titleTask" />
            </div>

              <button onClick={this.props.onCreateTask}>Create</button>
            </form>
            {this.props.children}
         </div>
      </section>
    );
  }
}
