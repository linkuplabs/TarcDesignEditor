import React, { useEffect, useState , useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { DesignEditorContext } from '../../contexts/DesignEditorContext';
import ColorPanelHeader from "./ColorPanelHeader";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function PanelHeader(props) {
  const classes = useStyles();
  const [searchText, setSearchText]=React.useState('');

  const [tabValue, setTabValue] = React.useState(1);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const {
    setSelectedSidebarMenuItem,
    toolbarCommands, 
    setToolbarCommands,
    panelSearchInputText,
    setPanelSearchInputText,
  } = useContext(DesignEditorContext);


  const handleSubmit = (e) => {
    e.preventDefault();
   
    // const timerId = setTimeout(() => {
    //   console.log('Will be called after 2 seconds');
    //   setSearchText('');
    // }, 5000);
  };

  let color = "#fff";
  let placeholder = (props.searchPlaceholder === undefined ) ? "🔍 enter search text" : props.searchPlaceholder

  const inputForm = props.showSearch ? (<div className="messageSender__top">
                    <form>
                      <input
                        value={panelSearchInputText}
                        onChange={(e) => setPanelSearchInputText(e.target.value)}
                        type="text"
                        placeholder= {placeholder }
                      />

                      <button onClick={handleSubmit} type="submit">
                        Hidden Button
                      </button>
                    </form>
                    </div>):<></>

  const tabBar = props.showTabs ? (<Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                    aria-label="disabled tabs example"
                    >
                    <Tab label="Active" />
                    <Tab label="Active" />
                  </Tabs>) : <></>

  const pixaby = props.showPixaby ?      ( <div   style={{  
    justifyContent: "space-evenly",
    display: "flex",
    alignSelf: "center",
    alignItems: "center", 
    backgroundColor: color}} >
    <a href="https://pixabay.com" target="_blank">
         pixabay
    </a>
  </div>)

  :
  <></>
  const colorBar = props.onColorChange ? <ColorPanelHeader onColorChange = {props.onColorChange}/> :<></>
  return (
    <div>

<     div   style={{  
        justifyContent: "space-evenly",
        display: "flex",
        alignSelf: "center",
        alignItems: "center", 
        backgroundColor: color}} >
          {colorBar}
      </div>

      <div   style={{  
        justifyContent: "space-evenly",
        display: "flex",
        alignSelf: "center",
        alignItems: "center", 
        backgroundColor: color}} >
          {tabBar}
      </div>

      <div   style={{  
        justifyContent: "space-evenly",
        display: "flex",
        alignSelf: "center",
        alignItems: "center", 
        backgroundColor: color}} >
          {inputForm}
          
      </div>
        {pixaby}
    </div>
  );
}