import React, { Component } from 'react';
import '../App.css';
import '../Bootstrap.css';

export default class Generate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="analyzeModal" tabIndex={-1} role="dialog" aria-labelledby="analyzeModalLabel" aria-hidden="true">
                    <div className="modal-dialog" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', border: '1px solid #000', maxWidth: 'unset!important' }} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Analyze Comparison</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">�</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-12" style={{ minHeight: '300px' }}>
                                        <div className="h-100 w-100 p-4" style={{ border: '1px solid #000' }}>
                                            <div className="d-flex justify-content-between mb-4">
                                                <div className="position-relative">
                                                    <p className="mb-1">Perfect Signal</p> <span style={{ width: '100px', position: 'absolute', height: '1px', backgroundColor: 'red', left: '150px', top: '25%' }} />
                                                    <p>Imperfect Signal</p> <span style={{ width: '100px', position: 'absolute', height: '1px', backgroundColor: 'blue', left: '150px', bottom: '35%' }} />
                                                </div>
                                                <div className="position-relative">
                                                    <button onclick="merge()" className="btn btn-primary bg-white text-dark border-dark mr-2" style={{ fontSize: '18px', fontWeight: 'bold', width: '120px' }}>Merge</button>
                                                    <button onclick="unmerge()" className="btn btn-primary bg-white text-dark border-dark ml-2" style={{ fontSize: '18px', fontWeight: 'bold', width: '120px' }}>Unmerge</button>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <img id="unmerge-img1" className="w-100 px-5" src="images/red-graph.jpg" />
                                                <img id="unmerge-img2" className="w-100 px-5" src="images/blue-graph.jpg" />
                                                <img id="merge-img" className="w-100 px-5 d-none" src="images/merge-graph.jpg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="h-100 w-100 p-4" style={{ border: '1px solid #000' }}>
                                            <div style={{ whiteSpace: 'nowrap' }}>
                                                <p>Perfect Signal
                                                </p>
                                            </div>
                                            <div>
                                                <div className="w-100 p-2" style={{ height: '150px', border: '1px solid #000' }}>
                                                    <p>Statistics</p></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="h-100 w-100 p-4" style={{ border: '1px solid #000' }}>
                                            <div style={{ whiteSpace: 'nowrap' }}>
                                                <p>Imperfect Signal
                                                </p>
                                            </div>
                                            <div>
                                                <div className="w-100 p-2" style={{ height: '150px', border: '1px solid #000' }}>
                                                    <p>Statistics</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container p-4 py-5 my-5" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', border: '1px solid #000' }}>
                    <div className="row mb-5">
                        <div className="col-sm-4">
                            <h3>Analyzer</h3>
                        </div>
                        <div className="col-sm-8 text-right" style={{ cursor: 'pointer' }}>
                            <h3>Settings <span><i className="fa fa-cogs" /></span></h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6" style={{ minHeight: '300px' }}>
                            <div className="h-100 w-100 p-4" style={{ border: '1px solid #000' }}>
                                <div className="text-center w-100 px-5 pt-4" style={{ whiteSpace: 'nowrap' }}>
                                    <a className="btn btn-primary bg-white text-dark border-dark w-100" style={{ fontSize: '18px', fontWeight: 'bold' }} href="#">Perfect Signal File</a>
                                    <p className="py-2">File Name: file required</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6" style={{ minHeight: '300px' }}>
                            <div className="h-100 w-100 p-4" style={{ border: '1px solid #000' }}>
                                <div className="text-center w-100 px-5 pt-4" style={{ whiteSpace: 'nowrap' }}>
                                    <a className="btn btn-primary bg-white text-dark border-dark w-100" style={{ fontSize: '18px', fontWeight: 'bold' }} href="#">Imperfect Signal File</a>
                                    <p className="py-2">File Name: file required</p>
                                </div>
                                <div className="mt-5">
                                    <p>S/N Ratio</p>
                                    <div className="w-100" style={{ height: '150px', border: '1px solid #000' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-sm-12">
                            <div className="float-right" style={{ whiteSpace: 'nowrap' }}>
                                <button type="button" className="btn btn-primary bg-dark text-white border-0" data-toggle="modal" data-target="#analyzeModal">
                                    ANALYZE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}