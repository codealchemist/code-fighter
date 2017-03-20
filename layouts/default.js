import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import DefaultStyle from '../styles/default'
import Scripts from '../components/scripts'
import Menu from '../components/menu'

export default ({ children }) => (
  <div>
    <Head>
      <DefaultStyle />
    </Head>

    <Header />
    <Menu />

    <div className='page-content'>
      { children }
    </div>

    <Footer />
    <Scripts />
  </div>
)
