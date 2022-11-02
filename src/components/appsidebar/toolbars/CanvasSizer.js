import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { v4 as uuid } from "uuid";

export default function CanvasSizer(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    let item = paperSizes[event.target.value]
    console.log("selected ", item)
    props.handleClose()
  };

  const paperSizes = [
    {
    name:'Flyer (portrait 8.5" x 11")',
    size:{width:8.5, height:11},
    units:"inches",
    description:"regular paper size"
    },
    {
      name:'Flyer (landscape 11" x 8.5")',
      size:{width:8.5, height:11},
      units:"inches",
      description:"regular paper size"
    },
    {
      name:'Yard Sign ( 24" x 18")',
      size:{width:24, height:18},
      units:"inches",
      description:"a typical front yard sign"
    },
    {
      name:'Tabloid ( 11" x 17")',
      size:{width:11, height:17},
      units:"inches",
      description:"tabloid"
    },
    {
      name:'Tabloid (landscape 17" x 11")',
      size:{width:17, height:11},
      units:"inches",
      description:"tabloid"
    },
    {
      name:'US legal ( 8.5" x 14")',
      size:{width:8.5, height:14},
      units:"inches",
      description:"us legal"
    },
    {
      name:'US legal (landscape 8.5" x 14")',
      size:{width:14, height:8.5},
      units:"inches",
      description:"us legal"
    }
  ]

  return (
    <div>

      {/* <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      > */}
        <DialogTitle id="responsive-dialog-title">
          {"Select Canvas size"}
        </DialogTitle>
        <DialogContent>
        {/* <Paper sx={{ width: 320 }}> */}
      <MenuList dense>

      {paperSizes.map((item, index) => (
            <MenuItem
              key={uuid()}
              value={index}
              onClick={handleClick}
            >
              {item.name}    
            </MenuItem>
          ))}

      </MenuList>
    {/* </Paper> */}
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            Cancel
          </Button>
        </DialogActions> */}
      {/* </Dialog> */}
    </div>
  );
}