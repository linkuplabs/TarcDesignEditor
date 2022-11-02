import React, { useEffect, useState , useContext} from "react";
import PicsUploader from '../pics/PicsUploader';

import PerfectScrollbar from "react-perfect-scrollbar";
import classNames from "classnames";


import ImagesGallery from "../gallery/ImagesGallery";
import PanelHeader  from "./PanelHeader";
import { makeStyles} from "@material-ui/core";
import {DesignEditorContext } from '../../contexts/DesignEditorContext';

import {SAMPLE_TEMPLATES, NATIVE_TEMPLATES } from './templates/Templates';

import {postermywall} from "../../store/ApiKeys";

export const useStyles = makeStyles((theme) => ({
  pinContainer: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
    transition: "all 300ms ease-in-out",
    background: "rgb(32,31,35)",
    // boxShadow: "-5px 0px 35px rgb(0 0 0 / 31%)",
    zIndex: 1,
    overflowY: "auto",
    margin:2,
    marginLeft: 1,
  },
  pinContainerOpen: {
    width: 200,
    minWidth: 100,
    padding: 0,
    left: 0,
    opacity: 1,
    marginLeft: 20,
  },
  pinContainerClose: {
    width: 0,
    minWidth: 0,
    padding: 0,
    left: 0,
    opacity: 0,
  },

  list: {
    overflowY: "auto",
  },
  addBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
  heading: {
    fontWeight: 400,
    color: "black",
    fontSize: 25,
    marginBottom: 5,
    padding: 5,
    textAlign: 'right'
  },
}));






export const TemplatesPanel = ({ cellWidth, cellHeight, open,images, height, onClick, searchPlaceholder }) => {
  const classes = useStyles();
  const [imageUrls, setImageUrls] = useState([]);


  const {
    cloudModelImages,
    setCloudModelImages,
    uploadedImages,
    setUploadedImages,
    setSelectedSidebarMenuItem,
    toolbarCommands, 
    setToolbarCommands,
    panelSearchInputText,
    setPanelSearchInputText,
    currentScene,
    setCurrentScene,
  } = useContext(DesignEditorContext);


  let allImages = uploadedImages.concat(cloudModelImages);



  React.useEffect(() => {
    let images = NATIVE_TEMPLATES.map( (template, index) => {
      return {src:template.preview,id:index, content:template}
    });

    setImageUrls(images)

  },[NATIVE_TEMPLATES])

  const onSelectTemplate  = (list, index) =>{
    console.log("template clicked ", SAMPLE_TEMPLATES[index])
    let template =NATIVE_TEMPLATES[index];
    loadTemplate(template)

  }

    React.useEffect(() => {
      const panelSearch = "party"
      const postermywallurl =  `https://api.postermywall.com/v1/templates?client_id=${postermywall.api_key}&keyword=${panelSearch}`

     const curl = "https://www.postermywall.com/index.php/posterbuilder/copy/721d92d88fcf6467e3a4305e0dabe6eb?utm_source=api"


    fetch(curl)
      .then((res) => res.json())
      .then((data) => {
        console.log("got templates", data);
        const images = data.map((d, index) => ({
          src: d.preview_url,
          content:d,
          id:index
        }));
        console.log("got templates", images);
        setImageUrls(images);
      });
  }, []);



  const editor = true;
  const loadTemplate =  React.useCallback( async(template) => {
      console.log("loading template", template)
      if (editor) {
        const fonts = []
        template.objects.forEach((object) => {
          if (object.type === "StaticText" || object.type === "DynamicText") {
            fonts.push({
              name: object.fontFamily,
              url: object.fontURL,
              options: { style: "normal", weight: 400 },
            })
          }
        })
        const filteredFonts = fonts.filter((f) => !!f.url)
        if (filteredFonts.length > 0) {
          await loadFonts(filteredFonts)
        }

        setCurrentScene({ ...template, id: currentScene?.id })
        console.log("currentScene", currentScene)
      }
  })

  const loadFonts = (fonts) => {


    console.log("loading fonts", fonts);
    const promisesList = fonts.map((font) => {
      return new FontFace(font.name, `url(${font.url})`).load().catch((err) => err)
    })
    return new Promise((resolve, reject) => {
      Promise.all(promisesList)
        .then((res) => {
          res.forEach((uniqueFont) => {
            if (uniqueFont && uniqueFont.family) {
              document.fonts.add(uniqueFont)
              resolve(true)
            }
          })
        })
        .catch((err) => reject(err))
    })
  }

  

  let panelHeader = (open)  ?<PanelHeader className= {classes.pinContainerOpen } showSearch={true} searchPlaceholder={searchPlaceholder} /> :<></>


  return (
    <div>

    {panelHeader}

    <PerfectScrollbar
      className={classNames(
        classes.pinContainer,
        open ? classes.pinContainerOpen : classes.pinContainerClose
      )}
      style={{height:height? height:500,'borderRadius': '0px 0px 0px 0px','backgroundColor': '#fff','boxShadow': '0px 5px 7px -7px rgba(0, 0, 0, 0.75)'}}
    >

    <ImagesGallery cellWidth ={cellWidth} images={imageUrls} onClick={onSelectTemplate}/> 
    </PerfectScrollbar>
    </div>
  );
};



export default TemplatesPanel;