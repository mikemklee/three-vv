import React from 'react';

import { StyledIconButton } from './IconButton.styles';

type Props = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  imgSrc: string;
};

const IconButton = ({ onClick, imgSrc }: Props) => {
  return <StyledIconButton onClick={onClick} src={imgSrc} />;
};

export default IconButton;
