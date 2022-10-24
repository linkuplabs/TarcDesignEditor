import React, { useEffect, useState , useContext} from "react";
import PicsUploader from '../pics/PicsUploader';

import PerfectScrollbar from "react-perfect-scrollbar";
import classNames from "classnames";
import { v4 as uuid } from "uuid";

import ImagesGallery from "../gallery/ImagesGallery";
import PanelHeader  from "./PanelHeader";
// import useStyles  from "./AppToolbarImagesPanel";
import { makeStyles,   MenuItem,} from "@material-ui/core";
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

const colors = ["red", "yellow", "grey", "green", "purple", "cyan"];

export const fonts = [
  {
    name: "Arial",
    value: "Arial, sans-serif",
  },
  {
    name: "Architects Daughter",
    value: '"Architects Daughter", cursive',
  },
  {
    name: "Caesar Dressing",
    value: '"Caesar Dressing", cursive',
  },
  {
    name: "Calligraffitti",
    value: "Calligraffitti, cursive",
  },
  {
    name: "Coming Soon",
    value: '"Coming Soon", cursive',
  },
  {
    name: "Geo",
    value: "Geo, sans-serif",
  },
  {
    name: "Geostar Fill",
    value: '"Geostar Fill", cursive',
  },
  {
    name: "Lobster",
    value: "Lobster, cursive",
  },
  {
    name: "Metal Mania",
    value: '"Metal Mania", cursive',
  },
  {
    name: "Miniver",
    value: "Miniver, cursive",
  },
  {
    name: "Open Sans",
    value: '"Open Sans", sans-serif',
  },
  {
    name: "Permanent Marker",
    value: '"Permanent Marker", cursive',
  },
  {
    name: "Roboto",
    value: "Roboto, sans-serif",
  },
];



export const TextPanel = ({ cellWidth, cellHeight, open,images, height, onClick }) => {
  const classes = useStyles();
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [font, setFont] =  React.useState(fonts[1]);

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
    selectedFont,
    setSelectedFont
  } = useContext(DesignEditorContext);

  const handleMenuItemClick = (event,index,) => {
    setSelectedIndex(index);
    setFont(fonts[index])
    setSelectedFont(fonts[index]);
    if(onClick)onClick(fonts, index)
  };

  console.log("selected font", selectedFont);

  return (
    <div>


    <PerfectScrollbar
      className={classNames(
        classes.pinContainer,
        open ? classes.pinContainerOpen : classes.pinContainerClose
      )}
      style={{height:height? height:500,'borderRadius': '0px 0px 0px 0px','backgroundColor': '#fff','boxShadow': '0px 5px 7px -7px rgba(0, 0, 0, 0.75)'}}
    >

{fonts.map((item, index) => (
            <MenuItem
              key={uuid()}
              value={item.value}
              style={{ fontFamily: item.value }}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {item.name}
             
            </MenuItem>
          ))}

    </PerfectScrollbar>
    </div>
  );
};



export default TextPanel;