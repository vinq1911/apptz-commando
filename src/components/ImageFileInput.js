import React, { useContext } from 'react';
import StateContext from '../StateMachine';



const ImageFileInput = (props) => {

  const context = useContext(StateContext);
  const imageUpload = (e) => {
    var formData = new FormData();
    Object.keys(e.target.files).map(fkey => {
      formData.append(fkey, e.target.files[fkey]);
    });
    formData.append('imageTarget', props.imageTarget);
    formData.append('imageType', props.imageType);
    context.rootcb('sendFile', formData);
  }

  return (
    <div className="col s12 file-field input-field">
      <span>{props.children}</span>
      <input onChange={imageUpload} name={props.imageName} type="file" />
    </div>
  );
}

export default ImageFileInput;
