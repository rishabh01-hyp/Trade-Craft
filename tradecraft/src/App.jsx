import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CampusProvider } from './context/CampusContext'
import { AppLayout } from './layouts/AppLayout'
import Home from './Pages/Home'
import Search from './Pages/Search'
import Categories from './Pages/Categories'
import CategoryDetail from './Pages/CategoryDetail'
import SkillPage from './Pages/SkillPage'
import StudentProfile from './Pages/StudentProfile'
import BookingRequest from './Pages/BookingRequest'
import MySkills from './Pages/MySkills'
import Bookings from './Pages/Bookings'

function App() {
  return (
    <CampusProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<CategoryDetail />} />
            <Route path="/skill/:skillName" element={<SkillPage />} />
            <Route path="/student/:studentId" element={<StudentProfile />} />
            <Route path="/book/:studentId" element={<BookingRequest />} />
            <Route path="/my-skills" element={<MySkills />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </CampusProvider>
  )
}

export default App
