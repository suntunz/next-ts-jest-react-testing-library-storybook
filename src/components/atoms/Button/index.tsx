import React from 'react'
import styles from './index.module.css'

interface ButtonProps {
  primary?: boolean
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string,
  className: string,
  onClick?: () => void;
}

const Button = ({
  primary, size, backgroundColor, label, className, ...props
}: ButtonProps) => {
  const mode = primary ? styles['storybook-button--primary'] : styles['storybook-button--secondary']
  return (
    <button
      type="button"
      className={[styles['storybook-button'], styles[`storybook-button--${size}`], mode, className].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  )
}

Button.defaultProps = {
  primary: false,
  size: 'medium',
  backgroundColor: '',
  onClick: () => ({})
}

export default Button
