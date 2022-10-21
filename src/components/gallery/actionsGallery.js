import {
  GLR_CARD_LOAD,
  GLR_GET_CARDS,
  GLR_CARD_NEWLOAD,
  GLR_SEARCH_SET,
} from './galleryReducer';

//import firebase from 'firebase/compat/app';
// import 'firebase/firestore';
// import 'firebase/storage';
import {auth, fb} from '../../config/firebase'
import {firebasedb}  from '../../config/firebase'

// import { collection, query, where, getDocs } from "firebase/firestore";
import { collection, query, where, getDocs, orderBy, limit, startAfter } from "firebase/firestore";



export const postToCard = (post, id) => {

  return {
    infoDate: post.creationDate,
    uid: post.user,
    infoPhotoURL:post.profileUrl,
    infoUserPhotoURL: post.profileImageUrl,
    infoUsername:post.username,
    infoTitle: post.caption,
    infoDescription: post.caption,
    fileURL: post.imageUrl,
    id: id,
    height: post.imageHeight,
    width: post.imageWidth,
  }

}


export const getGalleryCards = (currentCards, lastKey = '', uid=null) => {
  return async (dispatch) => {
    dispatch({
      type: GLR_CARD_LOAD,
    });

    let cards = [];
    let newLastKey = lastKey;
    let endLoadData = false;

    console.log("getting gallery cards: ", currentCards);
    console.log("getting gallery lastkey: ", lastKey);


    console.log("UID getting cards", uid)
    console.log("auth getting cards", auth)

    const uidstr = (uid==null) ? "uid is null" : "uid is not null";

    console.log(uidstr);

    const postsRef = collection(firebasedb, "posts");
    const q = (uid==null) ? query(postsRef,
              orderBy("creationDate",'desc'),
              startAfter(lastKey),
              limit(6))

            : query(postsRef, where("user", "==", uid),
              orderBy("creationDate",'desc'),
              startAfter(lastKey),
              limit(6));

    const data = await getDocs(q);

    console.log("docs posts",data);

    data.forEach((doc) => {
      console.log("card related Post", doc.data());
      console.log("card related date", doc.data().creationDate);
      cards.push(postToCard(doc.data(),doc.id));

      console.log("cards: ", cards);
      newLastKey = doc.data().creationDate;
    });
    
    if (cards.length === 0) {
      endLoadData = true;
    } else {
      endLoadData = false;
    }
    dispatch({
      type: GLR_GET_CARDS,
      payload: {
        cards,
        currentCards,
        lastKey: newLastKey,
        endLoadData,
      },
    });
  };
};



export const getSearchedCards = (currentCards, searchedCards, lastKey = '') => {
  return async (dispatch) => {
    dispatch({
      type: GLR_CARD_LOAD,
    });
    let cards = [];
    let lastKeyChecker = lastKey === '' ? 0 : lastKey;

    let lastId = lastKeyChecker;
    const endIndex = lastKeyChecker + 4;
    let endLoadData = false;

    for (let index = lastKeyChecker; index < endIndex; index++) {
      if (searchedCards[index] === undefined) {
        endLoadData = true;
        break;
      }
      const cardsData = await fb
        .firestore()
        .collection('posts')
        .where('caption', '==', searchedCards[index])
        .get();

      cards.push(cardsData.docs[0].data());
      lastId = index;
    }
    dispatch({
      type: GLR_GET_CARDS,
      payload: {
        currentCards,
        cards,
        lastKey: lastId + 1,
        endLoadData,
      },
    });
  };
};

export const updateGalleryCards = () => ({
  type: GLR_CARD_NEWLOAD,
});

export const setIsSearch = (isSearch) => ({
  type: GLR_SEARCH_SET,
  payload: { isSearch },
});

export const setLoading = (isLoad) => ({
  type: GLR_CARD_LOAD,
  payload: { isLoad },
});
