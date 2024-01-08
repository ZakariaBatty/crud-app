import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/auth/LoginPage'
import Layout from './layout/Layout'
import RegisterPage from './pages/auth/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/account/ProfilePage'
import ProfileAdmin from './pages/panel/ProfileAdmin'
import Booking from './pages/listing/index'
import BookingsPage from './pages/account/BookingsPage'
import AccountLayout from './layout/AccountLayout'
import AdminAccount from './layout/AdminAccount'

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="bookings" element={<BookingsPage />} />
          </Route>
          <Route path="/dashboard" element={<AdminAccount />}>
            <Route index element={<ProfileAdmin />} />
          </Route>
          <Route path="/booking" element={<Booking />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}


export default App
