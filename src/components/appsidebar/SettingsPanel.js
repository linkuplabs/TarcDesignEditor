import React, { useEffect, useState , useContext} from "react";
import PicsUploader from '../pics/PicsUploader';

import PerfectScrollbar from "react-perfect-scrollbar";
import classNames from "classnames";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

// import useStyles  from "./AppToolbarImagesPanel";
import { makeStyles} from "@material-ui/core";
import {DesignEditorContext } from '../../contexts/DesignEditorContext';

import PanelHeader  from "./PanelHeader";


export function SwitchesGroup() {
  const [state, setState] = React.useState({
    darkMode: false,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="settings">Settings</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={state.gilad} onChange={handleChange} name="darkMode" />}
          label="Dark Mode"
        />
        {/* <FormControlLabel
          control={<Switch checked={state.jason} onChange={handleChange} name="jason" />}
          label="Jason Killian"
        />
        <FormControlLabel
          control={<Switch checked={state.antoine} onChange={handleChange} name="antoine" />}
          label="Antoine Llorca"
        /> */}
      </FormGroup>
      {/* <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
}


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



export const SettingsPanel = ({ cellWidth, cellHeight, open,images, height, onClick }) => {
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



  React.useEffect(() => {

  }, [uploadedImages])


  let allImages = imageUrls.concat(cloudModelImages);
  let panelHeader = open ?  <PanelHeader className= {classes.pinContainerOpen } showTabs = {false} showSearch={false} /> : <></>


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
    <SwitchesGroup />
    </PerfectScrollbar>
    </div>
  );
};



export default SettingsPanel;