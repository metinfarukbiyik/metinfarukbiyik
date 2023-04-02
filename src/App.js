import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Main from './pages/Main'
import Page404 from './pages/404'

function App() {
  return (
    <>
   <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
    </>
  );
}

export default App;
