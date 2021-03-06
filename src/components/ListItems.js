
import React from 'react';

import '../SourceCodePro.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import  { PropTypes } from 'react';

import ListItem from './ListItem';


export default function ListItems(props) {
    let items = [];
    
    for(let i in props.items){
        items.push(<ListItem key={props.items[i].id.toString()} item={props.items[i]} closeHandler={props.closeHandler}/>  )
    }

    return items;

/*
    return(
        <div>
            {items}
        </div>
    )*/
}
