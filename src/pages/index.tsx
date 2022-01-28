import type { NextPage } from 'next'
import Counter from '../components/atoms/Counter/Counter'
import Header from '../components/organisms/Header'

interface PageProps {
  user?: object;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

const Home: NextPage<PageProps> = ({
  user, onLogin, onLogout, onCreateAccount
}: PageProps) => (
  <>
    <Header user={user} onLogin={onLogin} onLogout={onLogout} onCreateAccount={onCreateAccount} />
    <Counter description="Test" defaultCount={0} />
  </>
)

Home.defaultProps = {
  user: {}
}

export default Home
