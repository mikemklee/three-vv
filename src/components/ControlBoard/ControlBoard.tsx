import React, { useState } from 'react';

import { StyledControlBoard } from './ControlBoard.styles';

import VectorList from './VectorList/VectorList';
import VectorForm from './VectorForm/VectorForm';

type Props = {
  vectors: THREE.Object3D[];
};

export type SelectedVector = {
  idx: number;
  coords: { x: number; y: number; z: number };
};

const ControlBoard = ({ vectors }: Props) => {
  const [selectedVector, setSelectedVector] = useState<SelectedVector | null>(
    null
  );

  const handleSelectVector = (idx: number) => {
    if (selectedVector && selectedVector.idx === idx) {
      // de-select this item
      setSelectedVector(null);
    } else {
      // select this item
      const foundVector = vectors[idx];
      setSelectedVector({ idx, coords: { ...foundVector.userData.target } });
    }
  };

  return (
    <StyledControlBoard>
      <VectorList vectors={vectors} onSelectVector={handleSelectVector} />
      <VectorForm selectedVector={selectedVector} />
    </StyledControlBoard>
  );
};

export default ControlBoard;
