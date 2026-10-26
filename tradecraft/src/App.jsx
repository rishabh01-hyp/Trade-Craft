import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import WorkspaceProvider from './components/WorkspaceProvider'
import { AppLayout } from './layouts/AppLayout'
import { ToastProvider } from './components/Toasts'
import { useLocalStorage } from './hooks/useLocalStorage'
import { campuses, getCampusById } from './data/mockData'
import Home from './Pages/Home'
import Search from './Pages/Search'
import Categories from './Pages/Categories'
import CategoryDetail from './Pages/CategoryDetail'
import SkillPage from './Pages/SkillPage'
import StudentProfile from './Pages/StudentProfile'
import Students from './Pages/Students'
import Community from './Pages/Community'
import BookingRequest from './Pages/BookingRequest'
import MySkills from './Pages/MySkills'
import Bookings from './Pages/Bookings'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NotFound from './Pages/NotFound'
import ReviewsPage from './Pages/ReviewsPage'

function ProtectedRoute({ user, children }) {
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />
  }
  return children
}

function App() {
  const [campusId, setCampusId] = useLocalStorage('tradecraft_campus', campuses[0].id)
  const [user, setUser] = useLocalStorage('tradecraft_user', null)

  const campus = getCampusById(campusId)

  return (
    <BrowserRouter>
      <ToastProvider>
        <WorkspaceProvider key={user?.rollNo || 'guest'} user={user}>
        <AppLayout
          campus={campus}
          onCampusChange={setCampusId}
          user={user}
          onLogout={() => setUser(null)}
        >
          <Routes>
            <Route path="/" element={<Home campus={campus} user={user} />} />
            <Route path="/search" element={<Search campus={campus} />} />
            <Route path="/students" element={<Students key={campus.id} campus={campus} />} />
            <Route path="/community" element={<Community />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<CategoryDetail />} />
            <Route path="/skill/:skillName" element={<SkillPage campus={campus} />} />
            <Route path="/student/:studentId" element={<StudentProfile />} />
            <Route path="/book/:studentId" element={<ProtectedRoute user={user}><BookingRequest /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute user={user}><ReviewsPage /></ProtectedRoute>} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/register" element={<Register onLogin={setUser} />} />
            <Route
              path="/my-skills"
              element={
                <ProtectedRoute user={user}>
                  <MySkills />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute user={user}>
                  <Bookings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
        </WorkspaceProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
