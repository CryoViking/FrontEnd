import React, { Component } from 'react';
import '../App.css';
import '../Bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Generate from './Generate';
import Analyzer from './Analyzer';

export default class MainMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="container p-4 py-5" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', border: '1px solid #000' }}>
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
                                        <Link className="btn btn-primary bg-dark text-white border-0" to='/Generate'>GENERATE</Link>
                                    <p className="mt-4">Description Here</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6" style={{ minHeight: '500px' }}>
                            <div className="h-100 w-100" style={{ border: '1px solid #000' }}>
                                <div className="position-absolute text-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
                                    <h3 className="mb-4">Title Here</h3>
                                    <Link className="btn btn-primary bg-dark text-white border-0" to='/Analyzer'>ANALYSE</Link>
                                    <p className="mt-4">Description Here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route path="/Generate" component={Generate} />
                    <Route path="/Analyzer" component={Analyzer} />
                </Switch>
            </Router>
        );
    }
}