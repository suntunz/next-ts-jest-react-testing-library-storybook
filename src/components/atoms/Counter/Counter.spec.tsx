import { render, screen } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

const renderCounter = () => {
  render(<Counter description="Counter first" defaultCount={0} />)
  const getText = (text: string | RegExp) => screen.getByText(text)
  const getButton = (options: object = {}) => screen.getByRole('button', options)

  return {
    getText,
    getButton
  }
}

describe('Counter component', () => {
  describe('initialize with defaultCount=0 and description="Counter first"', () => {
    it('renders default count = 0', () => {
      const { getText } = renderCounter()
      expect(getText(/current count: 0/i)).toBeInTheDocument()
    })

    it('renders title as Counter first', () => {
      const { getText } = renderCounter()
      expect(getText(/counter first/i)).toBeInTheDocument()
    })

    describe('when user click actions', () => {
      it('defaultCount = 0, and + clicked then counter = 1', () => {
        const { getText, getButton } = renderCounter()
        userEvent.click(getButton({ name: '+' }))
        expect(getText(/current count: 1/i)).toBeInTheDocument()
      })

      it('defaultCount = 0, and - clicked then couter = -1', () => {
        const { getText, getButton } = renderCounter()
        userEvent.click(getButton({ name: '-' }))
        expect(getText(/current count: -1/i)).toBeInTheDocument()
      })
    })
  })
})
