import React, { Component } from "react";
import { connect } from 'react-redux';
import CSVReader from "react-csv-reader";
import { setFileData, setFileName } from '../../background/actions';
import "../styles/input-file.css";

class InputFile extends Component {
    constructor(props) {
        super(props)
    }

    handleLoadedResult(loaded_data, file_name) {
        console.log("name :", file_name);
        console.log("data : ", loaded_data);
        this.props.csv(loaded_data);
        this.props.fileName(file_name);
    };

    handleError() {
        alert("file load error!!");
    }

    render() {
        console.log('order file', this.props)
        return (
            <div className="form-file">
                <CSVReader
                    cssClass="form-file-input"
                    onFileLoaded={(d,n)=>{this.handleLoadedResult(d,n)}}
                    onError={()=>{this.handleError()}}
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
    csv: data => dispatch(setFileData(data)),
    fileName: name => dispatch(setFileName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputFile);
