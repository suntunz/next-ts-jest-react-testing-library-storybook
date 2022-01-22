import { useState } from 'react'

interface CounterProps {
  description: string;
  defaultCount: number;
}

const Counter = ({ description, defaultCount }: CounterProps) => {
  const [count, setCount] = useState(defaultCount)

  return (
    <div>
      <h2>Desc: {description} - Current Count: {count}</h2>

      <button type="button" onClick={() => setCount(count - 1)}> - </button>
      <button type="button" onClick={() => setCount(count + 1)}> + </button>
    </div>
  )
}

export default Counter
