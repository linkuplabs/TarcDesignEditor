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
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Icon from "@material-ui/core/Icon";
import LayersIcon from '@mui/icons-material/Layers';

const pixab = process.env.PUBLIC_URL + '/pixabay.png';
const pixabay = "https://pixabay.com/static/img/logo_square.svg";


const PixaBayIcon =  <Icon>
    <img alt="edit" src= {pixab} style={{width: "100%"}}  />
  </Icon>


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
    id: "circle",
    name: "Circle",
    icon:  <PanoramaFishEyeIcon />,
  },
  {
    id: "square",
    name: "Square",
    icon:  <CropSquareIcon />,
  },
  {
    id: "line",
    name: "Line",
    icon:  <HorizontalRuleIcon />,
  },
  {
    id: "uploads",
    name: "Uploads",
    icon:  <CloudUploadIcon />,
  },
  // {
  //   id: "layers",
  //   name: "Layers",
  //   icon:  <LayersIcon />,
  // },
  {
    id: "settings",
    name: "Settings",
    icon:  <SettingsIcon />,
  }
]



const StyledToggleButton = styled(ToggleButton)(({ selectedcolor }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor:selectedcolor
  }
}));

export const AppSideToolbar = (props) => {
  const [activeButton, setActiveButton] = React.useState("templates");


  const {
    selectedSidebarMenuItem,
    setSelectedSidebarMenuItem,
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
        size="large"
      orientation="vertical"
      value={activeButton}
      exclusive
      onChange={handleChange}
    >
     {props.buttons.map((panelListItem) => (
      <Tooltip title={panelListItem.name} key={panelListItem.id}>
      <StyledToggleButton value={panelListItem.id} aria-label={panelListItem.id} selected={panelListItem.id === activeButton} selectedcolor="#00abc0" >
       {panelListItem.icon}
      </StyledToggleButton>
      </Tooltip>
        ))}
    </ToggleButtonGroup>
    </div>
  )
}
