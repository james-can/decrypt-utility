import React, { Component } from 'react'
import Output from './output';

import Convert from '../Convert';

export class DecryptTool extends Component {

    constructor(props){
        super(props);
        this.state = {
            kInput: '',
            ctInput: '',
            output: ''
        };
        this.ctInputKeyDown = this.ctInputKeyDown.bind(this);
        this.kInputKeyDown = this.kInputKeyDown.bind(this);
    }

    ctInputKeyDown(e){
        const inputText = e.target.value;
        if(e.target !== null && /^[a-f0-9]+$/i.test(inputText) || inputText.length == 0){ // validating hex format
            this.setState((prevState,props) => {
                return {
                    ctInput: inputText,
                    output: prevState.kInput.length > 0 ? Convert.binToAscii(Convert.xor(Convert.hexToBin(prevState.kInput), Convert.hexToBin(prevState.ctInput) )) :''
                }   
            });
        }
    }

    kInputKeyDown(e){
        const inputText = e.target.value;
        if(e.target !== null && /^[a-f0-9]+$/i.test(inputText) || inputText.length == 0){ // validating hex format
            this.setState((prevState,props) => {
                return {
                    kInput: inputText,
                    output: prevState.ctInput.length > 0 ? Convert.binToAscii(Convert.xor(Convert.hexToBin(prevState.ctInput), Convert.hexToBin(prevState.kInput) )) :''
                }   
            });
        }
    }

    render() {
        return (
        <div className="well subWell">
            
                <p style={{marginBottom:'.75em',fontSize: '.75em'}}>key (hex)</p>
                <input type="text" id="input"  className="form-control" onChange={this.kInputKeyDown} value={this.state.kInput}/>
                <p style={{marginBottom:'.75em',fontSize: '.75em'}}>cypher text (hex)</p>
                <input type="text" id="input"  className="form-control" onChange={this.ctInputKeyDown} value={this.state.ctInput}/>
                <p style={{marginBottom:'.75em',fontSize: '.75em'}}>result (ascii)</p>
                <Output outputValue={this.state.output}/>
            
        </div>
        )
    }
}

export default DecryptTool
