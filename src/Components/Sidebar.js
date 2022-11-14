import React, {useEffect} from "react";
import '../styles/Sidebar.css';
import {fetchCategories, fetchImages, setCategory} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {FETCH_IMAGES} from "../actions/types";

export const Sidebar = () => {
  const categories = useSelector((state) => state.categories.categories);
  const currentCategory = useSelector(state => state.categories.currentCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCategories().then(categories => {
      dispatch({type: 'FETCH_CATEGORIES', payload: categories.payload})
    });
  },[]);

  const renderImages = (id) => {
    dispatch(setCategory(id));
    fetchImages(currentCategory).then(images =>{dispatch({type: FETCH_IMAGES, payload: images.payload})});
  }

  return (
    <div className='sidebar'>
      <p className='sideHeader'>Please select category</p>
      {categories?.map(item => {
       return <Link to={item.name} key={item.id} className='category' onClick={() => renderImages(item.id)} >{item.name}</Link>
      })}
    </div>
  )

}