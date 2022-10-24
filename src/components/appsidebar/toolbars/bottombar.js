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

export default function Bottombar() {
  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['italic']);
  const [devices, setDevices] = React.useState(() => ['phone']);

  const handleFormat = (
    event,
    newFormats,
  ) => {
    setFormats(newFormats);
  };

  const handleAlignment = (
    event,
    newAlignment,
  ) => {
    setAlignment(newAlignment);
  };

  const handleDevices = (
    event,
    newDevices,
  ) => {
    if (newDevices.length) {
      setDevices(newDevices);
    }
  };

  return (
    <div>
      {/* <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      > */}
       <Stack direction="row" spacing={8}>
        <StyledToggleButtonGroup
          size="string"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
        <ToggleButton value="tv" aria-label="tv">
          <WebAssetIcon />
        </ToggleButton>
        <ToggleButton value="phone" aria-label="phone">
          <DownloadIcon />
        </ToggleButton>
        <ToggleButton value="laptop" aria-label="laptop">
          <DeleteOutlineIcon />
        </ToggleButton>

        </StyledToggleButtonGroup>
    

        </Stack>
      {/* </Paper> */}
    </div>
  );
}
