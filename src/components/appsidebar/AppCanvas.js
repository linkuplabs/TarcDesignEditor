import React,{ useState, createContext , useContext} from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import {DesignEditorContext } from '../../contexts/DesignEditorContext';

import "./AppCanvas.css";

export default function AppCanvas() {
  const { editor, onReady } = useFabricJSEditor();
  const [data, setData] = React.useState("");


  const {
    toolbarCommands, 
    setToolbarCommands,
  } = useContext(DesignEditorContext);


  
  React.useEffect(() => {
    if(toolbarCommands.length > 0){
      console.log("effect handling new commands",toolbarCommands)
      toolbarCommands.forEach((ele, ind) => {
        switch(ele.command){
          case "addText":
            addTextElement();
            break;
            case "addImage":
            addSticker(ele.params);
            break;
            case "addBackground":
            addBackground(ele.params);
            break;
            default:
              break;
        }
      });
      setToolbarCommands([]);
    }
  });

  const addSticker = (img) => {
    console.log("adding sticker ",img);
    fabric.Image.fromURL( img.src, (img) => {
        editor.canvas.add(img);
      }
    );
  };

  const addTextElement = () => {
    let newID = (new Date()).getTime().toString().substr(5);
    let text = new fabric.IText('text', {
        left: 100,
        top: 100,
        objecttype: 'text',
        fontFamily: 'helvetica neue',
        fill: '#000',
        stroke: '#fff',
        strokeWidth: .1,
        fontSize: 45
    });

    editor.canvas.add(text);
  };


const addBackground = (src) => {
  console.log("adding background ",src);
     fabric.Image.fromURL(src, (img) => {
        // add background image
        editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas), {
           scaleX: editor.canvas.width / img.width,
           scaleY: editor.canvas.height / img.height
        });
     });

};

  const onAddCircle = () => {
    editor.addCircle();
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };
  const onAddImage = () => {
    fabric.Image.fromURL(
      "https://www.neopoly.de/stylesheets/logo.jpg",
      (img) => {
        editor.canvas.add(img);
      }
    );
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
      <h1>FabricJS React Sample</h1>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <button onClick={onAddImage}>Add Image</button>
      <button onClick={toSVG}>toSVG</button>
      <button onClick={toJSON}>toJSON</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      <pre>{data}</pre>
    </div>
  );
}
