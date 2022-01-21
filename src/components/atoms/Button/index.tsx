import React from 'react'

interface ButtonProps {
  title: string
}

const Button = ({ title }: ButtonProps) => {
  const showTitle = title || 'Title'
  return (<div>{showTitle}</div>)
}

export default Button
