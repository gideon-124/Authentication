import React, {useEffect, lazy, Suspense} from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ApiProvider, {PostApiProvider } from './components/ApiProvider';  



const SignUp=lazy(()=>import("./components/SignUp")) 
const ResetPassword=lazy(()=>import("./components/ResetPassword")) 
const Form =lazy(()=>import("./components/Form")) 
const ForgetPassword=lazy(()=>import("./components/ForgetPassword")) 
const PasswordSuccess=lazy(()=>import("./components/PasswordSuccess")) 
const TableData=lazy(()=>import("./components/TableData"))
function App() { 
  return (  
    <ApiProvider>  
    <div>
      <Router> 
        <Suspense fallback={<div> Loading </div>}> 
      <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/" element={ <PostApiProvider><Form/></PostApiProvider>}/>
          <Route path="/forgotpassword" element={<ForgetPassword />} />
          <Route path="/user/password/reset/:value" element={<ResetPassword />} />  
          <Route path="/PasswordSuccess" element={<PasswordSuccess/>}/>
          <Route path="/table" element={<TableData/>} />
        </Routes>   
        </Suspense>
      </Router>
    </div> 
    </ApiProvider> 
    

  );
}

export default App;
