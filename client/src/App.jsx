import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Form from './components/Form'
import List from './components/List'
import ErrorPage from './components/ErrorPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header/>}>
            <Route index element={<Form/>}/>
            <Route path='list' element={<List/>}/>
          </Route>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App