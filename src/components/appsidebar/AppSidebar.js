import React,{useContext} from "react";
import {useWindowSize} from '../utils/Window';

import axios from "axios";

import { DesignEditorContext } from '../../contexts/DesignEditorContext';


import random from "lodash/random";
import {shapes} from "./shapes/shapes";

import {AppSideToolbar, BASE_BUTTONS } from "./AppSideToolbar";
import AppToolbarImagesPanel  from "./AppToolbarImagesPanel";
import TextPanel  from "./TextPanel";
import UploaderPanel  from "./UploaderPanel";
import SettingsPanel  from "./SettingsPanel";
import TemplatesPanel  from "./TemplatesPanel";
import AppCanvas from "./AppCanvas";
import Topbar from "./toolbars/topbar";
import Bottombar from "./toolbars/bottombar";

import getStickerNames from "./stickersSrc";
import {pixabay} from "../../store/store"

import "./AppSidebar.css"


const AppSidebar = ({ pins }) => {

  const [imagesMenuImages, setImagesMenuImages] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [view, setView] = React.useState('templates');
  const [stickers, setStickers] = React.useState([]);
  const [searchedKeyword, setSearchedKeyword] = React.useState([]);
  const size = useWindowSize();
  const {width, height} = size;

  const {
    panelSearchInputText,
    setSelectedSidebarMenuItem,
    toolbarCommands, 
    setToolbarCommands,
  } = useContext(DesignEditorContext);

  // React.useEffect(() => {
  //   fetch("https://picsum.photos/v2/list?page=2&limit=20")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const images = data.map((d, index) => ({
  //         src: d.download_url,
  //         id:index
  //       }));
  //       console.log("got images", images);
  //       setImagesMenuImages(images);
  //     });
  // }, []);

  React.useEffect(() => {

    if (searchedKeyword !== "") {
      axios
        .get(
          `https://pixabay.com/api/?key=${pixabay.api_key}&q=${panelSearchInputText}&image_type=photo&min_width=500px&min_height=500px`
        )
        .then((res) => {
          let images = res.data.hits;
          localStorage.setItem("images", JSON.stringify(images));
          setData();
        })
        .catch((error) => console.log(error));
    }
  }, [panelSearchInputText]);

  const setData = () => {
    let imagesData = JSON.parse(localStorage.getItem("images"));
    console.log("pixabay images", imagesData);
    const images = imagesData.map((d, index) => ({
          src: d.previewURL,
          id:index
        }));
    // setImages(imagesData);
    setImagesMenuImages(images);
  };

  React.useEffect(() => {
    let stickers = getStickerNames();
    console.log("stickers", stickers);
    setStickers(stickers);
  }, [])

  const handleToolbaarChange = (e, nextView) => {
    setView(nextView);
    setSelectedSidebarMenuItem(nextView);

    switch(nextView){
      case "circle":
        setToolbarCommands([...toolbarCommands,{command:"addCircle", params:{}}])
      break;
      case "square":
        setToolbarCommands([...toolbarCommands,{command:"addSquare", params:{}}])
      break;
      case "line":
        setToolbarCommands([...toolbarCommands,{command:"addLine", params:{}}])
      break;
      case "delete":
        setToolbarCommands([...toolbarCommands,{command:"deleteSelection", params:{}}])
      break;
      default:
        console.log("unknown toolbar selection 🔴❓❓", view)
    }

  };

  const addTextElement = (font) => {
    let t = "Text";
    console.log("adding text element")

    setToolbarCommands([...toolbarCommands,{command:"addText", params:{font:font}}])
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
    console.log("clicked texts ", index, list)
    addTextElement(list[index])
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
    sidePanel =  <TemplatesPanel
    open={true}
    cellWidth = {cellWidth}
    cellHeight = {random(90, 300)}
    images={imagesMenuImages}
    height = {adjHeight}
    onClick = {onClickImages}
    searchPlaceholder = "🔍 search templates"
  /> ;
    break;

    case "text":
      isOpen = true;
      sidePanel =  <TextPanel
      open={true}
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
      showPixaby = {true}
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
      isOpen = false;
      sidePanel =  <AppToolbarImagesPanel
      open={false}
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
        <div  className="workspace" id="workspace"  style={{  'marginTop': '10px' , 'marginRight': '20px' ,'backgroundColor': '#eee','borderRadius': '15px 15px 15px 15px','boxShadow': '5px 5px 7px -7px rgba(f, f, f, 0.75)', 'width': `${width - sidebarSize -100 }px`, 'height': `${adjHeight-50}px`}} >
        <Topbar  />
         <AppCanvas width={ `${width - sidebarSize -100 }px`} height={`${adjHeight-50}px`}  />
         <Bottombar  />
        </div>

      </div>
    </div>
  );
};


export default AppSidebar;
