import { render, screen, waitFor } from '@testing-library/react'
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
  const getInputIncrementor = () => screen.getByLabelText(/incrementor/i)

  interface ActionsType {
    userTyping?: {
      text: string
    }
    userClick?: {
      buttonName: string
    }
  }
  const runUserJourney = (actions: ActionsType) => {
    if (actions.userTyping) userEvent.type(getInputIncrementor(), actions.userTyping.text)
    if (actions.userClick) userEvent.click(getButton({ name: actions.userClick.buttonName }))
  }

  return {
    getText,
    getButton,
    getInputIncrementor,
    runUserJourney
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
        const { getInputIncrementor, runUserJourney } = renderCounter(
          { description: 'Step Counter', defaultCount: 10 }
        )
        runUserJourney({ userTyping: { text: '{selectall}20' } })
        expect(getInputIncrementor()).toHaveValue('20')
      })

      it('user typing text "anythings" into label input incrementor must be not NaN', () => {
        const { getInputIncrementor, runUserJourney } = renderCounter(
          { description: 'Step Counter', defaultCount: 10 }
        )
        runUserJourney({ userTyping: { text: '{selectall}anythings' } })
        expect(getInputIncrementor()).not.toBeNaN()
      })

      it('user typing text "anythings" into label input incrementor must be greater than or equal 0', () => {
        const { getInputIncrementor, runUserJourney } = renderCounter(
          { description: 'Step Counter', defaultCount: 10 }
        )
        runUserJourney({ userTyping: { text: '{selectall}anythings' } })

        const parseIntValue = parseInt((getInputIncrementor() as HTMLInputElement).value, 10)
        expect(parseIntValue).toBeGreaterThanOrEqual(0)
      })

      it('when increment changes to 5 and "+" button is clicked', () => {
        const { getText, runUserJourney } = renderCounter(
          { description: 'Step Counter', defaultCount: 10 }
        )

        runUserJourney({
          userTyping: { text: '{selectall}5' },
          userClick: { buttonName: 'Increment' }
        })

        expect(getText(/current count: 15/i)).toBeInTheDocument()
      })

      it('when decrement changes to 5 and "-" button is clicked', async () => {
        const { getText, runUserJourney } = renderCounter(
          { description: 'Step Counter', defaultCount: 10 }
        )

        runUserJourney({
          userTyping: { text: '{selectall}5' },
          userClick: { buttonName: 'Decrement' }
        })

        await waitFor(() => {
          expect(getText(/current count: 5/i)).toBeInTheDocument()
        }, { timeout: 1000 })
      })

      it('when decrement changes the minimun number must be 0', async () => {
        const { getText, runUserJourney } = renderCounter(
          { description: 'Step Counter', defaultCount: 10 }
        )

        runUserJourney({
          userTyping: { text: '{selectall}15' },
          userClick: { buttonName: 'Decrement' }
        })

        await waitFor(() => {
          expect(getText(/current count: 0/i)).toBeInTheDocument()
        }, { timeout: 1000 })
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
