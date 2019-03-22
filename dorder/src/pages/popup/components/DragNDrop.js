
/*
import React from "react";
import Dropzone from 'react-dropzone';
import styles from '../styles/input-file.css';

const DragNDrop = ({ onDrop }) => (
    <Dropzone
        className={styles.dragNdrop}
        multiple={false}
        accept=".csv"
        onDrop={onDrop}>
        <div>이곳에 .csv파일을 올려주시거나,<br/> 파일선택을 위해 여기를 클릭해주세요.</div>
    </Dropzone> 
);

export default DragNDrop;

*/

import React from 'react';
import {useDropzone} from 'react-dropzone';

function Basic(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

<Basic />