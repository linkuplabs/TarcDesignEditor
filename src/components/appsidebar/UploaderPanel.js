import React, { useEffect, useState , useContext} from "react";
import PicsUploader from '../pics/PicsUploader';

import PerfectScrollbar from "react-perfect-scrollbar";
import classNames from "classnames";


import ImagesGallery from "../gallery/ImagesGallery";
import PanelHeader  from "./PanelHeader";
// import useStyles  from "./AppToolbarImagesPanel";
import { makeStyles} from "@material-ui/core";
import {DesignEditorContext } from '../../contexts/DesignEditorContext';



export const useStyles = makeStyles((theme) => ({
  pinContainer: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
    transition: "all 300ms ease-in-out",
    background: "rgb(32,31,35)",
    // boxShadow: "-5px 0px 35px rgb(0 0 0 / 31%)",
    zIndex: 1,
    overflowY: "auto",
    margin:2,
    marginLeft: 1,
  },
  pinContainerOpen: {
    width: 200,
    minWidth: 100,
    padding: 0,
    left: 0,
    opacity: 1,
    marginLeft: 20,
  },
  pinContainerClose: {
    width: 0,
    minWidth: 0,
    padding: 0,
    left: 0,
    opacity: 0,
  },

  list: {
    overflowY: "auto",
  },
  addBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
  heading: {
    fontWeight: 400,
    color: "black",
    fontSize: 25,
    marginBottom: 5,
    padding: 5,
    textAlign: 'right'
  },
}));



export const UploaderPanel = ({ cellWidth, cellHeight, open,images, height, onClick }) => {
  const classes = useStyles();
  const [imageUrls, setImageUrls] = useState([]);

  const {
    cloudModelImages,
    setCloudModelImages,
    uploadedImages,
    setUploadedImages,
    setSelectedSidebarMenuItem,
    toolbarCommands, 
    setToolbarCommands,
    panelSearchInputText,
    setPanelSearchInputText,
  } = useContext(DesignEditorContext);


  // React.useEffect(() => {
  //   console.log("uploadedImages",uploadedImages)
  //   const listItems = uploadedImages.map((filemap) => {
  //                     return {img:filemap.key, title:filemap.value.name,file:filemap.value}
  //                     });

  //   let urls = listItems.filter ( (model)  => 
  //               model.file.type.includes("image")
  //               )

  //   let imgs = urls.map ( (url)  => 
  //             url.img
  //             )
  //   setImageUrls(imgs)
  // }, [uploadedImages])

  // React.useEffect(() => {
  //   console.log("uploadedImages",uploadedImages)
  //   setImageUrls(uploadedImages)
  // }, [uploadedImages])


  // React.useEffect(() => {

  // }, [cloudModelImages])
  let allImages = uploadedImages.concat(cloudModelImages);

  return (
    <div>

    <PicsUploader className= {classes.pinContainerOpen } />

    <PerfectScrollbar
      className={classNames(
        classes.pinContainer,
        open ? classes.pinContainerOpen : classes.pinContainerClose
      )}
      style={{height:height? height:500,'border-radius': '0px 0px 0px 0px','background-color': '#fff','box-shadow': '0px 5px 7px -7px rgba(0, 0, 0, 0.75)'}}
    >

    <ImagesGallery cellWidth ={cellWidth} cellHeight={cellHeight} images={allImages} onClick={onClick}/> 
    </PerfectScrollbar>
    </div>
  );
};



export default UploaderPanel;