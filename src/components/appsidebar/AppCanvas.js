
import React,{ useState, createContext , useContext} from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import {DesignEditorContext } from '../../contexts/DesignEditorContext';

import {getKeyboardCommand } from './Keypress';

import "./AppCanvas.css";
import SaveDialog from "./save/SaveDialog";

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

var state;
  // past states
var undo = [];
  // reverted states
var redo = [];

var copyObject;

export default function AppCanvas() {
  const { editor, onReady } = useFabricJSEditor();
  const [data, setData] = React.useState("");
  const [selectionClearedActive, setSelectionClearedActive] = React.useState(false);
  const [openSaveContent, setOpenSaveContent]  = React.useState(false);
  const [saveTitle, setSaveTitle]  = React.useState("");
  // const [copyObject, setCopyObject] = React.useState({});




  const {
    toolbarCommands, 
    setToolbarCommands,
    selectedCanvasObject,
    setSelectedCanvasObject,
    selectedFont,
    setSelectedFont,
    setSavedSVGData,
    setSavedJSONData,
    zoomValue,
    setZoomValue,
    zoomSliderChanged,
    setZoomSliderChanged,
    redoList,
    setRendoList,
    undoList,
    setUndoList,
    undoEnabled,
    setUndoEnabled,
    redoEnabled,
    setRedoEnabled,
    currentScene,
    setCurrentScene,

  } = useContext(DesignEditorContext);


  React.useEffect(() => {
    if(!editor || !editor.canvas )return

    const value = zoomSliderChanged;



    // if (value < 0) {
    //   editor.canvas.setZoom(zoomMin / 100);
    // } else if (value > zoomMax) {
    //   editor.canvas.setZoom(zoomMax / 100);
    // } else {
     editor.canvas.setZoom(value );
    // }

  }, [zoomSliderChanged])

  React.useEffect(() => {
    if(!editor || !editor.canvas )return
    addSelectionClearedListener(editor)

  }, [editor])

    React.useEffect(() => {
    if(!editor || !editor.canvas || (JSON.stringify( currentScene) === JSON.stringify({})) )return

    console.log("loading from current scene", currentScene)

    editor.canvas.loadFromJSON(currentScene, function() {
    editor.canvas.renderAll();
    setCurrentScene({})
  });


  }, [editor,currentScene])

  // React.useEffect(() => {
  // setUndoEnabled(undo.length > 0)
  // setRedoEnabled(redo.length > 0)


  // }, [ setUndoEnabled,setRedoEnabled ])

  const nullElementSelected = () =>{
    console.log("no elements selected")
   
    let obj = {
      object:{},
      type:"nullElement",
   }
   setSelectedCanvasObject(obj)
}

const resizeCanvas = (params) => {
  editor.canvas.setHeight(params.width);
  editor.canvas.setWidth( params.height);
  editor.canvas.renderAll();
}

function save() {
  // clear the redo stack
  redo = [];

  // initial call won't have a state
  if (state) {
    undo.push(state);
  }
  state = JSON.stringify(editor.canvas);

}

function replay(playStack, saveStack) {
  saveStack.push(state);
  state = playStack.pop();


  editor.canvas.clear();
  editor.canvas.loadFromJSON(state, function() {
    editor.canvas.renderAll();
  });
}

const addUndoRedoListener=(editor)=>{

let canvas = editor.canvas;
  save();
  canvas.on("object:added", function (e) {
      save();
  });

  canvas.on("object:modified", function (e) {
      save();
  });

}

function performUndo() {
  replay(undo, redo);

  setUndoEnabled(undo.length > 0)
  setRedoEnabled(redo.length > 0)
  
}

function performRedo() {
  replay(redo, undo);
  setUndoEnabled(undo.length > 0)
  setRedoEnabled(redo.length > 0)
}


  const addDropSHadow  = (obj) =>{
      // Create shadow object
      var shadow = new fabric.Shadow({
        color: obj.stroke,
        blur: 30
    });

    obj.set('shadow', { blur: 15, offsetX: 0, offsetY: 0});
  }


  const textElementSelected = (text) =>{
   
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

   setSelectedCanvasObject(obj)
}

  const imageElementSelected = (img) =>{
     
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
       return 
    }

    addUndoRedoListener(editor)

    editor.canvas.on('selection:cleared', function() {  
      console.log("selection cleared");
      nullElementSelected()
    });

    editor.canvas.on('mouse:wheel', function(opt) {
      var delta = opt.e.deltaY;
      var zoom = editor.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      editor.canvas.setZoom(zoom);
      setZoomValue(zoom.toFixed(2));
      opt.e.preventDefault();
      opt.e.stopPropagation();
    })

    document.body.addEventListener('keyup',function(opt) {
      let command = getKeyboardCommand(opt);
      if(command.command !== "unused"){
        setToolbarCommands([...toolbarCommands,command])
      }
    })

    document.body.addEventListener('copy',function(opt) {
      console.log("copySelected", opt)
      editor.canvas.getActiveObject().clone(function(cloned) {
        if(cloned){
          console.log("cloning...", cloned)
          // setCopyObject(cloned)
          copyObject = cloned;
        }

      });
      // console.log("copySelected", activeObject)
      // if(activeObject){
      //   console.log("copying...", activeObject)
      //   setCopyObject(activeObject)
      // }
    })
    document.body.addEventListener('paste',function(opt) {
      console.log("paste selected")
      console.log("pasteSelected", opt)
      copyObject.clone(function(clonedObj) {
        editor.canvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = editor.canvas;
          clonedObj.forEachObject(function(obj) {
            editor.canvas.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          editor.canvas.add(clonedObj);
        }
        copyObject.top += 10;
        copyObject.left += 10;
        editor.canvas.setActiveObject(clonedObj);
        editor.canvas.requestRenderAll();
      });
    })


    
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
            case "setBackgroundColor":
              setBackgroundColor(ele.params);
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
            case "objectProperty":
              objectProperty(ele.params);
            break;
            case "saveToJSON":
              toJSON();
            break;
            case "saveToSVG":
              toSVG();
            break;
            case "saveToPNG":
              toPNG();
            break;
            case "undo":
              performUndo();
            break;
            case "redo":
              performRedo();
            break;
            case "sendToBack":
              sendSelectedObjectBackwards();
            break;
            case "sendToFront":
              bringSelectedObjectToForward();
            break;
            case "resizeCanvas":
              resizeCanvas(ele.params);
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
    let src = image.content ? image.content : image.src;
    fabric.Image.fromURL( src, (img) => {
        editor.canvas.add(img);
        img.on('selected', function() {  imageElementSelected(img); }); 
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
    editor.canvas.add(text);

  };


const addBackground = (image) => {
  console.log("adding background ",image);
  let src = image.content ? image.content : image.src;


  fabric.Image.fromURL(src, function (img) {   
    editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas), {
      scaleX: editor.canvas.width / img.width,
      scaleY: editor.canvas.height / img.height
    });
  }, {crossOrigin: 'anonymous'}
  );

};


const setBackgroundColor = (color) => {
  console.log("setting background color  ",color);

  editor.canvas.setBackgroundImage(null, editor.canvas.renderAll.bind(editor.canvas));

    editor.canvas.backgroundColor=color;
    editor.canvas.renderAll();

  
}


function textProperty(param){
  let text = editor.canvas.getActiveObject()
  console.log("text object?",text);
  if (isText(text)){
    console.log("setting text property", param)
    text.set(param.key,param.value);
    editor.canvas.renderAll();
  }
 }

 function textFontWieght(val){
  let text = editor.canvas.getActiveObject()
  console.log("text object?",text);
  if (isText(text)){
    text.set('fontWeight',"bold");
    editor.canvas.renderAll();
  }
 }


function changeTextAlignment( val){
  let text = editor.canvas.getActiveObject()
  console.log("text object?",text);
  if (isText(text)){
    text.set('textAlign',val);
    editor.canvas.renderAll();
  }
 }

 function objectProperty(param){
  let object = editor.canvas.getActiveObject()
  if(!object)return

  console.log("setting text property", param)
  object.set(param.key,param.value);
  editor.canvas.renderAll();
  
 }

function sendSelectedObjectBack(param){
  var activeObjects = editor.canvas.getActiveObjects();
  if(!activeObjects)return
  activeObjects.forEach (function(object) {
    editor.canvas.sendToBack(object);
    editor.canvas.renderAll();
  })
}

function sendSelectedObjectToFront(param) {
  var activeObjects = editor.canvas.getActiveObjects();
  if(!activeObjects)return
  activeObjects.forEach (function(object) {
    console.log("sending to front")
    editor.canvas.bringToFront(object);
    editor.canvas.renderAll();
  })
}

function sendSelectedObjectBackwards(param){
  var activeObjects = editor.canvas.getActiveObjects();
  if(!activeObjects)return
  console.log("sending backwards")
  activeObjects.forEach (function(object) {
    editor.canvas.sendBackwards(object, true);
    editor.canvas.renderAll();
  })
}

function bringSelectedObjectToForward(param) {
  var activeObjects = editor.canvas.getActiveObjects();
  if(!activeObjects)return
  console.log("bringing forward")
  activeObjects.forEach (function(object) {
    editor.canvas.bringForward(object,true);
    editor.canvas.renderAll();
  })
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

  const loadFromJSON=(json)=>{
    editor.canvas.loadFromJSON(json, function() {
    editor.canvas.renderAll(); 
    },function(o,object){
        console.log(o,object)
    })

  }

  const toSVG = () => {
    const svg = editor.canvas.toSVG();
    console.log(svg);
    setData(svg);
    setSaveTitle("SVG:")
    setSavedSVGData(svg);
    setOpenSaveContent(true)
  };
  const toJSON = () => {
    const json = editor.canvas.toJSON();
    const data = JSON.stringify(json);
    console.log("JSONData",data);
    setData(data);
    setSavedJSONData(data);
    setSaveTitle("JSON:")
    setOpenSaveContent(true)
  };

  const toPNG = () => {
    // var png = editor.canvas.toPNG();
    // saveFile( "tde.png",png);
    // downloadImage()
    let canvas = editor.canvas;

    const dataURL = canvas.toDataURL({
      width: canvas.width,
      height: canvas.height,
      left: 0,
      top: 0,
      format: 'png',
    });
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


    canvas.getElement().toBlob(function(blob) {
      // saveAs(blob, "canvas.png");
      console.log("blob to export", blob)
      saveFile(blob, "tde.png")
    });

  }

  const saveFile = async (blob, filename) => {
    console.log("saving png", filename);
    const fileHandle = await window.showSaveFilePicker();
    const fileStream = await fileHandle.createWritable();

    var stream = editor.canvas.createPNGStream();
    stream.on('data', function(chunk) {
    fileStream.write(chunk);
});

  };

  const downloadImage = () => {
    const ext = "png";
    const base64 = editor.canvas.toDataURL({
      format: ext,
      enableRetinaScaling: true
    });
    const link = document.createElement("a");
    link.href = base64;
    link.download = `eraser_example.${ext}`;
    link.click();
  };


  const handleSaveClose = () => {
    
    setOpenSaveContent(! openSaveContent)
  }


  return (
    <div className="AppCanvas"  
    // style={{
    //     position: 'absolute', left: '50%', top: '50%',
    //     transform: 'translate(-50%, -50%)'
    // }}

    style={{
      display: "flex",
      flexFlow: "row" ,
      justifySelf: "center",
      alignSelf: "center",
      minWidth:400
    }}

    >
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      {/* <pre>{data}</pre> */}
        <SaveDialog open={openSaveContent} title={saveTitle} data={data} handleClose={handleSaveClose}/>
    </div>
  );
}