import styled from 'styled-components';

export const StyledVectorList = styled.div`
  padding: 0.5rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ListHeader = styled.div`
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  font-weight: 600;
`;

export const ListItem = styled.div`
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s;

  :hover {
    background: #424949;
  }
`;
