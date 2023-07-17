import React from 'react';
import '../styles/App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      input: "",
      inputIntermediary: "",
      output : 0,
    }
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
  }

  handleNumberChange(props){
    const input = this.state.input;
    if(props === "clear")
    {
      this.setState({
        input: "",
        output: 0,
      })
      return;
    }
    
    if (props === '.' && input.includes('.')) 
      return; // Exit the function early if the output already contains a decimal symbol
    

    this.setState({
      input: input + props,
    })
  }

  handleOperation(props){
    const operations = ["/", "*", "-", "+"]
    const input = this.state.input;
    const lengthInput = input.length;
    const lastValueInput = input[lengthInput - 1];

    if(lastValueInput === ".")
      this.setState({
        input: input + "0",
      })

    if(lastValueInput === operations.find((operation)=> operation === lastValueInput))
    {
      this.setState({
        input: input.slice(0, lengthInput - 1) + props,
        output: props,
      });
      return;
    }
    this.setState({
      input: input + props,
      output: props,
    })

  }


  render() {
    return (
      <div className="App">
        <div id="calculator">
          <div id="formula-screen">
            {this.state.input}
          </div>
          <div className='output-screen' id='display'>
            {this.state.output}
          </div>
          <div className="container text-center position-relative" id='button-wrapper'>
            <div className="row">
              <button id='clear' className='operation-buttons'  onClick={() => this.handleNumberChange("clear")}>AC</button>
              <button id='divide' className='operation-buttons' onClick={() => this.handleOperation(`/`)}>/</button>
              <button id='multiply' className='operation-buttons' onClick={() => this.handleOperation(`+`)}>x</button>
            </div>
  
            <div className="row">
              <button id='seven' className='number-buttons' onClick={() => this.handleNumberChange("7")}>7</button>
              <button id='eight' className='number-buttons' onClick={() => this.handleNumberChange("8")}>8</button>
              <button id='nine' className='number-buttons' onClick={() => this.handleNumberChange("9")}>9</button>
              <button id='subtract' className='operation-buttons' onClick={() => this.handleOperation(`-`)}>-</button>
            </div>
  
            <div className="row">
              <button id='four' className='number-buttons' onClick={() => this.handleNumberChange("4")}>4</button>
              <button id='five' className='number-buttons' onClick={() => this.handleNumberChange("5")}>5</button>
              <button id='six' className='number-buttons' onClick={() => this.handleNumberChange("6")}>6</button>
              <button id='add' className='operation-buttons' onClick={() => this.handleOperation(`+`)}>+</button>
            </div>
  
            <div className="row">
              <button id='one' className='number-buttons' onClick={() => this.handleNumberChange("1")}>1</button>
              <button id='two' className='number-buttons' onClick={() => this.handleNumberChange("2")}>2</button>
              <button id='three' className='number-buttons' onClick={() => this.handleNumberChange("3")}>3</button>
            </div>
  
            <div className="row">
              <button id='zero' className='number-buttons' onClick={() => this.handleNumberChange("0")}>0</button>
              <button id='decimal' className='number-buttons' onClick={() => this.handleNumberChange(".")}>.</button>
              <button id='equals'>=</button>
            </div>
          </div>
  
        </div>
      </div>
    );
  }
}

export default App;
