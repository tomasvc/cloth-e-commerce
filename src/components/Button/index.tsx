import React from 'react'
import { StyledButton } from './styles'

export const Button: React.FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => {
  return (
    <StyledButton className="button" onClick={onClick}>
        {title}
    </StyledButton>
  )
}
