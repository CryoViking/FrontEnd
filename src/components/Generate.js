import React, { Component } from 'react';
import '../App.css';
import '../Bootstrap.css';

export default class Generate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-4 py-5 my-5" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', border: '1px solid #000' }}>
                <div className="row mb-5">
                    <div className="col-sm-4">
                        <h3>Signal Generation</h3>
                    </div>
                    <div className="col-sm-8 text-right" style={{ cursor: 'pointer' }}>
                        <h3>Settings <span><i className="fa fa-cogs" /></span></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8" style={{ minHeight: '300px' }}>
                        <div className="h-100 w-100 p-2" style={{ border: '1px solid #000' }}>
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
                                    <div className="col-sm-6 p-2 h-100 position-relative" style={{ border: '1px solid #000' }}>
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
                    <div className="col-sm-4" style={{ minHeight: '300px' }}>
                        <div className="h-100 w-100" style={{ border: '1px solid #000' }}>
                            <div className="col-sm-12 position-relative p-0" style={{ height: '50%', borderBottom: '1px solid #000' }}>
                                <div className="position-absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', whiteSpace: 'nowrap' }}>
                                    <a className="btn btn-primary bg-dark text-white border-0" href="#">3D - Location Variables</a>
                                </div>
                            </div>
                            <div className="col-sm-12 position-relative p-0" style={{ height: '50%' }}>
                                <div className="position-absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', whiteSpace: 'nowrap' }}>
                                    <a className="btn btn-primary bg-dark text-white border-0" href="#">Delay Input File</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12" style={{ minHeight: '250px' }}>
                        <div className="h-100 w-100 p-2" style={{ border: '1px solid #000' }}>
                            <div className="position-relative text-left">
                                <h4 className="mb-3">Sub File Parameters</h4>
                                <form className="sub-parameters" style={{ maxWidth: '400px' }}>
                                    <div className="form-group parameters">
                                        <label className="mt-1" htmlFor="ratio">Signal / Noise Ratio:</label>
                                        <div className="d-flex">
                                            <input type="number" className="form-control" id="ratio" />
                                            <span className="mx-2" style={{ fontSize: '22px' }}>|</span>
                                            <input type="number" className="form-control" id="ratio" />
                                        </div>
                                    </div>
                                    <div className="form-group parameters">
                                        <label className="mt-1" htmlFor="boundary">Delay Boundaries:</label>
                                        <input type="number" className="form-control" id="boundary" />
                                    </div>
                                    <div className="form-group parameters">
                                        <label className="mt-1" htmlFor="dataBlock">Data Block Size:</label>
                                        <input type="number" className="form-control" id="dataBlock" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12">
                        <div className="h-100 w-100 p-2" style={{ border: '1px solid #000' }}>
                            <div className="position-relative text-left">
                                <h4 className="mb-3">File Formats</h4>
                                <form className="file-format" style={{ maxWidth: '400px' }}>
                                    <div className="form-group parameters">
                                        <label className="mt-1" style={{ whiteSpace: 'nowrap' }} htmlFor="outputFormat">Output SubFile Format:</label>
                                        <select className="form-control" id="outputFormat">
                                            <option>Format A</option>
                                            <option>Format B</option>
                                            <option>Format C</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12">
                        <div className="float-right" style={{ whiteSpace: 'nowrap' }}>
                            <a className="btn btn-primary bg-dark text-white border-0" href="#">GENERATE</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}