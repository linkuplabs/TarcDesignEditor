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
  const [savedSVGData, setSavedSVGData] = React.useState("");
  const [savedJSONData, setSavedJSONData] = React.useState("");
  const [zoomValue, setZoomValue] = React.useState(1)
  const [zoomSliderChanged, setZoomSliderChanged] = React.useState(1)
  const [ undoEnabled, setUndoEnabled ] =  React.useState(true);
  const [ redoEnabled, setRedoEnabled ] =  React.useState(true);
  const [currentScene, setCurrentScene] =  useState({});

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
    setSelectedFont,
    savedSVGData,
    setSavedSVGData,
    savedJSONData,
    setSavedJSONData,
    zoomValue,
    setZoomValue,
    zoomSliderChanged,
    setZoomSliderChanged,
    undoEnabled,
    setUndoEnabled,
    redoEnabled,
    setRedoEnabled,
    currentScene,
    setCurrentScene,

  };

  return <DesignEditorContext.Provider value={value}>{children}</DesignEditorContext.Provider>;
}

export const useDesignEditorValue = () => useContext(DesignEditorContext);
