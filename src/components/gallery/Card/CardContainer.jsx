import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCardInfo } from './CardActions/actionsCard';
import NotFound from '../../NotFound';
import Card from './Card';
import './card.scss';
import {firebasedb} from '../../../config/firebase';
function CardContainer(props) {
  const [isComments, setIsComments] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
     props.getCardInfo(window.location.pathname.substring(6));
  }, []);

  if (props.cardInfo.id === undefined) {
    return <NotFound />;
  }

  const cardTags = props.cardInfo.infoTags.map((tag, index) => {
    return (
      <div
        className={`tag-container-standard tag-container fa br25`}
        key={index}
      >
        <p className={`tag-text tag-text-standard fW500`}>{tag}</p>
      </div>
    );
  });

  return (
    <>
      <Card
        cardInfo={props.cardInfo}
        cardUserInfo={props.cardUserInfo}
        fileInfo={props.fileInfo}
        cardTags={cardTags}
        isLoading={props.isLoading}
        cardDelete={props.cardDelete}
        setIsComments={setIsComments}
        isComments={isComments}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cardInfo: state.cardReducer.cardInfo,
    cardUserInfo: state.cardReducer.userInfo,
    fileInfo: state.cardReducer.fileInfo,
    isLoading: state.cardReducer.isLoadingCard,
    cardDelete: state.cardReducer.deleteProcess,
    cards: state.galleryReducer.cards,
  };
};

const mapDispatchToProps = {
  getCardInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
