import React, { useContext } from 'react';
import Masonry from 'react-masonry-component';

const Maso = (props) => {
  const masonryOptions = {
  };
  const imagesLoadedOptions = {
  };
  return (
    <Masonry
        className={''} // default ''
        elementType={'div'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        imagesLoadedOptions={imagesLoadedOptions} // default {}
    >
      {props.children}
    </ Masonry>
  );
}

export default Maso;
