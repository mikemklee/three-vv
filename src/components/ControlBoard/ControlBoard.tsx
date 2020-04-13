import React from 'react';

import { StyledControlBoard } from './ControlBoard.styles';

// import Button from '../Button/Button';

// import Images from '../../assets/images';

type Props = {
  vectors: {
    [id: string]: THREE.Object3D;
  };
};

const ControlBoard = (props: Props) => {
  console.log(props);
  return (
    <StyledControlBoard>
      <div>Vector lists</div>
      <div>Selected vector</div>
    </StyledControlBoard>
  );
};

export default ControlBoard;
