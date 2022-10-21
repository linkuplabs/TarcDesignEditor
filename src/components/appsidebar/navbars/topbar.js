import React from 'react';

import {
  Button,
  Navbar,
  Alignment,
  AnchorButton,
  Divider,
  Dialog,
  Classes,
  Position,
  Menu,
  HTMLSelect,
  Slider,
  User,
  
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';



// import styled from 'polotno/utils/styled';


// const NavbarContainer = styled('div')`
//   @media screen and (max-width: 500px) {
//     overflow-x: auto;
//     overflow-y: hidden;
//     max-width: 100vw;
//   }
// `;

// const downloadFile = (url, filename) => {

// }

// const NavInner = styled('div')`
//   @media screen and (max-width: 500px) {
//     display: flex;
//   }
// `;

export const Topbar = () => {
  const inputRef = React.useRef();

  const [faqOpened, toggleFaq] = React.useState(false);
  const [questionOpened, toggleQuestion] = React.useState(false);

  return (
    <div className="bp4-navbar">
      <div >
        <Navbar.Group align={Alignment.LEFT}>
          <Button
            icon="new-object"
            minimal
          >
            New
          </Button>
          <label htmlFor="load-project">
            <Button
              icon="folder-open"
              minimal
              onClick={() => {
                document.querySelector('#load-project').click();
              }}
            >
              Open
            </Button>
            <input
              type="file"
              id="load-project"
              accept=".json,.polotno"
              ref={inputRef}
              style={{ width: '180px', display: 'none' }}
              onChange={(e) => {
                var input = e.target;

                if (!input.files.length) {
                  return;
                }

                var reader = new FileReader();
                reader.onloadend = function () {
                };
                reader.onerror = function () {
                  alert('Can not load the project.');
                };
                reader.readAsText(input.files[0]);
              }}
            />
          </label>
          <Button
            icon="floppy-disk"
            minimal
          >
            Save
          </Button>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button
            icon="user"
            minimal
            onClick={() => {

            }}
          >
            Profile
          </Button>
          
          <Button icon="info-sign" minimal onClick={() => toggleFaq(true)}>
            About
          </Button>

          <Divider />

        </Navbar.Group>


      </div>
    </div>
  );
};

export default Topbar;
