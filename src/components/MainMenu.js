import React, { Component } from 'react';
import '../Bootstrap.css';
import '../App.css';
import { BrowserRouter as HashRouter, Switch, Route, NavLink } from 'react-router-dom';
import Generate from './Generate';
import Analyzer from './Analyzer';
import Graph from './Graph';

export default class MainMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <Graph />
                <div id="mainmenu" className="container p-0" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', border: '1px solid #000' }}>
                    <div style={{ position: 'absolute', fontSize: '28px' }}>
                        <NavLink to='/'><i className="fas fa-home" style={{ color: '#000' }}></i></NavLink>
                    </div>
                    <Switch>
                            <Route exact path="/" render={() => (
                        <div className="p-4 py-5">
                                    <div className="row mb-5">
                                        <div className="col-sm-4">
                                            <h3>LOGO</h3>
                                        </div>
                                        <div className="col-sm-8 text-right">
                                            <h3>Settings <span><i className="fa fa-cogs" /></span></h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6" style={{ minHeight: '500px' }}>
                                            <div className="h-100 w-100" style={{ border: '1px solid #000' }}>
                                                <div className="position-absolute text-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
                                                    <h3 className="mb-4">SIGNAL GENERATION</h3>
                                                    <NavLink className="btn btn-primary bg-dark text-white border-0" to='/Generate'>GENERATE</NavLink>
                                                    <p className="mt-4">Description Here</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6" style={{ minHeight: '500px' }}>
                                            <div className="h-100 w-100" style={{ border: '1px solid #000' }}>
                                                <div className="position-absolute text-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
                                                    <h3 className="mb-4">Title Here</h3>
                                                    <NavLink className="btn btn-primary bg-dark text-white border-0" to='/Analyzer'>ANALYSE</NavLink>
                                                    <p className="mt-4">Description Here</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )} />
                        <Route path="/Generate" component={Generate} />
                        <Route path="/Analyzer" component={Analyzer} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}