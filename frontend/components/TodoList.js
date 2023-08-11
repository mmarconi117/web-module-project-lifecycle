import React from 'react';
import Todo from './Todo';


  export default class TodoList extends React.Component {
    constructor(props){
      super(props)
    }
    render() {
      const todos = this.props.todos.map(todo => {
        return (
          <Todo handleToggle={this.props.handleToggle} key={todo.id} todo={todo} />);
      });
      return (
        <div>
          {todos}
        </div>
      );
    }
  }
