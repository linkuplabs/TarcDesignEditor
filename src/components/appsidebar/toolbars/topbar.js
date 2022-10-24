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
// import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import { v4 as uuid } from "uuid";
import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Popover,
  Popper,
  Select,
  TextField,
} from "@material-ui/core";

import LaptopIcon from '@mui/icons-material/Laptop';
import TvIcon from '@mui/icons-material/Tv';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import DownloadIcon from '@mui/icons-material/Download';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TextStyleBar from "./TextStyleBar";
import {fonts} from "../TextPanel";
import {isText} from "../AppCanvas";
import { SketchPicker } from 'react-color';

import { DesignEditorContext } from '../../../contexts/DesignEditorContext';


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



const useStyles = makeStyles((theme) => ({
  root: {
    top: "-10px !important",
  },
  btn: {
    minWidth: 0,
    height: 40,
    width: 40,
  },
  select: {
    "& fieldset": {
      borderWidth: "0px !important",
    },
  },
}));


export default function Topbar() {
  const fontClasses = useStyles();

  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['bold','italic','underlined']);
  const [devices, setDevices] = React.useState(() => ['phone']);

  const [rightButtonSetActive, setRightButtonSetActive] = React.useState('');
  const [textAnchor, setTextAnchor] = React.useState(null);
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

  const [colorOpen, setColorOpen] = React.useState(false);
  const [colorAnchor, setColorAnchor] = React.useState(null);
  const [color,setColor] = React.useState("black");


  const {
    setSelectedSidebarMenuItem,
    toolbarCommands, 
    setToolbarCommands,
    selectedCanvasObject,
    selectedFont,
    setSelectedFont
  } = useContext(DesignEditorContext);

  React.useEffect(() => {
    if( selectedCanvasObject.type !== "text"){ 
      console.log("not text selected. clearing ... !!", selectedCanvasObject);
      setIsUnderline(false);
      setIsBold(false)
      setIsItalic(false)
      return; 
    }

    setIsUnderline(selectedCanvasObject.object.underline);
    setIsBold(selectedCanvasObject.object.fontWeight === "bold");
    setIsItalic(selectedCanvasObject.object.fontStyle === "italic");
    setColor(selectedCanvasObject.object.fill);

  },[selectedCanvasObject])

  const handleFormat = ( event,  newFormats,) => {
    console.log("format", newFormats)
    // switch(newFormats){
    //   case "bold":
    //     setToolbarCommands([...toolbarCommands,{command:"textFontWieght", params:{fontWeight:newFormats}}])
    //     break;
    //   default:
    // }

  };

  const handleAlignment = ( event,  newFormats,) => {
    setAlignment(newFormats);
    console.log("handle format !!", newFormats);
    setToolbarCommands([...toolbarCommands,{command:"textAlignment", params:{alignment:newFormats}}])
  };

  const handleDelete = () => {
    console.log("handle delete !!");
    setToolbarCommands([...toolbarCommands,{command:"deleteSelected", sender:{}}])
  }
  const handleBold = () => {
    if( selectedCanvasObject.type !== "text"){return;}
    let val = selectedCanvasObject.object.fontWeight === "bold" ? "normal" : "bold"
    console.log("handle bold !!");
    setToolbarCommands([...toolbarCommands,{command:"textProperty", params:{key:"fontWeight",value:val}}])
  }

  const handleItalic = () => {
    if( selectedCanvasObject.type !== "text"){ return; }
    let val = selectedCanvasObject.object.fontStyle === "italic" ? "normal" : "italic"
    console.log("handl italic !!");
    setToolbarCommands([...toolbarCommands,{command:"textProperty", params:{key:"fontStyle",value:val}}])
  }

  const handleUnderline = () => {
    if( selectedCanvasObject.type !== "text"){ return; }
    console.log("handle underline !!");
    let val = !selectedCanvasObject.object.underline;
    setToolbarCommands([...toolbarCommands,{command:"textProperty", params:{key:"underline",value:val}}])
  }

  const colorOpenClick = (e) => {
    setColorAnchor(e.currentTarget);
    setColorOpen(true);
  };
  const colorSelect = (v) => {
    // anchor.style.color = v;
    setColor(v);
    setToolbarCommands([...toolbarCommands,{command:"textProperty", params:{key:"stroke",value:v}}])
    setToolbarCommands([...toolbarCommands,{command:"textProperty", params:{key:"fill",value:v}}])
  };

  const fontChange = (v) => {
    //anchor.style.fontFamily = v;
    setToolbarCommands([...toolbarCommands,{command:"textProperty", params:{key:"fontFamily",value:v}}])
  };

  let fontFam = (selectedCanvasObject.type === "text") ? selectedCanvasObject.object.fontFamily : fonts[0].value ;

  return (
    <div>
       <Stack direction="row" spacing={8}>

       {/* <TextStyleBar
        open={true}
        anchor={textAnchor}
        onClose={() => setTextAnchor(null)}
        currentTextData={currentTextData}
        setCurrentTextData={setCurrentTextData}
      /> */}

        <TextField
          // label="Font Style"
          // value={fontFamily}
          variant="outlined"
          size="small"
          select
          value={fontFam }
          className={fontClasses.select}
          // fullWidth
          onChange={(e) => fontChange(e.target.value)}
        >
          {fonts.map((item) => (
            <MenuItem
              key={uuid()}
              value={item.value}
              style={{ fontFamily: item.value }}
            >
              {item.name}
            </MenuItem>
          ))}
        </TextField>






        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold" selected={isBold}>
            <FormatBoldIcon onClick = {handleBold}/>
          </ToggleButton>
          <ToggleButton value="italic" onClick = {handleItalic} aria-label="italic" selected={isItalic} >
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" onClick = {handleUnderline} aria-label="underlined" selected={isUnderline}>
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton value="color" aria-label="color">
            <FormatColorFillIcon sx={{ color: color }}/>
            <ArrowDropDownIcon  onClick={colorOpenClick} />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />



        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <FormatAlignRightIcon />
          </ToggleButton>
          {/* <ToggleButton value="justify" aria-label="justified" disabled>
            <FormatAlignJustifyIcon />
          </ToggleButton> */}
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />


        <StyledToggleButtonGroup
          size="small"
        value={"delete"}
        aria-label="device"
      >
        <ToggleButton value="delete" aria-label="delete">
          <DeleteOutlineIcon onClick = {handleDelete} />
        </ToggleButton>
      </StyledToggleButtonGroup>

        </Stack>
      {/* </Paper> */}


      <Popover
          open={colorOpen}
          onClose={() => setColorOpen(false)}
          anchorEl={colorAnchor}
          anchororigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <SketchPicker color={color}  onChangeComplete={ (c)=>colorSelect(c.hex) }/>
          {/* <Grid container style={{ width: 120 }}>
            {colors.map((item) => (
              <Grid key={item} item xs={4}>
                <Button
                  className={classes.btn}
                  onClick={() => colorSelect(item)}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 360,
                      background: item,
                    }}
                  />
                </Button>
              </Grid>
            ))}
          </Grid> */}
        </Popover>
    </div>
  );
}
