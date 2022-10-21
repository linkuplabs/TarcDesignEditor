import React, { useEffect, useState } from 'react';
import CardActions from './CardActions';

import { connect } from 'react-redux';
import {
  deleteCard,
  getCardIsLiked,
  setCardLike,
} from './actionsCard';
import { useHistory } from 'react-router';

function CardActionsContainer(props) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (props.auth.uid !== '' && props.cardInfo.id !== '') {
      props.getCardIsLiked(props.cardInfo, props.auth.uid);
    }
  }, [props.cardInfo, props.auth.uid]);

  function confirmDelete() {
    setIsOpenDelete(!isOpenDelete);
  }

  function deleteCardCheck() {
    props.deleteCard(props.cardInfo.id, props.auth.uid, history);
  }

  function setLike(card, uid) {
    if (props.likeBlock === false) {
      props.setCardLike(card, uid);
    }
  }

  return (
    <CardActions
      cardInfo={props.cardInfo}
      setLike={setLike}
      userInfo={props.auth}
      cardUserInfo={props.cardUserInfo}
      confirmDelete={confirmDelete}
      isOpenDelete={isOpenDelete}
      deleteCardCheck={deleteCardCheck}
      setIsComments={props.setIsComments}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
    auth:state.firebase.auth,
    cardInfo: state.cardReducer.cardInfo,
    cardUserInfo: state.cardReducer.userInfo,
    likeBlock: state.cardReducer.likeBlock,
  };
};

const mapDispatchToProps = {
  getCardIsLiked,
  setCardLike,
  deleteCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardActionsContainer);
