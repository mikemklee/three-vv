import styled from 'styled-components';

export const StyledVectorForm = styled.div`
  border-top: 0.1rem solid #424949;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormHeader = styled.div`
  padding: 0.5rem;
`;

export const FormField = styled.div`
  display: flex;
  padding: 0 0.5rem;
  margin: 0.25rem 0;
  height: 2rem;
  align-items: center;
`;

export const FieldLabel = styled.label`
  text-transform: uppercase;
  margin-right: 0.5rem;
`;

export const FieldInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-radius: 0.2rem;
  margin: 0.25rem 0;
  padding-left: 0.25rem;
`;

export const FormButton = styled.button`
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
`;
