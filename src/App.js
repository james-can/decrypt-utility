import React from 'react';
import { Component } from 'react';
import  { PropTypes } from 'react';
import logo from './logo.svg';
import './App.css';

import './SourceCodePro.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Convert from './Convert';
import Select from 'react-select';
import './styles.css';
//import './fontawesome-free-5.7.2-web/css/all.min.css';

const Output = (props) =>{
  return(
    <div id="output" style={props.styleProp} >{props.outputValue}</div>
  )
}
Output.defaultProps = {styleProp: {}};




class ConverterTool extends Component{
  constructor(props){
    super(props);
    this.state = {
      output: '',
      input: '',
      selectedOption1: null,
      selectedOption2: null,
      fromType: '',
      toType: ''
    };
    this.buttonClickOK = this.buttonClickOK.bind(this);
    this.inputKeyDown = this.inputKeyDown.bind(this);
    
  }
    
  buttonClickOK(){
    this.setState({output: Convert.hexToAscii(this.state.input)});
    console.log(this.state.input);
  }

  inputKeyDown(e){
    
    //if(!e.key){
      console.log('inType: ' + typeof this.state.fromType);
      console.log('outtype: ' + typeof this.state.toType);

      let result = Convert.convertByType(e.target.value, this.state.fromType, this.state.toType);
      console.log('result: ' + result);
      
      this.setState({
        input: e.target.value,
        output: result
      });
    //}
  }

  dropDown1Changed = (value) => {
    this.setState({
       selectedOption1:value,
       fromType: value.value
      });
    console.log(`Option selected:`, value);
  }
  dropDown2Changed = (value) => {
    this.setState({
      selectedOption2:value,
      toType: value.value
     });
    console.log(`Option selected:`, value);
  }

  render(){
    const options = [
      { value: 'hex', label: 'Hex' },
      { value: 'dec', label: 'Decimal' },
      { value: 'bin', label: 'Binary' },
      { value: 'ascii', label: 'ASCII' }
    ];
    //const { selectedOption } = this.state;
    return(
      <div className="well ">
                <p style={{marginBottom:'.75em',fontSize: '.75em'}}>Convert</p>
                <div className="row" style={{marginBottom: '15px'}}>
                  <div className="col-sm-4 col-md-4 col-xs-4">
                  
                  <Select
                    onChange={this.dropDown1Changed}
                    options={options}
                  />
                  </div>    
                  <div className="col-sm-8 col-md-8 col-xs-8">
                      <input className="text" id="input" value={this.state.input} className="form-control" onChange={this.inputKeyDown} onKeyDown={this.inputKeyDown} value={this.state.input}/>
                  </div>
                </div>
                <p style={{marginBottom:'.75em',fontSize: '.75em'}}>To</p>
                <div className="row" style={{marginBottom: '15px'}}>
                  <div className="col-sm-4 col-md-4 col-xs-4">
                  <Select
                    onChange={this.dropDown2Changed}
                    options={options}
                  />
                  </div>    
                  <div className="col-sm-8 col-md-8 col-xs-8">
                      <Output outputValue={this.state.output}/>
                  </div>
                </div>
                
                {/*<div >
                  <button id="confirm" style={{width:'100%'}} onClick={this.buttonClickOK} defaultValue='' className="btn btn-primary "><span className="fa fa-plus"></span> Convert</button>
                </div>*/}
                <br/>
            </div>
    )
  }
}

 
class App extends Component {
  constructor(props){
    super(props);
    
  } 

  render() {
 

    return (
      <div style={{height: '100%'}} className="container-fluid" align="center">


    <div className="box" align="left">
        <h2 className="lw text-center">Convert</h2>
        
          <div style={{width:'48%', float:'left'}}>
            <div className="well">

            </div>
          </div>
          <div style={{width:'48%', float:'right'}}>
            <div className="well" style={{height:'500px'}}>
            <ConverterTool/>
            </div>
          </div>
          
        
        <div className="well" style={{width:'48%', float:'left'}}>
          
        </div>
    </div>
</div>

    );
  }
}

export default App;
