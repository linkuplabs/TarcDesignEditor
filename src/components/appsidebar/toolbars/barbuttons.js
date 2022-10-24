import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';

import LaptopIcon from '@mui/icons-material/Laptop';
import TvIcon from '@mui/icons-material/Tv';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import DownloadIcon from '@mui/icons-material/Download';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



export const BAR_RIGHT_BUTTONS  = [
  {
    id: "delete",
    name: "Delete Section",
    icon:  <ArrowDropDownIcon />,
  }
];



export const TEXT_LEFT_BUTTONS  = [
  {
    id: "formatLeft",
    name: "left",
    icon:  <FormatAlignLeftIcon />,
  },
  {
    id: "formatCenter",
    name: "center",
    icon: <FormatAlignCenterIcon/>,
  },
  {
    id: "formatRight",
    name: "right",
    icon:  <FormatAlignRightIcon />,
  },
  {
    id: "justify",
    name: "justify",
    icon:  <FormatAlignJustifyIcon />,
  }
];

export const TEXT_CENTER_BUTTONS  = [
  {
    id: "bold",
    name: "bold",
    icon:  <FormatBoldIcon />,
  },
  {
    id: "italics",
    name: "italics",
    icon: <FormatItalicIcon/>,
  },
  {
    id: "underline",
    name: "underline",
    icon:  <FormatUnderlinedIcon />,
  },
  {
    id: "color",
    name: "color",
    icon:  <ArrowDropDownIcon />,
  }
];

export const TopbarButtonMap = {
  "shapes": {left:[], center:[], right:BAR_RIGHT_BUTTONS },
  "image": {left:[], center:[], right:BAR_RIGHT_BUTTONS },
  "circle": {left:[], center:[], right:BAR_RIGHT_BUTTONS },
  "square": {left:[], center:[], right:BAR_RIGHT_BUTTONS },
  "lines": {left:[], center:[], right:BAR_RIGHT_BUTTONS },
  "text": {left:TEXT_LEFT_BUTTONS, center:TEXT_LEFT_BUTTONS, right:BAR_RIGHT_BUTTONS }
}





