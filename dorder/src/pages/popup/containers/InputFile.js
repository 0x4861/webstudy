import React, { Component } from "react";
import { connect } from 'react-redux';
import CSVReader from "react-csv-reader";
import { setFileData, setFileName } from '../../background/actions';
import "../styles/input-file.css";

import Perf from 'react-addons-perf';
window.Perf = Perf;

class InputFile extends Component {
    constructor(props) {
        super(props)

        this.handleLoadedResult = this.handleLoadedResult.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleLoadedResult(loaded_data, file_name) {
        console.log("name :", file_name);
        console.log("data : ", loaded_data);
        this.props.setCsv(loaded_data);
        this.props.setName(file_name);
    };

    handleError() {
        alert("file load error!!");
    }

    render() {
        console.log('file', this.props)
        return (
            <div className="form-file">
                <CSVReader
                    cssClass="form-file-input"
                    onFileLoaded={this.handleLoadedResult}
                    onError={this.handleError}
                    inputId="csv-reader"
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    file: state.file
});

const mapDispatchToProps = (dispatch) => ({
    setCsv: data => dispatch(setFileData(data)),
    setName: name => dispatch(setFileName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputFile);
