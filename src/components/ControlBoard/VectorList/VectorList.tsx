import React from 'react';
import _ from 'lodash';

import { StyledVectorList, ListHeader, ListItem } from './VectorList.styles';

type Props = {
  vectors: THREE.Object3D[];
  onSelectVector: any;
};

const VectorList = ({ vectors, onSelectVector }: Props) => {
  return (
    <StyledVectorList>
      <ListHeader>Vectors</ListHeader>
      {_.map(vectors, (_vector, id) => (
        <ListItem key={id} onClick={() => onSelectVector(id)}>
          Vector {id + 1}
        </ListItem>
      ))}
    </StyledVectorList>
  );
};

export default VectorList;
