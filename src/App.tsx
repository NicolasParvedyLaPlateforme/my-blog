import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ArticlesPage from './pages/ArticlesPage'
import ArticlesDetailPage from './pages/ArticlesDetailPage'
import ArticlesAddPage from './pages/ArticlesAddPage'
import ArticlesUpdatePage from './pages/ArticlesUpdatePage'
import IntrouvablePage from './pages/IntrouvablePage'
import Header from './components/Header/Header'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
    <BrowserRouter> 
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticlesDetailPage />} />
        <Route path="/articles/add" element={<ArticlesAddPage />} />
        <Route path="/articles/update/:id" element={<ArticlesUpdatePage />} />
        <Route path="*" element={<IntrouvablePage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
