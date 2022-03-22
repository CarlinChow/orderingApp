import './App.css';
import './Utilities.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodsPage from './pages/FoodsPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage'
import CustomerOrderPage from './pages/CustomerOrderPage'
import PickupTimesPage from './pages/PickupTimesPage'
import AdminContainer from './components/AdminContainer'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<CustomerOrderPage />}/>
          <Route path='login' element={<LoginPage />}/>
          <Route path='admin' element={<AdminContainer />}>
            <Route path='orders' element={<OrdersPage />}/>
            <Route path='pickuptimes' element={<PickupTimesPage />}/>
            <Route path='foods' element={<FoodsPage />}/>
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        theme={"colored"}
        autoClose={5000}
        closeOnClick
        draggable
        pauseOnHover 
      />
    </div>
  );
}

export default App;
