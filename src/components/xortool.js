
import React from 'react';
import { Component } from 'react';
import '../SourceCodePro.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import '../styles.css';
import  { PropTypes } from 'react';
import Output from './output';
import ListItems from './ListItems';
import Convert from '../Convert';



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
        selectedOption : null,
        items:[]
      }
    }
  
    dropDownChanged(event){
      this.setState({selectedOption: event});
      console.log(event);
    }

    closeHandler(id){
      this.setState((prevState, props)=>({
        items: prevState.items.filter((currentVal)=> currentVal.id !== id)
      })
      )
    }

    buttonClickOK(){
      this.setState((prevState, props) =>{
        let newItem = {
          id: prevState.items.length,
          output: prevState.input,
          binaryValue: Convert.convertByType(prevState.input, prevState.selectedOption.value, 'bin' )
        };

        let binaryArray = [newItem.binaryValue];

        for (let i in prevState.items)
          binaryArray.push(prevState.items[i].binaryValue);

        return{
          input: '',
          items: [...prevState.items, newItem],
          output: Convert.convertByType(Convert.batchXor(binaryArray), 'bin', prevState.selectedOption.value)
        }
      })
    }

    inputKeyDown(e){
      this.setState({input: e.target.value});
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
          
          <div className="well subWell" style={{borderRadius: '20px 20px 0px 0px', marginBottom: '0px'}}>
            <p style={{marginBottom:'.75em',fontSize: '.75em'}}>xor</p>
            <div className="row">
              <div className="col-sm-12 col-xs-12 col-md-12 col-lg-12" style={{marginBottom:'5px'}}>
                <Output outputValue={this.state.output}/>
              </div>
            </div>
            <p style={{marginBottom:'.75em',fontSize: '.75em'}}>input</p>
            <input type="text" id="input" value={this.state.input} className="form-control" onChange={this.inputKeyDown} onKeyDown={this.inputKeyDown} value={this.state.input}/>
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