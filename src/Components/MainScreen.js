import React from "react";
import '../styles/MainScreen.css';
import {useDispatch, useSelector} from "react-redux";
import {addImages} from "../actions";
import {ADD_IMAGES} from "../actions/types";

export const MainScreen = () => {
  let images = useSelector(state => state.images.images)
  const currentCategory = useSelector(state => state.categories.currentCategory);
  const dispatch = useDispatch();

  const renderImages = (id) => {
    addImages(id).then(images =>{dispatch({type: ADD_IMAGES, payload: images.payload})});
  }
 return(
   <div className='mainScreen'>
     <h1 className='mainHeader'>Images</h1>
     <div className='imageContainer'>
       {images.map(image => {
         return <img key={image.id} className='image' src={image.url} />
       })}
     </div>
     <p className='addMore' onClick={() => renderImages(currentCategory)}>Add more</p>
   </div>
 )
}