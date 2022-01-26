import { useState } from 'react'

interface CounterProps {
  description: string;
  defaultCount: number;
}

const Counter = ({ description, defaultCount }: CounterProps) => {
  const [count, setCount] = useState<number>(defaultCount)
  const [incrementor, setIncrementor] = useState<number>(10)

  const handlerSetCount = () => {
    const newStateCount = count - incrementor
    setCount(newStateCount < 0 ? 0 : newStateCount)
  }

  const handlerSetIncrementor = (value: string) => {
    const parseIntValue = parseInt(value, 10)
    setIncrementor(parseIntValue || 0)
  }

  return (
    <div>
      <h2>Desc: {description} - Current Count: {count}</h2>

      <div>
        <label htmlFor="input-incrementor">
          Incrementor
          <input
            id="input-incrementor"
            type="text"
            value={incrementor}
            onChange={(event) => handlerSetIncrementor(event.target.value)}
          />
        </label>
      </div>

      <button type="button" aria-label="Decrement" onClick={() => setTimeout(() => handlerSetCount(), 1000)}> - </button>
      <button type="button" aria-label="Increment" onClick={() => setCount(count + incrementor)}> + </button>
    </div>
  )
}

export default Counter
