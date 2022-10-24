
import React,{ useState, createContext , useContext} from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import {DesignEditorContext } from '../../contexts/DesignEditorContext';

import "./AppCanvas.css";

export const isImage = (obj) =>{
  if(obj && obj._element && (obj._element.className === "canvas-img")){
    console.log("obj is image")
    return true
  }else {
    return false
  }
}

export const isText = (obj) =>{
  if(obj && obj.objecttype && (obj.objecttype === "text")){
    console.log("obj is text")
    return true
  }else {
    return false
  }
}

export const isCircle = (obj) =>{
  if(obj && obj.radius){
    console.log("obj is circle")
    return true
  }else {
    return false
  }
}


export default function AppCanvas() {
  const { editor, onReady } = useFabricJSEditor();
  const [data, setData] = React.useState("");
  const [selectionClearedActive, setSelectionClearedActive] = React.useState(false);
  
  


  const {
    toolbarCommands, 
    setToolbarCommands,
    selectedCanvasObject,
    setSelectedCanvasObject,
    selectedFont,
    setSelectedFont
  } = useContext(DesignEditorContext);

  const nullElementSelected = () =>{
    console.log("no elements selected")
   
    let obj = {
      object:{},
      type:"nullElement",
   }
   setSelectedCanvasObject(obj)
}

  const textElementSelected = (text) =>{
    console.log("this is the text func")
   
    let obj = {
      object:text,
      type:"text",
      fontWeight:text.fontWeight,
      fontSize:text.fontSize,
      italic:text.fontStyle,
      underline:text.underline,
      textAlign:text.textAlign,
      backgroundColor:text.backgroundColor,
      font:text.fontFamily,
      color:text.stroke,
      scaleX: text.scaleX,
      scaleY: text.scaleY,
   }
   console.log("text properties", obj)
   setSelectedCanvasObject(obj)
}

  const imageElementSelected = (img) =>{
      console.log("this is the image func", img)
     
      let obj = {
        object:img,
        type:"image",
        top:img.top,
        left:img.left,
        width:img.width,
        height:img.height,
        color:img.fill,
        scaleX: img.scaleX,
        scaleY: img.scaleY,
     }
     console.log("text properties", obj)
     setSelectedCanvasObject(obj)
  }

  const circleElementSelected = (circle) =>{
   
    let obj = {
      object:circle,
      type:"circle",
      radius:circle.radius,
      fill:circle.fill,
      stroke:circle.stroke,
      strokeWidth:circle.strokeWidth,
      scaleX: circle.scaleX,
      scaleY: circle.scaleY,
   }
   console.log("circle properties", obj)
   setSelectedCanvasObject(obj)
  }

  const rectElementSelected = (rect) =>{
   
    let obj = {
      object:rect,
      type:"rect",
      // radius:rect.radius,
      stroke:rect.stroke,
      strokeWidth:rect.strokeWidth,
      fill:rect.fill,
      scaleX: rect.scaleX,
      scaleY: rect.scaleY,
   }
   console.log("rect properties", obj)
   setSelectedCanvasObject(obj)
  }

  const lineElementSelected = (line) =>{
   
    let obj = {
      object:line,
      type:"line",
      stroke:line.stroke,
      fill:line.fill,
      strokeWidth:line.strokeWidth,
      scaleX: line.scaleX,
      scaleY: line.scaleY,
   }
   console.log("line properties", obj)
   setSelectedCanvasObject(obj)
  }

  const addSelectionClearedListener =(editor) => {
    if(selectionClearedActive){
      console.log("selection cleared already active, aborting...");
       return 
    }
    editor.canvas.on('selection:cleared', function() {  
      console.log("selection cleared");
      nullElementSelected()
    });
    
    setSelectionClearedActive(true)
  }
  
  React.useEffect(() => {
    if(toolbarCommands.length > 0){
      console.log("effect handling new commands",toolbarCommands)
      toolbarCommands.forEach((ele, ind) => {
        switch(ele.command){
          case "addText":
            addTextElement(ele.params);
            break;
            case "addImage":
            addSticker(ele.params);
            break;
            case "addBackground":
            addBackground(ele.params);
            break;
            case "addCircle":
              var circle = new fabric.Circle({ radius: 75, stroke:'red' ,fill: null  });
              editor.canvas.add(circle);
              circle.on('selected', function() {
                circleElementSelected(circle)
              });
            break;
            case "addSquare":
  
              var rect = new fabric.Rect({ width: 100, height: 100, stroke:'red', fill: null });
              editor.canvas.add(rect);
              rect.on('selected', function() {
                rectElementSelected(rect)
              });
            break;
            case "addLine":
              var line = new fabric.Line([50, 100, 300, 100], {  stroke: 'black',  strokeWidth: 1, });
              editor.canvas.add(line);
              line.on('selected', function() {
                lineElementSelected(line)
              });
            break;
            case "deleteSelected":
              onDeleteSelection();
            break;
            case "textAlignment":
              changeTextAlignment(ele.params.alignment);
            break;
            case "textFontWieght":
              textFontWieght(ele.params.fontWeight);
            break;
            case "textProperty":
              textProperty(ele.params);
            break;

            default:
              console.log("unhandled command ", ele);
              break;
        }
      });
      setToolbarCommands([]);
    }
  });

  const addSticker = (image) => {
    console.log("adding sticker ",image);
    fabric.Image.fromURL( image.src, (img) => {
        editor.canvas.add(img);
        img.on('selected', function() {  imageElementSelected(img); }); 
        // editor.canvas.on('selection:cleared', function() {  
        //   console.log("selection cleared sticker");
        // });
        addSelectionClearedListener(editor)
      }
    );
  };

  const addTextElement = (param) => {
    let newID = (new Date()).getTime().toString().substr(5);
     console.log("setting font with",param)
     let fontName = (param.font) ? param.font.value : "Arial, sans-serif"
     let name = (param.font) ? param.font.name : "Text"
    let text = new fabric.IText(name, {
        left: 100,
        top: 100,
        objecttype: 'text',
        fontFamily: fontName,
        fill: '#000',
        stroke: '#fff',
        strokeWidth: .1,
        fontSize: 45
    });
    text.on('selected', function() {  textElementSelected(text); });
    // editor.canvas.on('selection:cleared', function() {  
    //   console.log("selection cleared text");
    // });
    addSelectionClearedListener(editor)
    editor.canvas.add(text);

  };


const addBackground = (img) => {
  console.log("adding background ",img);
     fabric.Image.fromURL(img.src, (img) => {
        // add background image
        editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas), {
           scaleX: editor.canvas.width / img.width,
           scaleY: editor.canvas.height / img.height
        });

        // editor.canvas.on('selection:cleared', function() {  
        //   console.log("selection cleared bg");
        // });
        addSelectionClearedListener(editor)
     });

};


