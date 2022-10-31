import React,{useContext} from "react";
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
import { DesignEditorContext } from '../../../contexts/DesignEditorContext';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import { Button, KIND, SIZE } from "baseui/button"
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import Box from '@mui/material/Box';


import {RemoveCircleOutline,AddCircleOutline, Undo, Redo, Download, Illustrations} from "../../svgicons/SvgIcons";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));



export const PrettoSlider = styled(Slider)({
  color: '#444',
  height: 1,
  marginTop: 20,
  '& .MuiSlider-track': {
    border: 'none',
  }
  // '& .MuiSlider-thumb': {
  //   height: 10,
  //   width: 10,
  //   backgroundColor: '#fff',
  //   border: '2px solid currentColor',
  //   '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
  //     boxShadow: 'inherit',
  //   },
  //   '&:before': {
  //     display: 'none',
  //   },
  // },
  // '& .MuiSlider-valueLabel': {
  //   lineHeight: 1.2,
  //   fontSize: 12,
  //   background: 'unset',
  //   padding: 0,
  //   width: 32,
  //   height: 32,
  //   borderRadius: '50% 50% 50% 0',
  //   backgroundColor: '#aaa',
  //   transformOrigin: 'bottom left',
  //   transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
  //   '&:before': { display: 'none' },
  //   '&.MuiSlider-valueLabelOpen': {
  //     transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
  //   },
  //   '& > *': {
  //     transform: 'rotate(45deg)',
  //   },
  // },
});


export default function Bottombar() {
  const [saver, setSaver] = React.useState("");
  const [ disableUndo, setDisableUndo ] =  React.useState(true);
  const [ disableRedo, setDisableRedo ] =  React.useState(true);

  const {
    toolbarCommands, 
    setToolbarCommands,
    selectedCanvasObject,
    zoomValue, 
    setZoomValue,
    zoomSliderChanged,
    setZoomSliderChanged,
    undoEnabled,
    redoEnabled,
  } = useContext(DesignEditorContext);

  React.useEffect(() => {
    setDisableRedo(redoEnabled)
    setDisableUndo(!undoEnabled)

  }, [undoEnabled,redoEnabled])

  const handleSave = ( event, saver ) => {
      setSaver(saver)
      if(saver ==="toSVG"){
        toSVG()
      }else if(saver ==="toJSON"){
        toJSON()
      }else if(saver ==="toPNG"){
        toPNG()
      }
  };

  const toSVG = () => {
    setToolbarCommands([...toolbarCommands,{command:"saveToSVG", params:{format:"SVG"}}])
  };
  const toJSON = () => {
    setToolbarCommands([...toolbarCommands,{command:"saveToJSON", params:{format:"JSON"}}])
  };
  const toPNG = () => {
    setToolbarCommands([...toolbarCommands,{command:"saveToPNG", params:{format:"PNG"}}])
  };


  const handleZoomChange = (type, value) => {
    setZoomValue(value)
    setZoomSliderChanged(value)
  }



  const handleUndoRedo = (type, value) => {
      setToolbarCommands([...toolbarCommands,{command:value, params:{}}])
      console.log("undoredo",value)
  }



  return (
    <div>

       <Stack direction="row" spacing={8}>
        <StyledToggleButtonGroup
          size="string"
          value={saver}
          exclusive
          onChange={handleSave}
          aria-label="text alignment"
        >
        <ToggleButton value="toSVG" aria-label="toSVG">
          <WebAssetIcon />
        </ToggleButton>
        <ToggleButton value="toPNG" aria-label="toPNG">
          <Illustrations   />
        </ToggleButton>
        <ToggleButton value="toJSON" aria-label="toJSON">
          <Download   />
        </ToggleButton>
        </StyledToggleButtonGroup>
        <Box sx={{ width: 300 }}>


        <PrettoSlider
        size="small"
        valueLabelDisplay="on"
        aria-label="pretto slider"
        defaultValue={20}
        value={zoomValue} 
        onChange={handleZoomChange}
        step={0.1}
        min={0.1}
        max={10}
      />
      </Box>


<StyledToggleButtonGroup
          size="string"
          exclusive
          onChange={handleUndoRedo}
          aria-label="text alignment"
        >
        <ToggleButton value="undo" aria-label="undo" disabled={disableUndo}>
          <Undo   />
        </ToggleButton>
        <ToggleButton value="redo" aria-label="redo" disabled={disableRedo}>
          <Redo   />
        </ToggleButton>
        </StyledToggleButtonGroup>
        </Stack>
    </div>
  );
}




