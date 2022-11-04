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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';


export default function SaveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(props.data);
      console.log('Copied!');
    } catch (err) {
      console.log('Failed to copy!');
    }
  };

  let prettyData  = props.data;

  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
          <DialogActions>
          <ContentCopyIcon  onClick={copyToClipBoard} />

          </DialogActions>
  
        <DialogTitle id="responsive-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
        <Paper sx={{ width: 320 }}>
          {prettyData}
    </Paper>
        </DialogContent>
         <DialogActions>
        <Button autoFocus onClick={props.handleClose}>
        Close
         </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}