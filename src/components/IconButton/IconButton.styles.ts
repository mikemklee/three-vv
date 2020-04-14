import styled from 'styled-components';

import { ListItem } from './../ControlBoard/VectorList/VectorList.styles';

export const StyledIconButton = styled.img`
  width: 1.2rem;
  margin-left: auto;
  user-select: none;
  filter: invert(1);
  opacity: 0.2;
  transition: all 0.2s;

  ${ListItem}:hover & {
    opacity: 1;
  }
`;
