import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Productinfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import Sucessful from './pages/Sucessful';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>}
          />
          <Route path='/product/:id' element={
            <ProtectedRoute>
              <Productinfo />
            </ProtectedRoute>}
          />
          <Route path='/cart' element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>}
          />
          <Route path='/sucessful' element={
            <ProtectedRoute>
              <Sucessful />
            </ProtectedRoute>}
          />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/admin' element={
            <ProtectedRoute>
              <Admin/>
            </ProtectedRoute>}
          />
          <Route path='/admin/add-product' element={
            <ProtectedRoute>
              <AddProduct/>
            </ProtectedRoute>}
          />
          <Route path='/admin/edit-product/:id' element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>}
          />

          <Route path='/*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
