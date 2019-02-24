import React, { Component } from 'react';
import  { PropTypes } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css';
import './SourceCodePro.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Convert from './Convert';

const Output = (props) =>{
  return(
    <div id="output">{props.outputValue}</div>
  )
};
 
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      output: '',
      input: '',
      test: 'asdf'
    };
    this.buttonClickOK = this.buttonClickOK.bind(this);
    this.inputKeyDown = this.inputKeyDown.bind(this);
  } 
  
  buttonClickOK(){
    
    this.setState({output: Convert.hexToAscii(this.state.input)});
    console.log(this.state.input);
  }

  inputKeyDown(e){
    console.log('key: ' + e.key);
    this.setState({input: e.target.value});
    
  }

  render() {


    return (
      <div style={{height:'100%'}} className="container-fluid" align="center">
 
    
    <div  className="box" align="left">
      <h2 className="lw text-center">Convert</h2>
      <div className="well">
      <p className="mylabel">Enter a value:</p>
    <div className="row">
      <div className="col-sm-8 col-md-8 col-xs-8">
    <input className="text" id="input" className="form-control" onChange={this.inputKeyDown} onKeyDown={this.inputKeyDown} value={this.state.input}/></div>

      <div className="col-sm-2 col-md-2 col-xs-2">
        <button id="confirm" onClick={this.buttonClickOK} defaultValue='' className="btn btn-primary "><span className="fa fa-check-circle"></span> OK</button>   </div>
    </div><br/></div>
      <div className="well">
    <h3 className="mylabel">Results:</h3>
    <Output outputValue={this.state.output}/>
    </div>
</div>
    </div>

    );
  }
}

export default App;
