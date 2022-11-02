import React, { createRef , useContext, useState, useCallback, useEffect} from 'react';
import { DesignEditorContext } from '../../contexts/DesignEditorContext';


import Dropzone from 'react-dropzone';

const dragndrop =  process.env.PUBLIC_URL + '/drag-n-drop.png';
const dropzoneRef = createRef();


const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point 
  if (dropzoneRef.current) {
    dropzoneRef.current.open()
  }
};

function PicsUploader(props) {
  const [images, setImages] = useState([]);
  const {
    cloudModelImages,
    setCloudModelImages,
    uploadedImages,
    setUploadedImages
  } = useContext(DesignEditorContext);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => images.forEach(file => URL.revokeObjectURL(file.src));
  }, []);

  const onDrop =(acceptedFiles) => {
    // xprops.setModelSaveStatus("uploading")
    // let userId = props.auth.uid;
    console.log("onDrop.props",props)
    
    // Loop through accepted files
    let files = acceptedFiles.map(file => {
      // Initialize FileReader browser 
      
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
  
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = function(e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
        setImages(prevState => [
          ...prevState,
          { id: file.path, src: e.target.result }
        ]);
        setUploadedImages((prevValue) => [...prevValue, { id: file.path, src: URL.createObjectURL(file), content:URL.createObjectURL(file) }]);
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
    
    return file;
    });
  }


// Disable click and keydown behavior on the <Dropzone>
return (
<Dropzone ref={dropzoneRef} noClick noKeyboard onDrop={onDrop}   accept = { 'image/jpeg, image/png'}>
  {({getRootProps, getInputProps, acceptedFiles}) => {
    // if(acceptedFiles.length) onDrop(acceptedFiles);
    console.log("acceptedFiles",acceptedFiles)
    return (
      <div className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <img
            // ref={uploadedImage}
            src={dragndrop}
            alt={dragndrop}
            onClick={openDialog}
            style={{
              width: "100%",
              height: "100%",
              
            }}
          />
        </div>
      </div>
    );
  }}
</Dropzone>
 )
}
export default PicsUploader;