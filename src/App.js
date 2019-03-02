import React from 'react';
import { Component } from 'react';


import './App.css';
import ConverterTool from './components/ConverterTool';
import Output from './components/output';
import XorTool from './components/xortool';
import DecryptTool from './components/DecryptTool';

import './SourceCodePro.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import './styles.css';


//import './fontawesome-free-5.7.2-web/css/all.min.css';

Output.defaultProps = {styleProp: {}};
 
class App extends Component {
 
  constructor(props){
    super(props);
  }

  render() {
 

    return (
      <div style={{height: '100%'}} className="container-fluid" align="center">


          <div className="box" align="left">
              <h2 className="lw text-center">decrypt utility</h2>
              
                <div style={{width:'48%', float:'left'}}>
                  <div className="well">
                  <DecryptTool/>
                  </div>
                </div>
                <div style={{width:'48%', float:'right'}}>

                  <div className="well" >
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
