import type { NextPage } from 'next'
import Counter from '../components/atoms/Counter/Counter'

const Home: NextPage = () => (
  <Counter description="Test" defaultCount={0} />
)

export default Home
