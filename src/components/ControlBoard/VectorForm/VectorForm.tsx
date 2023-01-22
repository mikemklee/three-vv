import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import {
  StyledVectorForm,
  FormHeader,
  FormField,
  FieldLabel,
  FieldError,
  FieldInput,
  FormButton,
} from './VectorForm.styles';

import { SelectedVector } from '../ControlBoard';

// type definitions
type Axes = 'x' | 'y' | 'z';

type Props = {
  selectedVector: SelectedVector | null;
  onSave: Function;
};

// component
const VectorForm = ({ selectedVector, onSave }: Props) => {
  const [values, setValues] = useState({ x: 1, y: 1, z: 1 });
  const [errors, setErrors] = useState({ x: null, y: null, z: null });

  const handleChange = (e: any, axis: Axes) => {
    e.persist()

    // validate input
    if (isNaN(e.target.value)) {
      setErrors((errors) => ({ ...errors, [axis]: 'Please enter a valid number' }));
    } else {
      setValues((values) => ({ ...values, [axis]: e.target.value }));
      setErrors((errors) => ({ ...errors, [axis]: null }));
    }

  };

  const handleSubmit = () => {
    onSave(values);
  }

  // set input values on vector selection
  useEffect(() => {
    if (selectedVector) {
      setValues({ x: selectedVector.coords.x, y: selectedVector.coords.y, z: selectedVector.coords.z})
    } else {
      setValues({ x: 1, y: 1, z: 1 });
    }
  }, [selectedVector, setValues]);

  return (
    <StyledVectorForm>
      <FormHeader>
        Add new vector
      </FormHeader>
      {_.map(['x', 'y', 'z'] as Axes[], (axis) => {
        return (
          <FormField key={axis}>
            <FieldLabel>{axis}</FieldLabel>
            <FieldInput
              name={axis}
              value={values[axis]}
              onChange={(e) => handleChange(e, axis)}
            />
            {errors[axis] && <FieldError>{errors[axis]}</FieldError>}
          </FormField>
        );
      })}
      <FormButton
        type='submit'
        disabled={_.some(errors, item => item !== null)}
        onClick={handleSubmit}
      >
        {selectedVector ? 'Update' : 'Draw'}
      </FormButton>
    </StyledVectorForm>
  );
};

export default VectorForm;