function textProperty(param){
  let text = editor.canvas.getActiveObject()
  console.log("text object?",text);
  if (isText(text)){
    console.log("setting text property", param)
    text.set(param.key,param.value);
    // editor.canvas.setActiveObject(text);
    editor.canvas.renderAll();
  }
 }

 function textFontWieght(val){
  let text = editor.canvas.getActiveObject()
  console.log("text object?",text);
  if (isText(text)){
    text.set('fontWeight',"bold");
    editor.canvas.setActiveObject(text);
    editor.canvas.renderAll();
  }
 }


function changeTextAlignment( val){
  let text = editor.canvas.getActiveObject()
  console.log("text object?",text);
  if (isText(text)){
    text.set('textAlign',val);
    editor.canvas.setActiveObject(text);
    editor.canvas.renderAll();
  }
 }

const onDeleteSelection = () => {
  console.log('deleting editor...', editor);
  console.log('deleting editor canvas...', editor.canvas);


  const activeSelection = editor.canvas.activeSelection;
  console.log('deleting active selection', activeSelection);
  console.log('deleting activeObject', editor.canvas.activeObject);

  editor.deleteSelected();

  console.log('deleting editor canvas...', editor.canvas);
};

const deleteSelected = () => {
  editor.canvas.remove(editor.canvas.getActiveObject());
};
  const onExport = () => {
    let image = new Image();
    image.crossOrigin = "anonymous";
    image.src = editor.canvas.toDataURL();
    let w = window.open("");
    w.document.write(image.outerHTML);
  };


  const toSVG = () => {
    const svg = editor.canvas.toSVG();
    console.log(svg);
    setData(svg);
  };
  const toJSON = () => {
    const json = editor.canvas.toJSON();
    const data = JSON.stringify(json);
    console.log(data);
    setData(data);
  };

  return (
    <div className="AppCanvas">
      {/* <h1>Tarc Design Editor</h1> */}
      {/* <button className="primary-insta-btn" onClick={toSVG}>toSVG</button>
      <button className="primary-insta-btn" onClick={toJSON}>toJSON</button> */}
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      <pre>{data}</pre>
    </div>
  );
}
