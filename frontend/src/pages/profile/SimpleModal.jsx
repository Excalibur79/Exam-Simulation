import React, { useState, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import getCroppedImg from './CropImage';
import styled from 'styled-components';
import './SimpleModal.css';

//import 'react-image-crop-component/style.css';

export default function SimpleModal(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [croppedArea, setcroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setcroppedArea(croppedAreaPixels);
  }, []);

  const cropSize = { height: props.height, width: props.width };

  const Reset = () => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  const Save = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(props.fileselect, croppedArea, rotation);
      console.log('donee', croppedImage);
      props.setfileselect(croppedImage);
      props.setimageCropped(true);
      props.setTest(false);
    } catch (e) {
      console.error(e);
    }
    setShow(false);
  }, [croppedArea, rotation]);

  const body = (
    <div>
      <Cropper
        image={props.fileselect}
        crop={crop}
        zoom={zoom}
        aspect={3 / 4}
        rotation={rotation}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onRotationChange={setRotation}
        onZoomChange={setZoom}
        cropSize={cropSize}
      />
    </div>
  );

  return (
    <div>
      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Body className='modalbody'>{body}</Modal.Body>
        <Modal.Footer style={{ position: 'absolute', marginRight: '2vw', marginTop: '-18vh' }}>
          <div className='zoom' style={{ position: 'absolute', marginRight: '2vw', marginTop: '-8vh', marginLeft: '20vw' }}>
            <p style={{ fontSize: '20px' }}>Zoom</p>
            <Slider
              className='zoomslider'
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby='Zoom'
              onChange={(e, zoom) => setZoom(zoom)}
              classes={{ root: 'slider' }}
              style={{ width: '20vw' }}
            />
          </div>
          <div className='rotate' style={{ position: 'absolute', marginTop: '-8vh', marginRight: '2vw', marginLeft: '60vw' }}>
            <p style={{ fontSize: '20px' }}>Rotate</p>
            <Slider
              className='rotateslider'
              value={rotation}
              min={-180}
              max={180}
              step={1}
              aria-labelledby='Zoom'
              onChange={(e, rotation) => setRotation(rotation)}
              classes={{ root: 'slider' }}
              style={{ width: '20vw' }}
            />
          </div>
          <div style={{ position: 'absolute', marginTop: '5vh', marginRight: '2vw', marginLeft: '40vw' }}>
            <Button onClick={Save}>Save</Button>
            <Button onClick={handleClose} style={{ marginRight: '2vw' }}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const Button = styled.button`
  width: 10vw;
  height: 5.63vh;
  // left: 33.82vw;
  // top: 47.18vh;
  border: none;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 19px;
  line-height: 3.5vh;
  text-align: center;
  margin-bottom: 2.43vh;

  color: #ffffff;

  background: #5db0d8;
  border-radius: 16px;
  // margin-left: -18.5vw;
`;
