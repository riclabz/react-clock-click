import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

const ListItem = (props) => {
  return <li>{props.value}</li>;
};

const NumberList = (props) => {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number*5} />
      )}
    </ul>
  );
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isToggleOn: true,
      numbers: [1, 2, 3, 4, 5]
    };
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
  // handleClick = () => {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  componentDidMount() {
    console.log("component Mounted");
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  render() {
    console.log("render called");

    const numbers = this.state.numbers;
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <NumberList numbers={numbers} />
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);