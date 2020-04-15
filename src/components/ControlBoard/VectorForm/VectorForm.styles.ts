import styled, { css } from 'styled-components';

export const StyledVectorForm = styled.div`
  border-top: 0.1rem solid #424949;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormHeader = styled.div`
  padding: 0.5rem;
  font-weight: 600;
`;

export const FormField = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: repeat(2, 1fr);
  padding: 0 0.5rem;
  margin: 0.25rem 0;
  align-items: center;
  height: 3.2rem;
`;

export const FieldLabel = styled.label`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  text-transform: uppercase;
  margin-right: 0.5rem;
`;

export const FieldError = styled.label`
  color: #e74c3c;
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  font-size: 0.9rem;
  align-self: end;
  text-align: right;
`;

export const FieldInput = styled.input`
  grid-column: 2 / -1;
  grid-row: 1 / 2;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-radius: 0.2rem;
  margin: 0.25rem 0;
  padding-left: 0.25rem;
`;

export const FormButton = styled.button<{ disabled: boolean }>`
  cursor: pointer;
  border: none;
  border-radius: 0.2rem;
  height: 2rem;
  margin: 0.5rem;
  color: white;
  outline: none;
  background: #008080;
  opacity: 0.9;
  transition: all 0.2s;

  :hover {
    opacity: 1;
  }

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.2;
    `}
`;
