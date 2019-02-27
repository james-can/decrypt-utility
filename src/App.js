import React from 'react';
import { Component } from 'react';
import  { PropTypes } from 'react';

import './App.css';
import ConverterTool from './components/ConverterTool';
import Output from './components/output';
import XorTool from './components/xortool';


import './SourceCodePro.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Select from 'react-select';
import './styles.css';
import Convert from './Convert';
//import './fontawesome-free-5.7.2-web/css/all.min.css';

Output.defaultProps = {styleProp: {}};
 
class App extends Component {
 
  constructor(props){
    super(props);
    console.log('bintoasciitest: ' + Convert.binToAscii('011110010110111101110101'));
  }

  render() {
 

    return (
      <div style={{height: '100%'}} className="container-fluid" align="center">


          <div className="box" align="left">
              <h2 className="lw text-center">decrypt utility</h2>
              
                <div style={{width:'48%', float:'left'}}>
                  <div className="well">

                  </div>
                </div>
                <div style={{width:'48%', float:'right'}}>

                  <div className="well" style={{height:'500px'}}>
                  <XorTool/> 
                  </div>
                </div>
                
              
              <div className="well" style={{width:'48%', float:'left'}}>
                <ConverterTool/>
              </div>
          </div>
      </div>

    );
  }
}

export default App;
