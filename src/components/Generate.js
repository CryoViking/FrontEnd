import React, { Component } from 'react';
import '../Bootstrap.css';
import '../App.css';
const {dialog} = window.require('electron').remote;
const spawnSync = window.require( 'child_process' ).spawnSync;
const { getCurrentWindow, BrowserWindow, app } = window.require('electron').remote;

export default class Generate extends Component {
    constructor(props) {
        super(props);
    }

    selectInputFileDir = () => {
        var path = dialog.showOpenDialog(
            getCurrentWindow(),
            {
                title: "Select were to save delay file..",
                properties: ['openDirectory'],
                modal: true
            } 
        );
        path.then(files => {
            var basepath = app.getAppPath();

            if (files.filePaths !== undefined)  {
                console.log(files.filePaths[0]);
                spawnSync('/delay_generator/delay_generator', ['-o', `${files.filePaths[0]}/delay.csv`, '-r']);
            }
        })
    }

    selectDelayFile = () => {
        
        var path = dialog.showOpenDialog(
            getCurrentWindow(),
            {
                title: "Select delay file..",
                properties: ['openFile'],
                modal: true,
                message: "Select delay file.."
            }
        );

        path.then(files => {
            console.log(files.filePaths[0]);
            
        })
    }


    selectSubfileDir = () => {
        var path = dialog.showOpenDialog(
            getCurrentWindow(),
            {
                title: "Select were to save subfile...",
                properties: ['openDirectory'],
                modal: true
            }
        );

        path.then(files => {
            console.log(files.filePaths[0]);
        })
    }

    render() {
        return (
            <div>
                <div class="header px-4 py-4">
                    <div>
                        <div className="row">
                            <div className="text-center col-sm-12">
                                <h2><strong>Signal Generation</strong></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="generate" className="container p-4 py-4">
                    <div className="row">
                        <div className="col-sm-9" style={{ minHeight: '180px' }}>
                            <div id="signal-type" className="h-100 w-100 p-3" style={{ border: '4px solid #fff' }}>
                                <div className="position-relative text-left">
                                    <h4 className="mb-3">Signal Type</h4>
                                    <div className="row no-gutters">
                                        <div className="col-sm-6">
                                            <form className="signals">
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="radio1">
                                                        <input type="radio" className="form-check-input" id="radio1" name="optradio" defaultValue="whiteNoise" defaultChecked />Random Gaussian White Noise Signal
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="radio2">
                                                        <input type="radio" className="form-check-input" id="radio2" name="optradio" defaultValue="impulse" />Impulse Signal
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="radio3">
                                                        <input type="radio" className="form-check-input" id="radio3" name="optradio" defaultValue="sinusoidal" />Sinusoidal Wave
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-sm-6 p-2 h-100 position-relative" style={{ border: '3px solid #000' }}>
                                            <form className="whiteNoise">
                                                <div className="form-group parameters">
                                                    <label htmlFor="magnitude">Noise Magnitude:</label>
                                                    <input type="number" className="form-control" id="magnitude" />
                                                </div>
                                            </form>
                                            <form className="impulse d-none">
                                                <div className="form-group parameters">
                                                    <label htmlFor="duration">Wave Duration:</label>
                                                    <input type="number" className="form-control" id="duration" />
                                                </div>
                                                <div className="form-group parameters">
                                                    <label htmlFor="amplification">Wave Amplification:</label>
                                                    <input type="number" className="form-control" id="amplification" />
                                                </div>
                                                <div className="form-group parameters">
                                                    <label htmlFor="baseline">Wave Baseline:</label>
                                                    <input type="number" className="form-control" id="baseline" />
                                                </div>
                                            </form>
                                            <form className="sinusoidal d-none">
                                                <div className="form-group parameters">
                                                    <label htmlFor="amplification">Wave Amplification (Sine):</label>
                                                    <input type="number" className="form-control" id="amplification" />
                                                </div>
                                                <div className="form-group parameters">
                                                    <label htmlFor="phase">Wave Phase (Sine):</label>
                                                    <input type="number" className="form-control" id="phase" />
                                                </div>
                                                <div className="form-group parameters">
                                                    <label htmlFor="frequency">Wave Frequency (Sine):</label>
                                                    <input type="number" className="form-control" id="frequency" />
                                                </div>
                                                <div className="form-group parameters">
                                                    <label htmlFor="baseline">Wave Baseline:</label>
                                                    <input type="number" className="form-control" id="baseline" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div id="delay-input" className="px-2 py-3 w-100" style={{ border: '4px solid #fff' }}>
                                <div className="col-sm-12 position-relative p-2">
                                    <div className="position-relative" style={{ whiteSpace: 'nowrap' }}>
                                        <a className="btn btn-primary bg-dark text-white border-0 w-100" href="#">3D - Location Variables</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 position-relative p-2">
                                    <div className="position-relative" style={{ whiteSpace: 'nowrap' }}>
                                        <a className="btn btn-primary bg-dark text-white border-0 w-100" href="#" onClick={this.selectDelayFile}>Delay Input File</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 position-relative p-2">
                                    <div className="position-relative" style={{ whiteSpace: 'nowrap' }}>
                                        <a className="btn btn-primary bg-dark text-white border-0 w-100" href="#" onClick={this.selectInputFileDir}>Generate Delay</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-sm-12" style={{ minHeight: '150px' }}>
                            <div id="sub-file" className="h-100 w-100 p-3" style={{ border: '4px solid #fff' }}>
                                <div className="position-relative text-left">
                                    <h4 className="mb-3">Sub File Parameters</h4>
                                    <form className="sub-parameters">
                                        <div className="form-group parameters">
                                            <label className="mt-1" htmlFor="ratio">Signal / Noise Ratio:</label>
                                            <div className="d-flex">
                                                <input type="number" className="form-control" id="ratio" />
                                            </div>
                                        </div>
                                        <div className="form-group parameters">
                                            <label className="mt-1" htmlFor="dataBlock">Time Samples Per Block:</label>
                                            <input type="number" className="form-control" id="dataBlock" />
                                        </div>
                                        <div className="form-group parameters">
                                            <label className="mt-1" htmlFor="dataBlock">Number of Blocks Per Sub File:</label>
                                            <input type="number" className="form-control" id="dataBlock" />
                                        </div>
                                        <div className="form-group parameters">
                                            <label className="mt-1" htmlFor="dataBlock">Number of Signal Paths:</label>
                                            <input type="number" className="form-control" id="dataBlock" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                    </div>
                    <div className="row mt-4">
                        <div className="col-sm-12">
                            <div className="float-right" style={{ whiteSpace: 'nowrap' }}>
                                <a className="btn btn-primary border-0" href="#" onClick={this.selectSubfileDir}>GENERATE</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}