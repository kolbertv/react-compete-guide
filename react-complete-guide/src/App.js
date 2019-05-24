import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    );
  }
}

const BoilingVerdict = props => {
  if (props.celsius >= 100) {
    return <p> Вода закипит </p>;
  }
  return <p> Вода не закипит </p>;
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 'c'
    };
  }

  handleCelsiusChange = temperature => {
    this.setState({ scale: 'c', temperature });
  };

  handleFahrenheitChange = temperature => {
    this.setState({ scale: 'f', temperature });
  };

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
      </div>
    );
  }
}

const scaleNames = {
  c: 'Цельсия',
  f: 'Фаренгейта'
};

const toCelsius = fahrenheit => {
  return ((fahrenheit - 32) * 5) / 9;
};

const toFahrenheit = celsius => {
  return (celsius * 9) / 5 + 32;
};

const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: ''
    };
  }
  handleChange = e => {
    this.props.onTemperatureChange(e.target.value);
  };
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend> Введите температуру в градусах {scaleNames[scale]} </legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

export default App;
