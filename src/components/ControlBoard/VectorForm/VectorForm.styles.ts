import styled from 'styled-components';

export const StyledVectorForm = styled.div`
  border-top: 0.1rem solid grey;
  padding: 0.5rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.5rem;
`;

export const FormHeader = styled.div`
  grid-column: span 3;
  grid-row: 1 /2;
`;

export const FormInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  grid-row: 2 / 3;
`;

export const FormButton = styled.button`
  grid-column: span 3;
  grid-row: 3 / 4;
`;
