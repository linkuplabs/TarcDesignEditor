import React, { useEffect, useState } from "react";
import {makeStyles} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import classNames from "classnames";


import './MessageSender.css';
import ImagesGallery from "../gallery/ImagesGallery";
import PanelHeader  from "./PanelHeader";

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
    width: 240,
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

export const AppToolbarImagesPanel = ({ cellWidth, cellHeight, open,images, height, onClick, searchPlaceholder }) => {
  const classes = useStyles();

  // const [images, setImages] = React.useState([]);

  const onClickPosts  = (list, index) =>{
    console.log("clicked post ", index)
  }


  let panelHeader =  <PanelHeader className= {classes.pinContainerOpen } showSearch={true} searchPlaceholder={searchPlaceholder} /> 

  return (
    <div>
    
    {panelHeader}
    
    <PerfectScrollbar
      className={classNames(
        classes.pinContainer,
        open ? classes.pinContainerOpen : classes.pinContainerClose
      )}
      style={{height:height? height:500,'borderRadius': '0px 0px 0px 0px','backgroundColor': '#fff','boxShadow': '0px 5px 7px -7px rgba(0, 0, 0, 0.75)'}}
    >

    <ImagesGallery cellWidth ={cellWidth} cell0Height={cellHeight} images={images} onClick={onClick}/> 
    </PerfectScrollbar>
    </div>
  );
};



export default AppToolbarImagesPanel;
