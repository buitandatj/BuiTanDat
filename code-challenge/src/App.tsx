
import Header from "./components/Header";
import AppRouter from "./routers/AppRouter";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
     <ToastContainer   position="top-center" theme="dark"  pauseOnFocusLoss
          draggable
          pauseOnHover/>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
