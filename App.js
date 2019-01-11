class App extends React.Component {
  state = {
    clock: true
  };

  handleClick = () => {
    this.setState(state => ({
      clock: !state.clock
    }));
  };

  render() {
    return (
      <>
        <SwitchButton active={this.state.clock} click={this.handleClick} />
        {this.state.clock && <Clock />}
      </>
    );
  }
}

const SwitchButton = props => {
  return (
    <button onClick={props.click}>
      {props.active ? "turn off" : "turn on"}
    </button>
  );
};

class Clock extends React.Component {
  interval = "";

  state = {
    time: this.getTime()
  };

  getTime() {
    const currentTime = new Date();
    return {
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds()
    };
  }

  setTime() {
    const time = this.getTime();
    this.setState({ time });
  }

  componentDidMount() {
    this.interval = setInterval(this.setTime.bind(this), 1000);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    const { hours, minutes, seconds } = this.state.time;

    return (
      <div>
        {hours > 9 ? hours : `0${hours}`}:
        {minutes > 9 ? minutes : `0${minutes}`}:
        {seconds > 9 ? seconds : `0${seconds}`}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
