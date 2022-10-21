// import React, { useEffect, useState } from "react";
import random from "lodash/random";
import "./FixedGallery.css";
import Masonry from "react-masonry-component";


export default function ImagesGallery(props) {

  const handleClick = (e) => {
    console.log("handleClicke", e);
    console.log("handleClick", e.target);
    if(e.target.alt !== undefined){
      const index = e.target.alt.valueOf();
      props.onClick(props.images, index);
      console.log("indexed image", props.images[index]);
    }else{
      console.log("undefined alt")
    }
  }

  let color = "#fff";
  //let color="#00abc0"

  return (
    <div   style={{ backgroundColor: color}} >

        <Masonry className="gallery" elementType={"ul"}>
          {props.images.map((image, i) => {
            let height = props.cellHeight; 

            return (
              <li
                key={i}
                className="imgContainer"
                style={{ width:props.cellWidth, height: height }}
                onClick={handleClick}
              >
                <img src={image.src} alt= {image.id} />
              </li>
            );
          })}
        </Masonry>
    </div>
  );
}
