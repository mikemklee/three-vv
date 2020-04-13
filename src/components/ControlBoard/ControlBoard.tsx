import React, { useState } from 'react';

import { StyledControlBoard } from './ControlBoard.styles';

import VectorList from './VectorList/VectorList';
import VectorForm from './VectorForm/VectorForm';

type Props = {
  vectors: THREE.Object3D[];
  onSave: (idx: number | null, coords: SelectedVector['coords']) => void;
};

export type SelectedVector = {
  idx: number;
  coords: { x: number; y: number; z: number };
};

const ControlBoard = ({ vectors, onSave }: Props) => {
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

  const handleSave = (coords: SelectedVector['coords']) => {
    const idx = selectedVector ? selectedVector.idx : null;
    onSave(idx, coords);
  };

  return (
    <StyledControlBoard>
      <VectorList vectors={vectors} onSelectVector={handleSelectVector} />
      <VectorForm selectedVector={selectedVector} onSave={handleSave} />
    </StyledControlBoard>
  );
};

export default ControlBoard;
