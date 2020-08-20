import React from 'react';
import logo from './logo.svg';
import './Bootstrap.css';
import './App.css';
import MainMenu from './components/MainMenu';
import Generate from './components/Generate';
import AppBar from "./components/AppBar";

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AppBar/>
        )
    }
}
export default App;
