import '../SourceCodePro.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import  { PropTypes } from 'react';


import React, { Component } from 'react';


class ListItem extends Component {

    constructor(props){
        super(props);
    }
    
  render() {
      return(
        (<div>
            <div id="output" style={{borderRadius:0}} >{this.props.item.output}
              <span style={{float : 'right', fontSize: '1.5em', cursor: 'pointer'}} onClick={this.props.closeHandler.bind(null, this.props.item.id)}>{String.fromCharCode(215)}</span>
            </div>
          </div>)
      )
    
  }
}

export default ListItem;