import React from 'react';
import _ from 'lodash';

import { StyledVectorList, ListHeader, ListItem } from './VectorList.styles';
import { SelectedVector } from '../ControlBoard';

type Props = {
  vectors: THREE.Object3D[];
  selectedVector: SelectedVector | null;
  onSelectVector: (idx: number) => void;
};

const VectorList = ({ vectors, selectedVector, onSelectVector }: Props) => {
  return (
    <StyledVectorList>
      <ListHeader>Vectors</ListHeader>
      {_.map(vectors, (_vector, id) => (
        <ListItem
          key={id}
          isCurrent={selectedVector ? selectedVector.idx === id : false}
          onClick={() => onSelectVector(id)}
        >
          Vector {id + 1}
        </ListItem>
      ))}
    </StyledVectorList>
  );
};

export default VectorList;
