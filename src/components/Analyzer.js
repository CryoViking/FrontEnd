import React, { Component } from 'react';
import '../App.css';
import '../Bootstrap.css';

export default class Generate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div class="px-4 pb-4 pt-5">
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
        );
    }
}