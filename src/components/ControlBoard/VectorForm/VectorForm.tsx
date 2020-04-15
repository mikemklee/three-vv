import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

// form validation
const validationSchema = Yup.object({
  x: Yup.number().required('Required').typeError('Enter a valid number'),
  y: Yup.number().required('Required').typeError('Enter a valid number'),
  z: Yup.number().required('Required').typeError('Enter a valid number'),
});

// type definitions
type Axes = 'x' | 'y' | 'z';

type Props = {
  selectedVector: SelectedVector | null;
  onSave: Function;
};

// component
const VectorForm = ({ selectedVector, onSave }: Props) => {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      x: 1,
      y: 1,
      z: 1,
    },
    validationSchema,
    onSubmit: (values) => onSave(values),
  });

  // set input values on vector selection
  useEffect(() => {
    if (selectedVector) {
      setFieldValue('x', selectedVector.coords.x);
      setFieldValue('y', selectedVector.coords.y);
      setFieldValue('z', selectedVector.coords.z);
    } else {
      setFieldValue('x', 1);
      setFieldValue('y', 1);
      setFieldValue('z', 1);
    }
  }, [selectedVector, setFieldValue]);

  return (
    <StyledVectorForm>
      <FormHeader>
        {selectedVector ? `Edit vector` : 'Add new vector'}
      </FormHeader>
      {_.map(['x', 'y', 'z'] as Axes[], (axis) => {
        return (
          <FormField key={axis}>
            <FieldLabel>{axis}</FieldLabel>
            <FieldInput
              name={axis}
              value={values[axis]}
              onChange={handleChange}
            />
            {errors[axis] && <FieldError>{errors[axis]}</FieldError>}
          </FormField>
        );
      })}
      <FormButton
        type='submit'
        disabled={!_.isEmpty(errors)}
        onClick={() => handleSubmit()}
      >
        {selectedVector ? 'Update' : 'Draw'}
      </FormButton>
    </StyledVectorForm>
  );
};

export default VectorForm;
