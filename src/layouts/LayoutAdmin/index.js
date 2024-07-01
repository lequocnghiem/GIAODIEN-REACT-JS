import Header from './Header.js';
import Footer from './Footer.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Outlet } from 'react-router-dom';

function LayoutAdmin() {
    return ( 
      <>
        <Header/>
        <seciton className="maincontent">
            <div className="container-fluid my-3">
              <Outlet/>
            </div>
        </seciton>
        <Footer/>
      </>
     );
}

export default LayoutAdmin;