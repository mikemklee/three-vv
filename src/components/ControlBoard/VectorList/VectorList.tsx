import React from 'react';
import _ from 'lodash';

import { StyledVectorList, ListHeader } from './VectorList.styles';

type Props = {
  vectors: THREE.Object3D[];
  onSelectVector: any;
};

const VectorList = ({ vectors, onSelectVector }: Props) => {
  return (
    <StyledVectorList>
      <ListHeader>Vectors</ListHeader>
      {_.map(vectors, (_vector, id) => (
        <div key={id} onClick={() => onSelectVector(id)}>
          Vector {id + 1}
        </div>
      ))}
    </StyledVectorList>
  );
};

export default VectorList;
