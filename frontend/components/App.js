import React from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      inputValue: '',
    };
  }

  componentDidMount() {
    axios.get(URL)
      .then(res => {
        console.log(res)
        this.setState({ todos: res.data.data });
      })
      .catch(e => {
        console.log(`No you didn't!!!`);
      });
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleSubmit = () => {
    axios.post(URL, { name: this.state.inputValue })
      .then(res => {
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(res.data.data),
          inputValue: '', // Clear input after submission
        });
      })
      .catch(e => console.log('Fetch it another way, dawg!!'));
  }

  handleToggle = (id) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        // Toggle the 'completed' property
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });

    // Update the state with the new array of todos
    this.setState({ todos: updatedTodos });
  }

  handleClearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  render() {
    return (
      <div>
        <TodoList todos={this.state.todos} handleToggle={this.handleToggle} />

        <Form
          inputValue={this.state.inputValue}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />

        <button onClick={this.handleClearCompleted}>
          Clear Completed
        </button>
      </div>
    );
  }
}
