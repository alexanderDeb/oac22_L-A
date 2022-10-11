import { Navigate, Outlet } from 'react-router-dom'

const OtherProtectedRoutes = () => {
  let auth = { 'access': true }

  if (localStorage.getItem('token')) {
    auth = { 'access': false }
  } else {
    auth = { 'access': true }
  }

  return (
    auth.access ? <Outlet /> : <Navigate to="/dashboard" />
  )
}

export default OtherProtectedRoutes