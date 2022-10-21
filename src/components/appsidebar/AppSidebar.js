import React,{useContext} from "react";
import {useWindowSize} from '../utils/Window';



import { DesignEditorContext } from '../../contexts/DesignEditorContext';


import random from "lodash/random";
import {shapes} from "./shapes/shapes";

import {AppSideToolbar, BASE_BUTTONS } from "./AppSideToolbar";
import AppToolbarImagesPanel  from "./AppToolbarImagesPanel";
import UploaderPanel  from "./UploaderPanel";
import SettingsPanel  from "./SettingsPanel";
import AppCanvas from "./AppCanvas";

import getStickerNames from "./stickers/stickersSrc";
import "./AppSidebar.css"


const AppSidebar = ({ pins }) => {

  const [imagesMenuImages, setImagesMenuImages] = React.useState([]);
  const [view, setView] = React.useState('templates');
  const [stickers, setStickers] = React.useState([]);
  const size = useWindowSize();
  const {width, height} = size;

  const {
    setSelectedSidebarMenuItem,
    toolbarCommands, 
    setToolbarCommands,

  } = useContext(DesignEditorContext);

  React.useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=20")
      .then((res) => res.json())
      .then((data) => {
        const images = data.map((d, index) => ({
          src: d.download_url,
          id:index
        }));
        console.log("got images", images);
        setImagesMenuImages(images);
      });
  }, []);

  React.useEffect(() => {
    let stickers = getStickerNames();
    console.log("stickers", stickers);
    setStickers(stickers);
  }, [])

  const handleToolbaarChange = (e, nextView) => {
    setView(nextView);
    setSelectedSidebarMenuItem(nextView);

    switch(nextView){
      case "text":
        addTextElement();
        break;
      default:
        console.log("unknown toolbar selection 🔴❓❓", view)
    }

  };

  const addTextElement = () => {
    let t = "Text";
    console.log("adding text element")
    setToolbarCommands([...toolbarCommands,{command:"addText", params:t}])
  };

  const addImageElement = (image) => {
    console.log("adding image element")
    setToolbarCommands([...toolbarCommands,{command:"addImage", params:image}])
  };

  const addBackground = (image) => {
    console.log("adding image element")
    setToolbarCommands([...toolbarCommands,{command:"addBackground", params:image}])
  };

  const onClickTemplates  = (list, index) =>{
    console.log("clicked templates ", index)
  }

  const onClickTexts  = (list, index) =>{
    console.log("clicked texts ", index)
  }
  
  const onClickImages  = (list, index) =>{
    console.log("clicked images ", index)
    let image = list[index]
    addImageElement(image)
  }

  const onClickBackground  = (list, index) =>{
    console.log("clicked images ", index)
    let image = list[index]
    addBackground(image)
  }

  const onClickShapes  = (list, index) =>{
    console.log("clicked shapes ", index)
    let image = list[index]
    addImageElement(image)
  }

  const onClickStickers  = (list, index) =>{
    console.log("clicked stickers ", index)
    let image = list[index]
    addImageElement(image)
  }

  const onClickUpload  = (list, index) =>{
    console.log("clicked upload ", index)
    let image = list[index]
    addImageElement(image)
  }

  const onClickSettings  = (list, index) =>{
    console.log("clicked upload ", index)
    let image = list[index]
    addImageElement(image)
  }

  const rawImagesToObjects = (images) => {
    let objs = images.map( (image, index) => {
      return {src:image,id:index}
    });
    console.log("rawImagesToObjects", objs)
    return objs;
  }


  let adjHeight = height - 100;
  var isOpen = true;


  var sidePanel;
  const cellWidth = 100;
  switch(view){

  case "templates":
    isOpen = true;
    sidePanel =  <AppToolbarImagesPanel
    open={true}
    cellWidth = {cellWidth}
    cellHeight = {random(100, 300)}
    images={imagesMenuImages}
    height = {adjHeight}
    onClick = {onClickImages}
    searchPlaceholder = "🔍 search images"
  /> ;
    break;

    case "text":
      isOpen = false;
      sidePanel =  <AppToolbarImagesPanel
      open={false}
      images={[]}
      cellWidth = {70}
      cellHeight = {random(100, 200)}
      height = {adjHeight}
      onClick = {onClickTexts}
    /> ;
      break;
    case "images":
      isOpen = true;
      sidePanel =  <AppToolbarImagesPanel
      open={true}
      cellWidth = {cellWidth}
      cellHeight = {random(100, 300)}
      images={imagesMenuImages}
      height = {adjHeight}
      onClick = {onClickImages}
      searchPlaceholder = "🔍 search images"
    /> ;
        break;

    case "stickers":
      isOpen = true;
      sidePanel =  <AppToolbarImagesPanel
      open={true}
      cellWidth = {cellWidth}
      cellHeight = {cellWidth}
      images={stickers}
      height = {adjHeight}
      onClick = {onClickStickers}
      searchPlaceholder = "🔍 search images"
    /> ;
        break;
    case "background":
      isOpen = true;
      sidePanel =  <AppToolbarImagesPanel
      open={true}
      cellWidth = {cellWidth}
      cellHeight = {random(100, 200)}
      images={imagesMenuImages}
      height = {adjHeight}
      onClick = {onClickBackground}
      searchPlaceholder = "🔍 search images"
    /> ;
      break;
    case "shapes":
      isOpen = true;
      sidePanel =  <AppToolbarImagesPanel
      open={true}
      cellWidth = {cellWidth}
      cellHeight = {cellWidth}
      images={rawImagesToObjects(shapes)}
      height = {adjHeight}
      onClick = {onClickShapes}
      searchPlaceholder = "🔍    search shapes"
    /> ;
      break;
    case "uploads":
      isOpen = true;
      sidePanel =  <UploaderPanel
      open={true}
      cellWidth = {cellWidth}
      cellHeight = {100}
      images={imagesMenuImages}
      height = {adjHeight}
      onClick = {onClickUpload}
    /> ;
      break;
    case "settings":
      isOpen = true;
      sidePanel =  <SettingsPanel
      open={true}
      cellWidth = {cellWidth}
      cellHeight = {100}
      height = {adjHeight}
      onClick = {onClickSettings}
    /> ;
      break;
    default:
      isOpen = true;
      sidePanel =  <AppToolbarImagesPanel
      open={true}
      cellWidth = {cellWidth}
      cellHeight = {random(100, 200)}
      images={imagesMenuImages}
      height = {adjHeight}
      onClick = {onClickTemplates}
      searchPlaceholder = "🔍 search templates"
    /> ;
    console.log("unknown toolbar selection 🔴❓❓", view)
  }

  
  let sideopen = 260;
  const sidebarSize = (isOpen)? sideopen: 0;

  return (
    <div className="mapPage__left">

      < AppSideToolbar buttons = {BASE_BUTTONS} view = {view} onChange={handleToolbaarChange}/>

      {sidePanel}

      <div >
        
        <div  className="workspace" id="workspace"  style={{  'margin-top': '10px' , 'margin-right': '20px' ,'background-color': '#eee','border-radius': '15px 15px 15px 15px','box-shadow': '5px 5px 7px -7px rgba(f, f, f, 0.75)', 'width': `${width - sidebarSize -100 }px`, 'height': `${adjHeight-50}px`}} >
        {/* <Topbar  /> */}
         <AppCanvas width={ `${width - sidebarSize -100 }px`} height={`${adjHeight-50}px`}  />
        </div>

      </div>
    </div>
  );
};


export default AppSidebar;
