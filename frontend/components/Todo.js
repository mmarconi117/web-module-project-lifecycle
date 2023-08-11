import React from 'react';


export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const todo = this.props.todo;

    return (
      <li

        key={todo.id}
        onClick={() => this.props.handleToggle(this.props.todo.id)} // Use an arrow function to bind correctly
        style={{ color: todo.completed === false ? 'black' : 'red' }}
      >
        {todo.completed === true ? (
          <span>
            {todo.name}&nbsp;<span role="img" aria-label="Completed">✔</span>
          </span>
        ) : (
          todo.name
        )}
      </li>
    );
  }
}
