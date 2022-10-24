import React,{ useState, createContext , useContext} from "react";
export const DesignEditorContext = createContext({});


export function DesignEditorProvider(props) {
  let { children } = props

  const [searchText, setSearchText] = useState("");
  const [doSearch, setDoSearch] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSidebarMenuItem, setSelectedSidebarMenuItem] = useState("");
  const [toolbarCommands, setToolbarCommands] = useState([]);
  const [panelSearchInputText, setPanelSearchInputText] = useState('');
  const [cloudModelImages, setCloudModelImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedCanvasObject, setSelectedCanvasObject] =  React.useState({});
  const [selectedFont, setSelectedFont] =  React.useState({});


  const value =  {
    searchText,
    setSearchText,
    doSearch,
    setDoSearch,
    selectedLocations,
    setSelectedLocations,
    selectedSidebarMenuItem,
    setSelectedSidebarMenuItem,
    toolbarCommands, 
    setToolbarCommands,
    uploadedImages, 
    setUploadedImages,
    panelSearchInputText,
    setPanelSearchInputText,
    cloudModelImages,
    setCloudModelImages,
    selectedCanvasObject,
    setSelectedCanvasObject,
    selectedFont,
    setSelectedFont
  };

  return <DesignEditorContext.Provider value={value}>{children}</DesignEditorContext.Provider>;
}

export const useDesignEditorValue = () => useContext(DesignEditorContext);
