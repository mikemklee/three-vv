import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import {
  StyledVectorForm,
  FormHeader,
  FormInput,
  FormButton,
} from './VectorForm.styles';

import { SelectedVector } from '../ControlBoard';

type Axes = 'x' | 'y' | 'z';

type Props = {
  selectedVector: SelectedVector | null;
};

const VectorForm = ({ selectedVector }: Props) => {
  const [currentCoords, setCoords] = useState({ x: 1, y: 1, z: 1 });

  useEffect(() => {
    if (selectedVector) {
      setCoords({ ...selectedVector.coords });
    } else {
      setCoords({ x: 1, y: 1, z: 1 });
    }
  }, [selectedVector]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    axis: string
  ) => {
    setCoords({
      ...currentCoords,
      [axis]: e.target.value,
    });
  };

  return (
    <StyledVectorForm>
      <FormHeader>
        {selectedVector ? `Vector ${selectedVector.idx + 1}` : 'Add new vector'}
      </FormHeader>
      {_.map(['x', 'y', 'z'] as Axes[], (axis) => {
        return (
          <FormInput
            key={axis}
            type='text'
            value={currentCoords[axis]}
            onChange={(e) => handleChange(e, axis)}
          />
        );
      })}
      <FormButton>{selectedVector ? 'Update' : 'Draw'}</FormButton>
    </StyledVectorForm>
  );
};

export default VectorForm;
