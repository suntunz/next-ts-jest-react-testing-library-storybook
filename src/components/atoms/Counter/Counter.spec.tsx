import { render, screen } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

interface RenderCounterArgs {
  description?: string,
  defaultCount?: number
}

const renderCounter = (args: RenderCounterArgs = {}) => {
  const { description = 'Counter first', defaultCount = 0 } = args

  render(<Counter description={description} defaultCount={defaultCount} />)

  const getText = (text: string | RegExp) => screen.getByText(text)
  const getButton = (options: object = {}) => screen.getByRole('button', options)

  return {
    getText,
    getButton
  }
}

describe('Counter component', () => {
  describe('initialize with defaultCount=10 and description="Step Counter"', () => {
    it('renders defaultCount=10 and description="Step Counter"', () => {
      const { getText } = renderCounter({ description: 'Step Counter', defaultCount: 10 })
      expect(getText(/current count: 10/i)).toBeInTheDocument()
      expect(getText(/step counter/i)).toBeInTheDocument()
    })

    it('render label as Incrementor', () => {
      const { getText } = renderCounter({ description: 'Step Counter', defaultCount: 10 })
      expect(getText(/step counter/i)).toBeInTheDocument()
    })

    describe('when user input and click actions', () => {
      it('user typing "20" into label input incrementor', () => {
        renderCounter({ description: 'Step Counter', defaultCount: 10 })
        const input = screen.getByLabelText(/incrementor/i)
        userEvent.type(input, '{selectall}20')
        expect(input).toHaveValue('20')
      })

      it('user typing text "anythings" into label input incrementor must be not Nan', () => {
        renderCounter({ description: 'Step Counter', defaultCount: 10 })
        const input = screen.getByLabelText(/incrementor/i)
        userEvent.type(input, '{selectall}anythings')
        expect(input).not.toBeNaN()
      })

      it('user typing text "anythings" into label input incrementor must be greater than or equal 0', () => {
        renderCounter({ description: 'Step Counter', defaultCount: 10 })
        const input = screen.getByLabelText(/incrementor/i)
        userEvent.type(input, '{selectall}anythings')
        const parseIntValue = parseInt((input as HTMLInputElement).value, 10)
        expect(parseIntValue).toBeGreaterThanOrEqual(0)
      })

      it('when increment changes to 5 and "+" button is clicked', () => {
        const { getText, getButton } = renderCounter(
          { description: 'Step Counter', defaultCount: 10 }
        )

        userEvent.type(screen.getByLabelText(/incrementor/i), '{selectall}5')
        userEvent.click(getButton({ name: 'Increment' }))

        expect(getText(/current count: 15/i)).toBeInTheDocument()
      })

      it('when decrement changes to 5 and "-" button is clicked', () => {
        const { getText, getButton } = renderCounter(
          { description: 'Step Counter', defaultCount: 10 }
        )

        userEvent.type(screen.getByLabelText(/incrementor/i), '{selectall}5')
        userEvent.click(getButton({ name: 'Decrement' }))

        expect(getText(/current count: 5/i)).toBeInTheDocument()
      })

      it('when decrement changes the minimun number must be 0', () => {
        const { getText, getButton } = renderCounter(
          { description: 'Step Counter', defaultCount: 10 }
        )

        userEvent.type(screen.getByLabelText(/incrementor/i), '{selectall}15')
        userEvent.click(getButton({ name: 'Decrement' }))

        expect(getText(/current count: 0/i)).toBeInTheDocument()
      })
    })
  })

  describe('initialize with defaultCount=0 and description="Counter first"', () => {
    it('renders defaultCount=0', () => {
      const { getText } = renderCounter()
      expect(getText(/current count: 0/i)).toBeInTheDocument()
    })

    it('renders description as Counter first', () => {
      const { getText } = renderCounter()
      expect(getText(/counter first/i)).toBeInTheDocument()
    })

    describe('when user click actions', () => {
      it('user checked + then current count = 1', () => {
        const { getText, getButton } = renderCounter()
        userEvent.click(getButton({ name: 'Increment' }))
        expect(getText(/current count: 1/i)).toBeInTheDocument()
      })

      it('user clicked - then current count = 0', () => {
        const { getText, getButton } = renderCounter()
        userEvent.click(getButton({ name: /Decrement/i }))
        expect(getText(/current count: 0/i)).toBeInTheDocument()
      })
    })
  })
})
