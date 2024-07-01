import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import Copyright from "./Copyright";
function layoutsite() {
    return (  
        <>
        <Header/>
        <Outlet />
        <Footer/>
        <Copyright/>
    </>
    );
}

export default layoutsite;