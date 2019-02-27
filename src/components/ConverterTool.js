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
                        <input type="text" id="input" value={this.state.input} className="form-control" onChange={this.inputKeyDown} onKeyDown={this.inputKeyDown} value={this.state.input}/>
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