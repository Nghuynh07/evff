import React from 'react';

const ShowImage = ({ photo, imageStyle }) => {
  let url = `http://localhost:4000/public`;
  return <img className={imageStyle} src={`${url}/${photo}`} alt={photo} />;
};

export default ShowImage;
