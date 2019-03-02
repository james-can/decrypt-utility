
import React from 'react';
import { Component } from 'react';
import '../SourceCodePro.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import '../styles.css';


import ListItems from './ListItems';
import Convert from '../Convert';

const EmphasizedChar = (props) =>{
  if(props.emphasized){
    let localStyle = {};
    localStyle.color = 'red';
    localStyle.backgroundColor = 'black';
    return <span style={localStyle}>*</span>
  }else{
    return <span style={props.styleProp}>{props.char}</span>;
  }
    
};

const mapSpaces = (str, styleProp = {}) =>{
  
  return str.split('').map((item, index)=> <EmphasizedChar key={index.toString()} styleProp={styleProp} char={item} emphasized={item.charCodeAt(0) % 32 === 0}/>);
};

class XorTool extends Component{
    constructor(props){
      super(props);
      this.dropDownChanged = this.dropDownChanged.bind(this);
      this.closeHandler = this.closeHandler.bind(this);
      this.buttonClickOK = this.buttonClickOK.bind(this);
      this.inputKeyDown = this.inputKeyDown.bind(this);

      this.state = {
        input: '',
        output: '',
        outputStyled: '0',
        outputNonStyled: '',
        selectedOption : null,
        items:[],
        disableInput: true
      }

     
    }
  
    dropDownChanged(event){
      this.setState({input: ''});
      this.setState((prevState, props) =>(
        {
          selectedOption: event, 
          disableInput: false, 
          output: prevState.selectedOption === null ? '0' : Convert.convertByType(prevState.output,  prevState.selectedOption.value, event.value)
        }));
    }

    closeHandler(id){
      this.setState((prevState, props)=>{
        const filtered = prevState.items.filter((currentVal)=> currentVal.id !== id);
        let binaryArray = [];
        for (let i in filtered)
          binaryArray.push(filtered[i].binaryValue);
        return{
          
          output: Convert.convertByType(Convert.batchXor(binaryArray), 'bin', prevState.selectedOption.value),
          items: filtered
        }
      }
      )
    }

    buttonClickOK(){
      if(this.state.selectedOption === null || this.state.input.length === 0)
        return;

      let xor = Convert.xor('1110', '1000');


      this.setState((prevState, props) =>{
        const newItem = {
          id: prevState.items.length,
          output: prevState.input,
          binaryValue: Convert.convertByType(prevState.input, prevState.selectedOption.value, 'bin' )
        };

        let binaryArray = [newItem.binaryValue];

        for (let i in prevState.items)
          binaryArray.push(prevState.items[i].binaryValue);

        const output = Convert.convertByType(Convert.batchXor(binaryArray), 'bin', prevState.selectedOption.value);

        return{
          input: '',
          items: [...prevState.items, newItem],
          output: output,
          outputStyled: output
        }
      })
    }

    inputKeyDown(e){
      var validInput;

      switch(this.state.selectedOption.value){
        case 'hex':
        validInput = /^[a-f0-9]+$/i.test(e.target.value);
        break;
        case 'bin':
        validInput = /^[01]+$/i.test(e.target.value);
        break;
        case 'dec':
        validInput = /^[0-9]+$/i.test(e.target.value);
        break;
        case 'ascii':
        validInput = /^.+$/i.test(e.target.value);
        break;

      }

      const inputText = e.target.value;

      if(validInput ||  inputText.length === 0)
        this.setState((prevState,props)=>{
          
          
          const newBinary = Convert.convertByType(inputText,  prevState.selectedOption.value, 'bin' );
          let binaryArray = [];

          for (let i in prevState.items) 
            binaryArray.push(prevState.items[i].binaryValue);

          const text = `${Convert.convertByType(Convert.batchXor(inputText.length === 0 ? binaryArray : [...binaryArray, newBinary]), 'bin', prevState.selectedOption.value)}`;
           

          const styled = (text.substr(text.length - inputText.length ));
          const nonStyled = (text.substr(0, text.length - inputText.length ));


          return {
            output:text,
            input: inputText,
            outputStyled: mapSpaces(styled , {backgroundColor:'blue',color:'white'} ),
            outputNonStyled: mapSpaces(nonStyled)
          }
        });
    }
  
    render(){
      const options = [
        { value: 'hex', label: 'Hex' },
        { value: 'dec', label: 'Decimal' },
        { value: 'bin', label: 'Binary' },
        { value: 'ascii', label: 'ASCII' }
      ];
      return(
        <div>
          
          <div className="well subWell" style={{borderRadius: '20px 20px 0px 0px'}}>
            <p style={{marginBottom:'.75em',fontSize: '.75em'}}>xor<span style={{color:'blue'}}>{`  length: ${this.state.outputNonStyled.length + this.state.outputStyled.length}`}</span></p>
            <div className="row">
              <div className="col-sm-12 col-xs-12 col-md-12 col-lg-12" style={{marginBottom:'5px'}}>
              <div id="output">
                {/* this.state.output */}
                {(this.state.outputNonStyled)}{(this.state.outputStyled)}
              </div>
              </div>
            </div>
            <p style={{marginBottom:'.75em',fontSize: '.75em'}}>input</p>
            <input type="text" id="input" disabled={this.state.disableInput} value={this.state.input} className="form-control" onChange={this.inputKeyDown}  value={this.state.input}/>
            <div className="row">
              <div className="col-sm-10 col-xs-10 col-md-10 col-lg-10">
                <Select style={{display:'inline'}}
                  onChange={this.dropDownChanged}
                  options={options}
                />
              </div>
              <div className="col-sm-2 col-xs-2 col-md-2 col-lg-2">
                <button id="confirm" style={{float:'right'}} onClick={this.buttonClickOK} defaultValue='' className="btn btn-primary "><span className="fa fa-plus"></span> </button>
                  </div>
                
            </div>
            
          </div>
          <div className="well" style={{borderRadius: 0,background: '#fefefe', minHeight: '250px'}}>
            <ListItems items={this.state.items} closeHandler={this.closeHandler}/>
          </div>
        </div>
      )
    }
  }

  export default XorTool;