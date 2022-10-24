import React from "react";
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
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import { v4 as uuid } from "uuid";
import { SketchPicker } from 'react-color';

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

const colors = ["red", "yellow", "grey", "green", "purple", "cyan"];

const fonts = [
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

const TextStyleBar = ({
  open,
  anchor,
  onClose,
  currentTextData,
  setCurrentTextData,
}) => {
  const classes = useStyles();
  const [colorOpen, setColorOpen] = React.useState(false);
  const [colorAnchor, setColorAnchor] = React.useState(null);
  const [color,setColor] = React.useState(currentTextData?.color || "black");
  const colorOpenClick = (e) => {
    setColorAnchor(e.currentTarget);
    setColorOpen(true);
  };

  const colorSelect = (v) => {
    anchor.style.color = v;
    setColor(v);
    setCurrentTextData({ ...currentTextData, color: v });
  };

  const fontWeightChange = () => {
    let ft = currentTextData?.fontWeight === "bold" ? "normal" : "bold";
    anchor.style.fontWeight = ft;
    setCurrentTextData({ ...currentTextData, fontWeight: ft });
  };

  const underLineChange = () => {
    let ft =
      currentTextData?.textDecoration === "underline" ? "none" : "underline";
    anchor.style.textDecoration = ft;
    setCurrentTextData({ ...currentTextData, textDecoration: ft });
  };

  const fontChange = (v) => {
    anchor.style.fontFamily = v;
    setCurrentTextData({ ...currentTextData, fontFamily: v });
  };

  const setAlign = (v) => {
    anchor.style.textAlign = v;
    setCurrentTextData({ ...currentTextData, textAlign: v });
  };

  return (
    // <Popper
    //   open={open}
    //   placement="top"
    //   // onClose={onClose}
    //   // anchorEl={anchor}
    //   // disableEnforceFocus
    //   // disableAutoFocus
    //   // hideBackdrop

    //   className={classes.root}
    //   anchororigin={{
    //     vertical: "top",
    //     horizontal: "center",
    //   }}
    //   transformorigin={{
    //     vertical: "bottom",
    //     horizontal: "center",
    //   }}
    // >
      // <Paper>
      <div>
        <TextField
          // label="Font Style"
          // value={fontFamily}
          variant="outlined"
          size="small"
          select
          value={currentTextData?.fontFamily}
          className={classes.select}
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
        <Button
          className={classes.btn}
          style={{
            background:
              currentTextData?.fontWeight === "bold"
                ? "rgb(220,220,220)"
                : "none",
          }}
          onClick={fontWeightChange}
        >
          <FormatBoldIcon />
        </Button>
        <Button
          className={classes.btn}
          style={{
            borderRight: "1px solid rgba(0,0,0,0.2)",
            background:
              currentTextData?.textDecoration === "underline"
                ? "rgb(220,220,220)"
                : "none",
          }}
          onClick={underLineChange}
        >
          <FormatUnderlinedIcon />
        </Button>
        <Button
          className={classes.btn}
          style={{
            background:
              currentTextData?.textAlign === "left"
                ? "rgb(220,220,220)"
                : "none",
          }}
          onClick={() => setAlign("left")}
        >
          <FormatAlignLeftIcon />
        </Button>
        <Button
          style={{
            background:
              currentTextData?.textAlign === "center"
                ? "rgb(220,220,220)"
                : "none",
          }}
          className={classes.btn}
          onClick={() => setAlign("center")}
        >
          <FormatAlignCenterIcon />
        </Button>
        <Button
          style={{
            background:
              currentTextData?.textAlign === "right"
                ? "rgb(220,220,220)"
                : "none",
          }}
          className={classes.btn}
          onClick={() => setAlign("right")}
        >
          <FormatAlignRightIcon />
        </Button>
        <Button
          className={classes.btn}
          style={{ borderLeft: "1px solid rgba(0,0,0,0.2)" }}
          onClick={colorOpenClick}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 360,
              background: currentTextData?.color,
            }}
          />
        </Button>
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
      // </Paper>
    // </Popper>
  );
};

export default TextStyleBar;
