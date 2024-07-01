import { useEffect, useState } from "react";
import BrandService from "../../../services/BrandServices";
import ProductService from "../../../services/ProductServices";
import { Link } from "react-router-dom";

function Brand() {


  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    BrandService.getAll()
    .then((response) => {
        // Update the state with the fetched data
        setBrands(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      ProductService.getAll()
      .then((response) => {
        // Cập nhật state với dữ liệu đã nhận được
        setProducts(response.data.content);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      });
  }, []); 

  const countProductsForBrand = (brandId) => {
    return products.filter(product => product.brand.id === brandId).length;
  };


    return ( 
        <>
  <div className="page-wrapper">
    <main className="main">
      <nav
        aria-label="breadcrumb"
        className="breadcrumb-nav breadcrumb-with-filter"
      >
        {/* <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Shop</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Product Brand</a>
            </li>
          </ol>
        </div> */}
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="categories-page">
          <div className="container">
            
            <div className="row">
            {brands.map((brand,index) => (
          <div key={index} className="col-md-6">
            <div className="banner banner-cat banner-badge">
              <a href="#">
                <img
                  src={`data:image/jpeg;base64,${brand.image}`} // Assuming the image is in JPEG format
                  alt="Banner"
                />
              </a>
              <Link  to={`/shop/brand/${brand.id}`} className="banner-link" >
                <h3 className="banner-title">{brand.name}</h3>
                <h4 className="banner-subtitle">{countProductsForBrand(brand.id)} Products</h4>
                   <span className="banner-link-text">Shop Now</span>
                   </Link>
            </div>
            
          </div>
        ))}
              {/* End .col-md-6 */}
        
              {/* End .col-md-6 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .categories-page */}
        <div className="sidebar-filter-overlay" />
        {/* End .sidebar-filter-overlay */}
        <aside className="sidebar-shop sidebar-filter sidebar-filter-banner">
          <div className="sidebar-filter-wrapper">
            <div className="widget widget-clean">
              <label>
                <i className="icon-close" />
                Filters
              </label>
              <a href="#" className="sidebar-filter-clear">
                Clean All
              </a>
            </div>
            <div className="widget">
              <h3 className="widget-title">Browse Category</h3>
              {/* End .widget-title */}
              <div className="widget-body">
                <div className="filter-items filter-items-count">
                  <div className="filter-item">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="cat-1"
                      />
                      <label className="custom-control-label" htmlFor="cat-1">
                        Women
                      </label>
                    </div>
                    {/* End .custom-checkbox */}
                    <span className="item-count">3</span>
                  </div>
                  {/* End .filter-item */}
                  <div className="filter-item">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="cat-2"
                      />
                      <label className="custom-control-label" htmlFor="cat-2">
                        Men
                      </label>
                    </div>
                    {/* End .custom-checkbox */}
                    <span className="item-count">0</span>
                  </div>
                  {/* End .filter-item */}
                  <div className="filter-item">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="cat-3"
                      />
                      <label className="custom-control-label" htmlFor="cat-3">
                        Holiday Shop
                      </label>
                    </div>
                    {/* End .custom-checkbox */}
                    <span className="item-count">0</span>
                  </div>
                  {/* End .filter-item */}
                  <div className="filter-item">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="cat-4"
                      />
                      <label className="custom-control-label" htmlFor="cat-4">
                        Gifts
                      </label>
                    </div>
                    {/* End .custom-checkbox */}
                    <span className="item-count">0</span>
                  </div>
                  {/* End .filter-item */}
                  <div className="filter-item">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="cat-5"
                      />
                      <label className="custom-control-label" htmlFor="cat-5">
                        Homeware
                      </label>
                    </div>
                    {/* End .custom-checkbox */}
                    <span className="item-count">0</span>
                  </div>
                  {/* End .filter-item */}
                  <div className="filter-item">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="cat-6"
                        defaultChecked="checked"
                      />
                      <label className="custom-control-label" htmlFor="cat-6">
                        Grid Categories Fullwidth
                      </label>
                    </div>
                    {/* End .custom-checkbox */}
                    <span className="item-count">13</span>
                  </div>
                  {/* End .filter-item */}
                  <div className="sub-filter-items">
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-7"
                        />
                        <label className="custom-control-label" htmlFor="cat-7">
                          Dresses
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">3</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-8"
                        />
                        <label className="custom-control-label" htmlFor="cat-8">
                          T-shirts
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">0</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-9"
                        />
                        <label className="custom-control-label" htmlFor="cat-9">
                          Bags
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">4</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-10"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="cat-10"
                        >
                          Jackets
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">2</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-11"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="cat-11"
                        >
                          Shoes
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">2</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-12"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="cat-12"
                        >
                          Jumpers
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">1</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-13"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="cat-13"
                        >
                          Jeans
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">1</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-14"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="cat-14"
                        >
                          Sportwear
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">0</span>
                    </div>
                    {/* End .filter-item */}
                  </div>
                  {/* End .sub-filter-items */}
                </div>
                {/* End .filter-items */}
              </div>
              {/* End .widget-body */}
            </div>
            {/* End .widget */}
          </div>
          {/* End .sidebar-filter-wrapper */}
        </aside>
        {/* End .sidebar-filter */}
      </div>
      {/* End .page-content */}
    </main>
    {/* End .main */}
  </div>
  {/* End .page-wrapper */}
  <button id="scroll-top" title="Back to Top">
    <i className="icon-arrow-up" />
  </button>
</>

     );
}

export default Brand;