import React, { Component } from "react";

class ClassComponentLifecycleDemo extends Component {
  constructor(props) {
    super(props);

    console.log("1. Constructor");

    this.state = {
      count: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("2. getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("4. componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("5. shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("7. getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("8. componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("9. componentWillUnmount");
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    console.log("3. Render");

    return (
      <div style={{ padding: "20px" }}>
        <h1>React Class Component Lifecycle</h1>

        <h2>Count: {this.state.count}</h2>

        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default ClassComponentLifecycleDemo;
