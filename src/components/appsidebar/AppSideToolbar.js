import React,{ useState , useContext} from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';

import { styled } from "@mui/material/styles";
import { Block } from "baseui/block"

import FilterBAndWIcon from '@mui/icons-material/FilterBAndW';

import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import WallpaperIcon from '@mui/icons-material/Wallpaper';


import MoodIcon from '@mui/icons-material/Mood';
import AllOutIcon from '@material-ui/icons/AllOut';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SettingsIcon from '@material-ui/icons/Settings';
import {DesignEditorContext } from '../../contexts/DesignEditorContext';

export const BASE_BUTTONS  = [
  {
    id: "templates",
    name: "Templates",
    icon:  <FilterBAndWIcon />,
  },
  {
    id: "text",
    name: "Add text element",
    icon: <TextFieldsIcon/>,
  },
  {
    id: "images",
    name: "Images",
    icon:  <AddPhotoAlternateIcon />,
  },
  {
    id: "stickers",
    name: "Stickers",
    icon:  <MoodIcon />,
  },
  {
    id: "shapes",
    name: "Shapes",
    icon:  <AllOutIcon />,
  },
  {
    id: "background",
    name: "Set Background",
    icon:  <WallpaperIcon />,
  },
  {
    id: "uploads",
    name: "Uploads",
    icon:  <CloudUploadIcon />,
  },
  {
    id: "settings",
    name: "Settings",
    icon:  <SettingsIcon />,
  }
]



const StyledToggleButton = styled(ToggleButton)(({ selectedColor }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: selectedColor
  }
}));

export const AppSideToolbar = (props) => {
  const [activeButton, setActiveButton] = React.useState("templates");


  const {
    selectedSidebarMenuItem,
    setSelectedSidebarMenuItem,
    toolbarCommands, 
    setToolbarCommands,
    panelSearchInputText,
    setPanelSearchInputText,
  } = useContext(DesignEditorContext);


  const handleChange = (e, nextView) => {
    setActiveButton(nextView)
    console.log("handleChange",nextView);
    setSelectedSidebarMenuItem(nextView);
    setActiveButton(nextView)
    props.onChange(e,nextView)
  };

  console.log( "selectedSidebarMenuItem", selectedSidebarMenuItem);
  console.log( "activeButton", activeButton);
 
  return (
    <div >
    <ToggleButtonGroup
      orientation="vertical"
      value={activeButton}
      exclusive
      onChange={handleChange}
    >
     {props.buttons.map((panelListItem) => (
      <Tooltip title={panelListItem.name} key={panelListItem.id}>
      <StyledToggleButton value={panelListItem.id} aria-label={panelListItem.id} selected={panelListItem.id === activeButton} selectedColor="#00abc0" >
       {panelListItem.icon}
      </StyledToggleButton>
      </Tooltip>
        ))}
    </ToggleButtonGroup>
    </div>
  )
}
