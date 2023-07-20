import React from 'react';
import '../styles/App.css';
import { create, all } from 'mathjs';

const math = create(all);
const operations = ["/", "*", "-", "+"];

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      input: "",
      output : "0",
      isResultDisplayed: false,
      // flagDoubleNegation: false,
    }
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDot = this.handleDot.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event){
    const keyTrigger = event.key;
    const allowedTrigger = operations.find((key) => key === keyTrigger);
    
    if(allowedTrigger)
    {
      this.handleOperation(allowedTrigger);
      return;
    }
    if(!isNaN(keyTrigger))
    {
      this.handleNumberChange(String(keyTrigger));
      return;
    }
      
    if(keyTrigger === ".")
      this.handleDot();
    else if(keyTrigger === "Enter")
      this.handleSubmit();
    else if(keyTrigger === "Backspace")
      this.handleClear();
  }

  handleDot(){
    const output = this.state.output;
    if(output.includes("."))
      return;

    if (this.state.isResultDisplayed) {
      this.setState({
        input: "",
        output: "",
        isResultDisplayed: false,
      });
      return;
    }

    this.setState({
      input: this.state.input + ".",
      output: this.state.output + "."
    })
  }

  handleClear(){
    this.setState({
      input: "",
      output : "0",
    })
  }


  handleNumberChange(props){
    const input = this.state.input + props;

    //Deny action if 0 is already on display
    if(props === "0" && this.state.output === "0")
    return;

    // Check if "EQUAL" button were pressed
    if (this.state.isResultDisplayed) {
      this.setState({
        input: props,
        output: props,
        isResultDisplayed: false,
      });
      return;
    }

    // Track the most recent inserted number for "output"
    let lastIndexOperand = -1;
    for (const operation of operations) {
      const operationIndex = input.lastIndexOf(operation);
      if (operationIndex > lastIndexOperand) {
        lastIndexOperand = operationIndex;
      }
    }

    this.setState({
      input: input,
      output: input.slice(lastIndexOperand + 1),
    })
  }

  handleOperation(props) {
    if (this.state.input === "")
      return;
  
    if (this.state.isResultDisplayed) {
      this.setState({
        input: this.state.output + props,
        output: props,
        isResultDisplayed: false,
      });
      return;
    }
    // Default scenario
    this.setState({
      input: this.state.input + props,
      output: props,
    });
  }

  handleSubmit() {
    const { input } = this.state; 

    if(operations.find((operand) => operand === input[input.length - 1]))
      return; 

    let arrayOfSubstrings = input.split('').reverse();

    if(!arrayOfSubstrings.some((element) => operations.includes(element)) && this.isResultDisplayed === false)
    {
      this.setState({
        input: input + " = " + input,
        output: input,
        isResultDisplayed: true,
      });
      return;
    } else if(arrayOfSubstrings.includes("="))
      return;

    // Remove all symbols except the first two symbol from the right
    for(let i = 0; i < arrayOfSubstrings.length; i++)
    {
      //check when 1st element is "-"
      if(isNaN(arrayOfSubstrings[i]) && isNaN(arrayOfSubstrings[i + 1]))
        {
         while(isNaN(arrayOfSubstrings[i + 2]))
         {
             arrayOfSubstrings.splice(i + 2, 1)
         }
         if(arrayOfSubstrings[i] !=="-")
            arrayOfSubstrings.splice(i + 1, 1)
        }
    }
    let filteredInput = arrayOfSubstrings.reverse().join("");

  
    try {
      const result = math.evaluate(filteredInput);
      this.setState({
        input: input + " = " + result.toString(),
        output: result.toString(),
        isResultDisplayed: true,
      });
    } catch (error) {
      this.setState({
        input: "Error: " + error.message,
        output: "Error",
        isResultDisplayed: true,
      });
    }
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
              <button id='clear' className='operation-buttons'  onClick={this.handleClear}>AC</button>
              <button id='divide' className='operation-buttons' onClick={() => this.handleOperation(`/`)}>/</button>
              <button id='multiply' className='operation-buttons' onClick={() => this.handleOperation(`*`)}>x</button>
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
              <button id='decimal' className='number-buttons' onClick={this.handleDot}>.</button>
              <button id='equals' onClick={this.handleSubmit}>=</button>
            </div>
          </div>
        </div>
        <footer id='author' className='d-flex flex-column align-items-center justify-content-center mt-3 text-black'>
          Made by RTCriss
          <br />
          <a
            className="button"
            id="github-button"
            title="Author Github"
            target="_blank"
            rel="noopener noreferrer"
            href='https://github.com/CrissRT'
            style={{color: "black"}}
          >
            <i className="bi bi-github text-center" />
          </a>
          </footer>
      </div>
    );
  }
}

export default App;
