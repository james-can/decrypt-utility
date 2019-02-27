import Convert from '../Convert';
import React from 'react';
import { Component } from 'react';
import '../SourceCodePro.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import '../styles.css';
import  { PropTypes } from 'react';
import Output from './output';




class ConverterTool extends Component{
    constructor(props){
      super(props);
      this.state = {
        output: '',
        input: '',
        selectedOption1: null,
        selectedOption2: null,
        fromType: '',
        toType: '',
        disableInput:true
      };
      this.buttonClickOK = this.buttonClickOK.bind(this);
      this.inputKeyDown = this.inputKeyDown.bind(this);
      
    }
      
    buttonClickOK(){
      this.setState({output: Convert.hexToAscii(this.state.input)});
      console.log(this.state.input);
    }
  
    inputKeyDown(e){
      
      if(!e.key){
        console.log('inType: ' +  this.state.fromType);
        console.log('outtype: ' +  this.state.toType);
  
        let result = Convert.convertByType(e.target.value, this.state.fromType, this.state.toType);
        console.log('result: ' + result);
        
        this.setState({
          input: e.target.value,
          output: result
        });
      }
    }

    shouldDisableConversion = (opt1, opt2) => {
      if(opt1 === null || opt2 === null)
        return true;

      //console.log('selectedoption1: ' + prev.selectedOption1.value);
      //console.log('selectedoption2: ' + prev.selectedOption2.value);

      const disableConversion = opt1.value === 'dec' && opt2.value === 'ascii';
      return disableConversion || (opt1.value === 'ascii' && opt2.value === 'dec');
    }
  
    dropDown1Changed = (value) => {
      console.log('selectedoption1: ' + value.value);
      this.setState((prevState,props)=>(
        {
          selectedOption1:value,
          fromType: value.value,
          disableInput: this.shouldDisableConversion(value, prevState.selectedOption2)
         }
      ));
    }
    dropDown2Changed = (value) => {
      this.setState((prevState,props)=>(
        {
          selectedOption2:value,
          toType: value.value,
          disableInput: this.shouldDisableConversion(prevState.selectedOption1, value)
         }
      ));
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
        <div className="well subWell">
                  <p style={{marginBottom:'.75em',fontSize: '.75em'}}>convert</p>
                  <div className="row" style={{marginBottom: '15px'}}>
                    <div className="col-sm-4 col-md-4 col-xs-4">
                    
                    <Select
                      onChange={this.dropDown1Changed}
                      options={options}
                    />
                    </div>    
                    <div className="col-sm-8 col-md-8 col-xs-8">
                        <input type="text" id="input" disabled={this.state.disableInput} value={this.state.input} className="form-control" onChange={this.inputKeyDown} onKeyDown={this.inputKeyDown} value={this.state.input}/>
                    </div>
                  </div>
                  <p style={{marginBottom:'.75em',fontSize: '.75em'}}>to</p>
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

export default ConverterTool;