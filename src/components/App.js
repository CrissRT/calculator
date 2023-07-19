// import React from 'react';
// import '../styles/App.css';
// import { create, all } from 'mathjs';

// const operations = ["/", "*", "-", "+"];

// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       input: "",
//       output : "0",
//       isResultDisplayed: false,
//     }
//     this.handleNumberChange = this.handleNumberChange.bind(this);
//     this.handleOperation = this.handleOperation.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleClear = this.handleClear.bind(this);
//     this.handleDot = this.handleDot.bind(this);
//   }

//   handleDot(){
//     const output = this.state.output;
//     if(output.includes("."))
//       return;

//     if (this.state.isResultDisplayed) {
//       this.setState({
//         input: "",
//         output: "",
//         isResultDisplayed: false,
//       });
//       return;
//     }

//     this.setState({
//       input: this.state.input + ".",
//       output: this.state.output + "."
//     })
//   }

//   handleClear(){
//     this.setState({
//       input: "",
//       output : "0",
//     })
//   }

//   handleNumberChange(props){
//     const input = this.state.input + props;

//     if (this.state.isResultDisplayed) {
//       this.setState({
//         input: props,
//         output: props,
//         isResultDisplayed: false,
//       });
//       return;
//     }

//     if(props === "0" && this.state.output === "0")
//       return;

//     let lastIndexOperand = -1;
//     for (const operation of operations) {
//       const operationIndex = input.lastIndexOf(operation);
//       if (operationIndex > lastIndexOperand) {
//         lastIndexOperand = operationIndex;
//       }
//     }

//     this.setState({
//       input: input,
//       output: input.slice(lastIndexOperand + 1),
//     })
//   }

//   handleOperation(props){
//     if(this.state.input === "")
//       return;

//     if (this.state.isResultDisplayed) {
//       this.setState({
//         input: props,
//         output: props,
//         isResultDisplayed: false,
//       });
//       return;
//     }
    
//     if(operations.find((operation) => operation === props))
//     {
//       this.setState({
//         input: this.state.input.slice(0) + props,
//       })
//       return;
//     } 
//     this.setState({
//       input: this.state.input + props,
//       output: props,
//     })
//   }

//   handleSubmit(){
//     const { input } = this.state;

//     try {
//       const result = eval(input); // Evaluate the input string
//       this.setState({
//         input: input + " = " + result.toString(),
//         output: result.toString(),
//         isResultDisplayed: true,
//       });
//     } catch (error) {
//       this.setState({
//         input: "Error",
//         output: "Error",
//         isResultDisplayed: true,
//       });
//     }
//   }


//   render() {
//     return (
//       <div className="App">
//         <div id="calculator">
//           <div id="formula-screen">
//             {this.state.input}
//           </div>
//           <div className='output-screen' id='display'>
//             {this.state.output}
//           </div>
//           <div className="container text-center position-relative" id='button-wrapper'>
//             <div className="row">
//               <button id='clear' className='operation-buttons'  onClick={this.handleClear}>AC</button>
//               <button id='divide' className='operation-buttons' onClick={() => this.handleOperation(`/`)}>/</button>
//               <button id='multiply' className='operation-buttons' onClick={() => this.handleOperation(`*`)}>x</button>
//             </div>
  
//             <div className="row">
//               <button id='seven' className='number-buttons' onClick={() => this.handleNumberChange("7")}>7</button>
//               <button id='eight' className='number-buttons' onClick={() => this.handleNumberChange("8")}>8</button>
//               <button id='nine' className='number-buttons' onClick={() => this.handleNumberChange("9")}>9</button>
//               <button id='subtract' className='operation-buttons' onClick={() => this.handleOperation(`-`)}>-</button>
//             </div>
  
//             <div className="row">
//               <button id='four' className='number-buttons' onClick={() => this.handleNumberChange("4")}>4</button>
//               <button id='five' className='number-buttons' onClick={() => this.handleNumberChange("5")}>5</button>
//               <button id='six' className='number-buttons' onClick={() => this.handleNumberChange("6")}>6</button>
//               <button id='add' className='operation-buttons' onClick={() => this.handleOperation(`+`)}>+</button>
//             </div>
  
//             <div className="row">
//               <button id='one' className='number-buttons' onClick={() => this.handleNumberChange("1")}>1</button>
//               <button id='two' className='number-buttons' onClick={() => this.handleNumberChange("2")}>2</button>
//               <button id='three' className='number-buttons' onClick={() => this.handleNumberChange("3")}>3</button>
//             </div>
  
//             <div className="row">
//               <button id='zero' className='number-buttons' onClick={() => this.handleNumberChange("0")}>0</button>
//               <button id='decimal' className='number-buttons' onClick={this.handleDot}>.</button>
//               <button id='equals' onClick={this.handleSubmit}>=</button>
//             </div>
//           </div>
  
//         </div>
//       </div>
//     );
//   }
// }

// export default App;


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
    }
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDot = this.handleDot.bind(this);
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

  // handleNumberChange(props){
  //   const input = this.state.input + props;

  //   if (this.state.isResultDisplayed) {
  //     this.setState({
  //       input: props,
  //       output: props,
  //       isResultDisplayed: false,
  //     });
  //     return;
  //   }

  //   if(props === "0" && this.state.output === "0")
  //     return;

  //   let lastIndexOperand = -1;
  //   for (const operation of operations) {
  //     const operationIndex = input.lastIndexOf(operation);
  //     if (operationIndex > lastIndexOperand) {
  //       lastIndexOperand = operationIndex;
  //     }
  //   }

  //   this.setState({
  //     input: input,
  //     output: input.slice(lastIndexOperand + 1),
  //   })
  // }

  // handleOperation(props) {
  //   if (this.state.input === "")
  //     return;
  
  //   if (this.state.isResultDisplayed) {
  //     this.setState({
  //       input: this.state.output + props,
  //       output: props,
  //       isResultDisplayed: false,
  //     });
  //     return;
  //   }
  
  //   const lastChar = this.state.input.slice(-1);
  //   if (operations.includes(lastChar) && lastChar !== '-') {
  //     const updatedInput = this.state.input.slice(0, -1) + props;
  //     this.setState({
  //       input: updatedInput,
  //       output: props,
  //     });
  //     return;
  //   }
  
  //   if (operations.includes(props)) {
  //     this.setState({
  //       input: this.state.input + props,
  //     });
  //     return;
  //   }
  //   this.setState({
  //     input: this.state.input + props,
  //     output: props,
  //   });
  // }

  //start

  handleNumberChange(props){
    const input = this.state.input + props;

    if (this.state.isResultDisplayed) {
      this.setState({
        input: props,
        output: props,
        isResultDisplayed: false,
      });
      return;
    }

    if(props === "0" && this.state.output === "0")
      return;

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
  
    const lastChar = this.state.input.slice(-1);
    if (operations.includes(lastChar) && lastChar !== '-') {
      const updatedInput = this.state.input.slice(0, -1) + props;
      this.setState({
        input: updatedInput,
        output: props,
      });
      return;
    }
  
    if (operations.includes(props)) {
      this.setState({
        input: this.state.input + props,
      });
      return;
    }
    this.setState({
      input: this.state.input + props,
      output: props,
    });
  }

  //finish
  

  handleSubmit() {
    const { input } = this.state;
  
    try {
      const result = math.evaluate(input);
      this.setState({
        input: input + " = " + result.toString(),
        output: result.toString(),
        isResultDisplayed: true,
      });
    } catch (error) {
      this.setState({
        input: "Error",
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
      </div>
    );
  }
}

export default App;
