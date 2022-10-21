import React, { useEffect, useState } from "react";
import {makeStyles} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import classNames from "classnames";


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

  // React.useEffect(() => {
  //   fetch("https://picsum.photos/v2/list?page=2&limit=20")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const images = data.map((d) => ({
  //         url: d.download_url
  //       }));
  //       setImages(images);
  //     });
  // }, []);

  // useEffect(() => {
  //   firebasedb.collection('posts')
  //   .onSnapshot(snapshot => {
  //     let images = snapshot.docs.sort((a, b) => a.data.time > b.data.time ? 1 : -1).map(doc => ( doc.data().imageUrl))
  //     setImages(images)
  //   })
  // }, [])
  let panelHeader = open ?  <PanelHeader className= {classes.pinContainerOpen } searchPlaceholder={searchPlaceholder} /> : <></>

  return (
    <div>
    
    {panelHeader}
    <PerfectScrollbar
      className={classNames(
        classes.pinContainer,
        open ? classes.pinContainerOpen : classes.pinContainerClose
      )}
      style={{height:height? height:500,'border-radius': '0px 0px 0px 0px','background-color': '#fff','box-shadow': '0px 5px 7px -7px rgba(0, 0, 0, 0.75)'}}
    >

    <ImagesGallery cellWidth ={cellWidth} cellHeight={cellHeight} images={images} onClick={onClick}/> 
    </PerfectScrollbar>
    </div>
  );
};



export default AppToolbarImagesPanel;
