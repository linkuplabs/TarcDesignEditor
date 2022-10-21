import React from 'react';
import './gallery.scss';

import Masonry from 'react-masonry-component';

export const makeCard = (date, uid, userPhotoUrl, username, title, description, imageUrl, id, height, width) => {

  return {
    infoDate: date,
    uid: uid,
    infoPhotoURL:userPhotoUrl,
    infoUserPhotoURL: userPhotoUrl,
    infoUsername:username,
    infoTitle: title,
    infoDescription: description,
    fileURL: imageUrl,
    id: id,
    height: height,
    width: width,
  }

}

function Gallery({ allCards, checker }) {
  const masonryOptions = {
    transitionDuration: '0.25s',
    fitWidth: true,
  };

  return (
    <section className="g">
      <Masonry
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        className="cards-container"
      >
        {allCards}
      </Masonry>
      {checker()}
    </section>
  );
}

export default Gallery;
