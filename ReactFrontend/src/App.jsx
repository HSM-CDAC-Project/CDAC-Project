import './App.css';
// import MyNavbar from './Components/navbar';
import MyNavbar from './Components/Utils/navbar';
import LoginAdmin from './AdminPages/login';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/home';
import ElectricianService from './pages/Service Pages/ElectricianService';
import CarpenterService from './pages/Service Pages/CarpenterService';
import PestControlService from './pages/Service Pages/PestControlService';
import GardeningService from './pages/Service Pages/GardeningService';
import BathroomCleaningService from './pages/Service Pages/BathroomCleaningService';
import HomeDecoreService from './pages/Service Pages/HomeDecoreService';
import KitchenCleaningService from './pages/Service Pages/KitchenCleaningService';


import PartnerList from './AdminPages/PartnersList';
import ApprovalPending from './AdminPages/PartnerApproval';
import AdminPage from './AdminPages/AdminPage';
import AminPassowrdChange from './AdminPages/ChangePassword';
import OtpValidation from './AdminPages/otpValidation';
import { useSelector } from 'react-redux'
import ActiveOrders from './AdminPages/ActiveOrders';
import AddServicePackage from './AdminPages/AddServicePackage';
import RegisterPartner from './PartnerPages/RegisterPartner';
import LoginCustomer from './CustomerPages/CustomerLogin';
import RegisterCustomer from './CustomerPages/CustomerRegister';
import LoginPartner from './PartnerPages/PartnerLogin';
import AddressList from './CustomerPages/CustomerAddress';
import CustomerPage from './CustomerPages/CustomerPage';
import MyCart from './CustomerPages/mycart';
import OrderSuccess from './CustomerPages/ordersuccess';
import PartnerPage from './PartnerPages/PartnerPage';
import PartnerDetails from './PartnerPages/PartnerDetails';
import FetchAssignedOrders from './PartnerPages/FetchAssignedOrders';
import PartnerPasswordChange from './PartnerPages/ChangePassword';
import CustomerDetails from './CustomerPages/CustomerDetails';
import ChangeCustomerPassword from './CustomerPages/ChangeCustomerPassword';
import CustomerOrderDetails from './CustomerPages/CustomerOrderDetails';
import PlumberService from './pages/Service Pages/PlumberService';
import HomeCleaningService from './pages/Service Pages/FullHomeCleanService';
import RoomCleaningService from './pages/Service Pages/RoomCleaningService';
import ACRepairService from './pages/Service Pages/ACRepaireService';
import RefrigeratorRepairService from './pages/Service Pages/RefrigeratorRepairService';
import WMRepairService from './pages/Service Pages/WMRepairService';
import MyFooter from './Components/Utils/footer';

function App() {
  // const admin = useSelector((state) => state.admin)

  const location = useLocation();
  const hideNavbarRoutes = ['/admin-login','/register-partner', '/otp-validation']; 
  const hidefooterRoutes = ['/partner-change-password','/partner-orders', '/admin-login','otp-validation','/partner-details','/partner-login','/partner-register','/all-partners','/partner-approval','/admin-change-password','/active-orders','/add-package']
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  const showFooter = !hidefooterRoutes.includes(location.pathname);
  return (
    <div>
      {/* {adminSlice.loginStatus && <MyNavbar/>} */}
      {showNavbar && <MyNavbar />}
      <div className="container">
      <Routes>
      <Route path='/' element ={<Home />} />
      <Route path='/electricianService' element ={<ElectricianService />} />
      <Route path='/carpenterService' element ={<CarpenterService />} />
      <Route path='/plumberService' element ={<PlumberService />} />
      <Route path='/gardeningService' element ={<GardeningService />} />
      <Route path='/bathroomCleaning' element ={<BathroomCleaningService />} />
      <Route path='/homeCleaning' element ={<HomeCleaningService />} />
      <Route path='/roomCleaning' element ={<RoomCleaningService />} />
        <Route path='/homeDecore' element ={<HomeDecoreService />} />
        <Route path='/kitchenCleaning' element ={<KitchenCleaningService />} />
        <Route path='/pestControl' element ={<PestControlService />} />
        <Route path='/acRepair' element ={<ACRepairService />} />
        <Route path='/refrigeratorRepair' element ={<RefrigeratorRepairService />} />
        <Route path='/wmRepair' element ={<WMRepairService />} />




      <Route path='/mycart' element ={<MyCart />} />
      <Route path='/order-success' element ={<OrderSuccess />} />

        <Route path='/customer-login' element ={<LoginCustomer />} />
        <Route path='/customer-register' element ={<RegisterCustomer />} />
        <Route path='/customer-addresses' element ={<CustomerPage><AddressList /></CustomerPage>} />
        <Route path='/customer-details' element ={<CustomerPage><CustomerDetails /></CustomerPage>} />
        <Route path='/customer-change-password' element ={<CustomerPage><ChangeCustomerPassword /></CustomerPage>} />
        <Route path='/customer-orders' element ={<CustomerPage><CustomerOrderDetails /></CustomerPage>} />




        <Route path='/partner-register' element ={<RegisterPartner />} />
        <Route path='/partner-login' element ={<LoginPartner />} />
        <Route path='/partner-details' element ={<PartnerPage><PartnerDetails /></PartnerPage>} />
        <Route path='/partner-orders' element ={<PartnerPage><FetchAssignedOrders /></PartnerPage>} />
        <Route path='/partner-change-password' element ={<PartnerPage><PartnerPasswordChange /></PartnerPage>} />


        <Route path='/admin-login' element ={<LoginAdmin />} />
        <Route path="/otp-validation" element={<OtpValidation />} />
        <Route path='/partner-approval' element={<AdminPage>< ApprovalPending/></AdminPage>} />
        <Route path="/all-partners" element={<AdminPage><PartnerList /></AdminPage>}/>
        <Route path="/admin-change-password" element={<AdminPage><AminPassowrdChange /></AdminPage>}/>
        <Route path="/active-orders" element={<AdminPage><ActiveOrders /></AdminPage>}/>
        <Route path="/add-package" element={<AdminPage><AddServicePackage /></AdminPage>}/>
      </Routes>
      <ToastContainer/>

      </div>

      {showFooter && <MyFooter />}


    </div>

  );
}

export default App;
