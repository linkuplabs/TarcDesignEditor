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
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import CanvasSizer from './CanvasSizer'
import {RemoveCircleOutline,AddCircleOutline, Undo, Redo, Download, Illustrations} from "../../svgicons/SvgIcons";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { MenuItem2, MenuItem2Props } from "@blueprintjs/popover2";
import {  Menu, MenuDivider} from "@blueprintjs/core";
import {  MenuItem as MenuItem3} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";

import PermMediaIcon from '@mui/icons-material/PermMedia';
import Tooltip from '@mui/material/Tooltip';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LayersIcon from '@mui/icons-material/Layers';

// import { Example } from "@blueprintjs/docs-theme";

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
  const theme = useTheme();
  const [saver, setSaver] = React.useState("");
  const [ disableUndo, setDisableUndo ] =  React.useState(true);
  const [ disableRedo, setDisableRedo ] =  React.useState(true);
  const [openSizer, setOpenSizer] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const handleSizerButton = (event) => {
    console.log("toggle dialog")
    setOpenSizer(!openSizer);
    setToolbarCommands([...toolbarCommands,{command:"resizeCanvas", params:{width:1200, height:1200}}])
  };

  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);
    setOpenSizer(!openSizer);
  };
  const exampleMenu = (
  <Menu>
  <MenuItem3 icon="graph" text="Graph" />
  <MenuItem3 icon="map" text="Map" />
  <MenuItem3 icon="th" text="Table" shouldDismissPopover={false} />
  <MenuItem3 icon="zoom-to-fit" text="Nucleus" disabled={true} />
  <MenuDivider />
  <MenuItem3 icon="cog" text="Settings...">
      <MenuItem3 icon="add" text="Add new application" disabled={true} />
      <MenuItem3 icon="remove" text="Remove application" />
  </MenuItem3>
</Menu>
);

  

  return (
     <div>

       <Stack direction="row" spacing={8}  justifyContent="center" alignItems="center" >
        <StyledToggleButtonGroup
          size="string"
          value={saver}
          exclusive
          onChange={handleSave}
          aria-label="text alignment"
        >
        <Tooltip title="Export to SVG" key={"tosvg"}>
        <ToggleButton value="toSVG" aria-label="toSVG">
          <WebAssetIcon />
        </ToggleButton>
        </Tooltip>

        <Tooltip title="Export to PNG" key={"topng"}>
        <ToggleButton value="toPNG" aria-label="toPNG">
        <PermMediaIcon   />
        </ToggleButton>
        </Tooltip>

        <Tooltip title="export JSON" key={"tojson"}> 
        <ToggleButton value="toJSON" aria-label="toJSON">
          <SaveAltIcon   />
        </ToggleButton>
        </Tooltip>
        </StyledToggleButtonGroup>

        <Tooltip title="Resize canvas" key={"resize"}>
        {/* <ToggleButton > */}
        <PhotoSizeSelectSmallIcon  onClick={handleClick}  />
        {/* </ToggleButton> */}
        </Tooltip>

        <Tooltip title="Zoom" key={"topng"}>
        <Box sx={{ width: 220 }}>


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
      </Tooltip>

      <Tooltip title="layers" key={"layers"}>
        {/* <ToggleButton > */}
        <LayersIcon  onClick={handleClick}  />
        {/* </ToggleButton> */}
        </Tooltip>


<StyledToggleButtonGroup
          size="string"
          exclusive
          onChange={handleUndoRedo}
          aria-label="text alignment"
        >
          <Tooltip title="undo" key={"undo"}>
        <ToggleButton value="undo" aria-label="undo" disabled={disableUndo}>
          <UndoIcon   />
        </ToggleButton>
        </Tooltip>

        <Tooltip title="redo" key={"redo"}>
        <ToggleButton value="redo" aria-label="redo" disabled={disableRedo}>
          <RedoIcon   />
        </ToggleButton>
        </Tooltip>
        </StyledToggleButtonGroup>



      {/* <CanvasSizer open={openSizer} handleClose={handleSizerButton}/> */}

      <Popover
        id={"screenSizes"}
        open={openSizer}
        anchorEl={anchorEl}
        onClose={handleClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <CanvasSizer open={openSizer} handleClose={handleSizerButton}/>
      </Popover>
      </Stack>
     </div> 
  );
}




