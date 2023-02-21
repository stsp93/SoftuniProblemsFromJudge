import logo from './logo.svg';
import React from 'react';


const Header = (props) => {



    return (
        <header className="App-header">
            {props.list.map(v => (<li>{v}</li>))}
        </header>
    )

}

export default Header;