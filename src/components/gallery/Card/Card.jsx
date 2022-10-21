import React from 'react';
import CardImage from './CardImage';
import CardInfo from './CardInfo';

import loadingSvg from '../../../images/loading.svg';
import CardCommentsContainer from './CardComments/CardCommentsContainer';

const Card = ({
  cardInfo,
  cardUserInfo,
  fileInfo,
  cardTags,
  isLoading,
  cardDelete,
  setIsComments,
  isComments,
}) => {
  let loadingCard = <></>;

  if (isLoading || cardDelete) {
    loadingCard = (
      <div className="cv-loading fja">
        <img src={loadingSvg} alt="Loading" className="cv-loading-svg br100" />
      </div>
    );
  }
  let currentMode = <></>;
  if (isComments) {
    currentMode = <CardCommentsContainer setIsComments={setIsComments} />;
  } else {
    currentMode = (
      <CardInfo
        cardInfo={cardInfo}
        cardUserInfo={cardUserInfo}
        cardTags={cardTags}
        setIsComments={setIsComments}
      />
    );
  }

  console.log("card file info",fileInfo)
  return (
    <section className="card fja">

        <div style={{background:"#fff",  margin: '10px 0',  borderRadius: '10px'}} >
          {loadingCard}
          <CardImage fileInfo={fileInfo} />
          {currentMode}
        </div>        

    </section>
  );
};

export default Card;
