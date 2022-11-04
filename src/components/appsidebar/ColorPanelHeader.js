import React from "react";
import { SketchPicker, CompactPicker } from 'react-color';



export default function ColorPanelHeader(props) {
  const [color,setColor] = React.useState("black");


  const colorSelect = (color) => {
    setColor(color);
    props?.onColorChange(color)
  };

  return (
    <div>
      <CompactPicker  color={color } onChangeComplete={ (c)=>colorSelect(c.hex)} />

    </div>
  );
}