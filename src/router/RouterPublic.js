 import Contact from "../pages/frontend/Contact";
import Home from "../pages/frontend/Home";
import Login from "../pages/frontend/Login";
import Checkout from "../pages/frontend/Checkout";
import Wishlist from "../pages/frontend/Wishlist";
import Product from "../pages/frontend/Product";
import ProductDetail from "../pages/frontend/Product/ProductDetail";
// import ProductCategory from "../pages/frontend/ProductCategory";
 import Post from "../pages/frontend/Post";
 import Brand from "../pages/frontend/Brand";
// import PostTopic from "../pages/frontend/Post/PostTopic";
// import ProductBrand from "../pages/frontend/ProductBrand";
import PostDetail from "../pages/frontend/Post/PostDetail";
// import Search from "../layouts/LayoutSite/Search";
 import Cart from "../pages/frontend/Cart";
import Order from "../pages/frontend/Order";
import OrderDetail from "../pages/frontend/Order/OrderDetail";
// import About from "../pages/frontend/About";
// import CSMH from "../pages/frontend/CSMH";
// import CSBH from "../pages/frontend/CSBH";
// import CSVC from "../pages/frontend/CSVC";
// import CSDT from "../pages/frontend/CSDT";

const RouterPublic = [
     {path:'/',component:Home},
    {path:'/shop',component:Product},
    {path:'/shop/category/:categoryId',component:Product}, 
    {path:'/shop/brand/:brandId',component:Product}, 
    {path:'/wishlist',component:Wishlist},
    {path:'/checkout',component:Checkout},
    // {path:'/product/:page',component:Product},
     {path:'/contact',component:Contact},
    {path:'/productdetail/:id',component:ProductDetail},
    // {path:'/danh-muc-san-pham/:slug',component:ProductCategory},
     {path:'/post',component:Post},
    //  {path:'/brand',component:Brand},
    // {path:'/chu-de-bai-viet/:slug',component:PostTopic},
    // {path:'/thuong-hieu/:slug',component:ProductBrand},
     {path:'/postdetail/:id',component:PostDetail},
    // {path:'/tim-kiem/:key',component:Search},
     {path:'/cart',component:Cart},
     {path:'/order',component:Order},
     { path:"/order/detail/:orderId" ,component:OrderDetail},
    // {path:'/gioi-thieu',component:About},
    // {path:'/chinh-sach-mua-hang',component:CSMH},
    // {path:'/chinh-sach-bao-hanh',component:CSBH},
    // {path:'/chinh-sach-van-chuyen',component:CSVC},
    // {path:'/chinh-sach-doi-tra',component:CSDT},
    {path:'/login',component:Login},
]
export default RouterPublic;