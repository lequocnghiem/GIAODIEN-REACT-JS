import Slider from "./Slider";
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProductServices from '../../../services/ProductServices';
import Blog from "./Blog";
import Login from "../../../layouts/LayoutSite/Login";
import ProductItem from "../Product/ProductItem";
import ProductNew from "../Product/ProductNew";
import ProductSale from "../Product/ProductSale";
import Brand from "../Brand";

function Home() {
  document.title="Home"
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, productImagesResponse] = await Promise.all([
          ProductServices.getAll(),
          ProductServices.getProductImage(),
        ]);

        const productsData = productsResponse.data.content;
        const productImagesData = productImagesResponse.data.content;
        setProducts(productsData);
        setProductImages(productImagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const sortedProducts = products.sort((a, b) => b.id - a.id);

  const top10Products = sortedProducts.slice(0, 10);
  const combinedData = products.map(product => {
    // Lọc ra những hình ảnh có id sản phẩm trùng khớp với id sản phẩm hiện tại
    const correspondingImages = productImages.filter(image => image.product.id == product.id);
  
    // Trả về mảng các hình ảnh tương ứng với sản phẩm hiện tại
    return {
        ...product,
        images: correspondingImages
    };
});
    return ( 
<>
<Slider/>
  <div className="page-wrapper">
    <main className="main">
      {/* End .intro-slider-container */}
      <div
        className="brands-border owl-carousel owl-simple"
        data-toggle="owl"
        data-owl-options='{
              "nav": false, 
              "dots": false,
              "margin": 0,
              "loop": false,
              "responsive": {
                  "0": {
                      "items":2
                  },
                  "420": {
                      "items":3
                  },
                  "600": {
                      "items":4
                  },
                  "900": {
                      "items":5
                  },
                  "1024": {
                      "items":6
                  },
                  "1360": {
                      "items":7
                  }
              }
          }'
      >
        <a href="#" className="brand">
          <img src="assets/images/brands/1.png" alt="Brand Name" />
        </a>
        <a href="#" className="brand">
          <img src="assets/images/brands/2.png" alt="Brand Name" />
        </a>
        <a href="#" className="brand">
          <img src="assets/images/brands/3.png" alt="Brand Name" />
        </a>
        <a href="#" className="brand">
          <img src="assets/images/brands/4.png" alt="Brand Name" />
        </a>
        <a href="#" className="brand">
          <img src="assets/images/brands/5.png" alt="Brand Name" />
        </a>
        <a href="#" className="brand">
          <img src="assets/images/brands/6.png" alt="Brand Name" />
        </a>
        <a href="#" className="brand">
          <img src="assets/images/brands/7.png" alt="Brand Name" />
        </a>
      </div>
      {/* End .owl-carousel */}
      <div className="mb-3 mb-lg-5" />
      {/* End .mb-3 mb-lg-5 */}
      <div className="banner-group">
        <div className="container">
          <div className="row">
        
         <Brand/>
            {/* End .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      {/* End .banner-group */}
      <div className="mb-3" />
      {/* End .mb-6 */}

      {/* End .container-fluid */}
      <div className="mb-5" />
      {/* End .mb-5 */}
 
      {/* End .bg-light */}
      <div className="mb-6" />
      {/* End .mb-6 */}
      <div className="container">
        <div className="heading heading-center mb-3">
          <h2 className="title">Sản phẩm mới</h2>
          {/* End .title */}
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="top-all-link"
                data-toggle="tab"
                href="#top-all-tab"
                role="tab"
                aria-controls="top-all-tab"
                aria-selected="true"
              >
                 Mới
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="top-fur-link"
                data-toggle="tab"
                href="#top-fur-tab"
                role="tab"
                aria-controls="top-fur-tab"
                aria-selected="false"
              >
               Giảm giá
              </a>
            </li>
           
          </ul>
        </div>
        {/* End .heading */}
        <div className="tab-content">
          <div
            className="tab-pane p-0 fade show active"
            id="top-all-tab"
            role="tabpanel"
            aria-labelledby="top-all-link"
          >
            <div className="products">
              <div className="row justify-content-left">
          {combinedData.map((combinedItem, index) => (
            <ProductNew product={combinedItem} key={index} />
          ))}

              </div>
              {/* End .row */}
            </div>
            {/* End .products */}
          </div>
          {/* .End .tab-pane */}
          <div
            className="tab-pane p-0 fade"
            id="top-fur-tab"
            role="tabpanel"
            aria-labelledby="top-fur-link"
          >
         <ProductSale/>
            {/* End .products */}
          </div>
          {/* .End .tab-pane */}
          <div
            className="tab-pane p-0 fade"
            id="top-decor-tab"
            role="tabpanel"
            aria-labelledby="top-decor-link"
          >
     
            {/* End .products */}
          </div>
          {/* .End .tab-pane */}
          <div
            className="tab-pane p-0 fade"
            id="top-light-tab"
            role="tabpanel"
            aria-labelledby="top-light-link"
          >
 
            {/* End .products */}
          </div>
          {/* .End .tab-pane */}
        </div>
        {/* End .tab-content */}
      </div>
  
      {/* End .container */}
      <div className="container">
        <hr className="mt-1 mb-6" />
      </div>
      {/* End .container */}
      <Blog/>
      {/* End .blog-posts */}
    </main>
    {/* End .main */}
    {/* End .footer */}
  </div>
  {/* End .page-wrapper */}
  <button id="scroll-top" title="Back to Top">
    <i className="icon-arrow-up" />
  </button>
  {/* Mobile Menu */}
  <div className="mobile-menu-overlay" />
  {/* End .mobil-menu-overlay */}
  <div className="mobile-menu-container mobile-menu-light">
    <div className="mobile-menu-wrapper">
      <span className="mobile-menu-close">
        <i className="icon-close" />
      </span>
      <form action="#" method="get" className="mobile-search">
        <label htmlFor="mobile-search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          className="form-control"
          name="mobile-search"
          id="mobile-search"
          placeholder="Search product ..."
          required=""
        />
        <button className="btn btn-primary" type="submit">
          <i className="icon-search" />
        </button>
      </form>
      <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="mobile-menu-link"
            data-toggle="tab"
            href="#mobile-menu-tab"
            role="tab"
            aria-controls="mobile-menu-tab"
            aria-selected="true"
          >
            Menu
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="mobile-cats-link"
            data-toggle="tab"
            href="#mobile-cats-tab"
            role="tab"
            aria-controls="mobile-cats-tab"
            aria-selected="false"
          >
            Categories
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="mobile-menu-tab"
          role="tabpanel"
          aria-labelledby="mobile-menu-link"
        >
          <nav className="mobile-nav">
            <ul className="mobile-menu">
              <li className="active">
                <a href="index.html">Home</a>
                <ul>
                  <li>
                    <a href="index-1.html">01 - furniture store</a>
                  </li>
                  <li>
                    <a href="index-2.html">02 - furniture store</a>
                  </li>
                  <li>
                    <a href="index-3.html">03 - electronic store</a>
                  </li>
                  <li>
                    <a href="index-4.html">04 - electronic store</a>
                  </li>
                  <li>
                    <a href="index-5.html">05 - fashion store</a>
                  </li>
                  <li>
                    <a href="index-6.html">06 - fashion store</a>
                  </li>
                  <li>
                    <a href="index-7.html">07 - fashion store</a>
                  </li>
                  <li>
                    <a href="index-8.html">08 - fashion store</a>
                  </li>
                  <li>
                    <a href="index-9.html">09 - fashion store</a>
                  </li>
                  <li>
                    <a href="index-10.html">10 - shoes store</a>
                  </li>
                  <li>
                    <a href="index-11.html">11 - furniture simple store</a>
                  </li>
                  <li>
                    <a href="index-12.html">12 - fashion simple store</a>
                  </li>
                  <li>
                    <a href="index-13.html">13 - market</a>
                  </li>
                  <li>
                    <a href="index-14.html">14 - market fullwidth</a>
                  </li>
                  <li>
                    <a href="index-15.html">15 - lookbook 1</a>
                  </li>
                  <li>
                    <a href="index-16.html">16 - lookbook 2</a>
                  </li>
                  <li>
                    <a href="index-17.html">17 - fashion store</a>
                  </li>
                  <li>
                    <a href="index-18.html">
                      18 - fashion store (with sidebar)
                    </a>
                  </li>
                  <li>
                    <a href="index-19.html">19 - games store</a>
                  </li>
                  <li>
                    <a href="index-20.html">20 - book store</a>
                  </li>
                  <li>
                    <a href="index-21.html">21 - sport store</a>
                  </li>
                  <li>
                    <a href="index-22.html">22 - tools store</a>
                  </li>
                  <li>
                    <a href="index-23.html">
                      23 - fashion left navigation store
                    </a>
                  </li>
                  <li>
                    <a href="index-24.html">24 - extreme sport store</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="category.html">Shop</a>
                <ul>
                  <li>
                    <a href="category-list.html">Shop List</a>
                  </li>
                  <li>
                    <a href="category-2cols.html">Shop Grid 2 Columns</a>
                  </li>
                  <li>
                    <a href="category.html">Shop Grid 3 Columns</a>
                  </li>
                  <li>
                    <a href="category-4cols.html">Shop Grid 4 Columns</a>
                  </li>
                  <li>
                    <a href="category-boxed.html">
                      <span>
                        Shop Boxed No Sidebar
                        <span className="tip tip-hot">Hot</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="category-fullwidth.html">
                      Shop Fullwidth No Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="product-category-boxed.html">
                      Product Category Boxed
                    </a>
                  </li>
                  <li>
                    <a href="product-category-fullwidth.html">
                      <span>
                        Product Category Fullwidth
                        <span className="tip tip-new">New</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="cart.html">Cart</a>
                  </li>
                  <li>
                    <a href="checkout.html">Checkout</a>
                  </li>
                  <li>
                    <a href="wishlist.html">Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Lookbook</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="product.html" className="sf-with-ul">
                  Product
                </a>
                <ul>
                  <li>
                    <a href="product.html">Default</a>
                  </li>
                  <li>
                    <a href="product-centered.html">Centered</a>
                  </li>
                  <li>
                    <a href="product-extended.html">
                      <span>
                        Extended Info<span className="tip tip-new">New</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="product-gallery.html">Gallery</a>
                  </li>
                  <li>
                    <a href="product-sticky.html">Sticky Info</a>
                  </li>
                  <li>
                    <a href="product-sidebar.html">Boxed With Sidebar</a>
                  </li>
                  <li>
                    <a href="product-fullwidth.html">Full Width</a>
                  </li>
                  <li>
                    <a href="product-masonry.html">Masonry Sticky Info</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Pages</a>
                <ul>
                  <li>
                    <a href="about.html">About</a>
                    <ul>
                      <li>
                        <a href="about.html">About 01</a>
                      </li>
                      <li>
                        <a href="about-2.html">About 02</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                    <ul>
                      <li>
                        <a href="contact.html">Contact 01</a>
                      </li>
                      <li>
                        <a href="contact-2.html">Contact 02</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                  <li>
                    <a href="faq.html">FAQs</a>
                  </li>
                  <li>
                    <a href="404.html">Error 404</a>
                  </li>
                  <li>
                    <a href="coming-soon.html">Coming Soon</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="blog.html">Blog</a>
                <ul>
                  <li>
                    <a href="blog.html">Classic</a>
                  </li>
                  <li>
                    <a href="blog-listing.html">Listing</a>
                  </li>
                  <li>
                    <a href="#">Grid</a>
                    <ul>
                      <li>
                        <a href="blog-grid-2cols.html">Grid 2 columns</a>
                      </li>
                      <li>
                        <a href="blog-grid-3cols.html">Grid 3 columns</a>
                      </li>
                      <li>
                        <a href="blog-grid-4cols.html">Grid 4 columns</a>
                      </li>
                      <li>
                        <a href="blog-grid-sidebar.html">Grid sidebar</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Masonry</a>
                    <ul>
                      <li>
                        <a href="blog-masonry-2cols.html">Masonry 2 columns</a>
                      </li>
                      <li>
                        <a href="blog-masonry-3cols.html">Masonry 3 columns</a>
                      </li>
                      <li>
                        <a href="blog-masonry-4cols.html">Masonry 4 columns</a>
                      </li>
                      <li>
                        <a href="blog-masonry-sidebar.html">Masonry sidebar</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Mask</a>
                    <ul>
                      <li>
                        <a href="blog-mask-grid.html">Blog mask grid</a>
                      </li>
                      <li>
                        <a href="blog-mask-masonry.html">Blog mask masonry</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Single Post</a>
                    <ul>
                      <li>
                        <a href="single.html">Default with sidebar</a>
                      </li>
                      <li>
                        <a href="single-fullwidth.html">Fullwidth no sidebar</a>
                      </li>
                      <li>
                        <a href="single-fullwidth-sidebar.html">
                          Fullwidth with sidebar
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="elements-list.html">Elements</a>
                <ul>
                  <li>
                    <a href="elements-products.html">Products</a>
                  </li>
                  <li>
                    <a href="elements-typography.html">Typography</a>
                  </li>
                  <li>
                    <a href="elements-titles.html">Titles</a>
                  </li>
                  <li>
                    <a href="elements-banners.html">Banners</a>
                  </li>
                  <li>
                    <a href="elements-product-category.html">
                      Product Category
                    </a>
                  </li>
                  <li>
                    <a href="elements-video-banners.html">Video Banners</a>
                  </li>
                  <li>
                    <a href="elements-buttons.html">Buttons</a>
                  </li>
                  <li>
                    <a href="elements-accordions.html">Accordions</a>
                  </li>
                  <li>
                    <a href="elements-tabs.html">Tabs</a>
                  </li>
                  <li>
                    <a href="elements-testimonials.html">Testimonials</a>
                  </li>
                  <li>
                    <a href="elements-blog-posts.html">Blog Posts</a>
                  </li>
                  <li>
                    <a href="elements-portfolio.html">Portfolio</a>
                  </li>
                  <li>
                    <a href="elements-cta.html">Call to Action</a>
                  </li>
                  <li>
                    <a href="elements-icon-boxes.html">Icon Boxes</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* End .mobile-nav */}
        </div>
        {/* .End .tab-pane */}
        <div
          className="tab-pane fade"
          id="mobile-cats-tab"
          role="tabpanel"
          aria-labelledby="mobile-cats-link"
        >
          <nav className="mobile-cats-nav">
            <ul className="mobile-cats-menu">
              <li>
                <a className="mobile-cats-lead" href="#">
                  Daily offers
                </a>
              </li>
              <li>
                <a className="mobile-cats-lead" href="#">
                  Gift Ideas
                </a>
              </li>
              <li>
                <a href="#">Beds</a>
              </li>
              <li>
                <a href="#">Lighting</a>
              </li>
              <li>
                <a href="#">Sofas &amp; Sleeper sofas</a>
              </li>
              <li>
                <a href="#">Storage</a>
              </li>
              <li>
                <a href="#">Armchairs &amp; Chaises</a>
              </li>
              <li>
                <a href="#">Decoration </a>
              </li>
              <li>
                <a href="#">Kitchen Cabinets</a>
              </li>
              <li>
                <a href="#">Coffee &amp; Tables</a>
              </li>
              <li>
                <a href="#">Outdoor Furniture </a>
              </li>
            </ul>
            {/* End .mobile-cats-menu */}
          </nav>
          {/* End .mobile-cats-nav */}
        </div>
        {/* .End .tab-pane */}
      </div>
      {/* End .tab-content */}
      <div className="social-icons">
        <a href="#" className="social-icon" target="_blank" title="Facebook">
          <i className="icon-facebook-f" />
        </a>
        <a href="#" className="social-icon" target="_blank" title="Twitter">
          <i className="icon-twitter" />
        </a>
        <a href="#" className="social-icon" target="_blank" title="Instagram">
          <i className="icon-instagram" />
        </a>
        <a href="#" className="social-icon" target="_blank" title="Youtube">
          <i className="icon-youtube" />
        </a>
      </div>
      {/* End .social-icons */}
    </div>
    {/* End .mobile-menu-wrapper */}
  </div>

  <div
    className="container newsletter-popup-container mfp-hide"
    // id="newsletter-popup-form"
  >
    <div className="row justify-content-center">
      <div className="col-10">
        <div className="row no-gutters bg-white newsletter-popup-content">
          <div className="col-xl-3-5col col-lg-7 banner-content-wrap">
            <div className="banner-content text-center">
              <img
                src="assets/images/popup/newsletter/logo.png"
                className="logo"
                alt="logo"
                width={60}
                height={15}
              />
              <h2 className="banner-title">
                get{" "}
                <span>
                  25<light>%</light>
                </span>{" "}
                off
              </h2>
              <p>
                Subscribe to the Molla eCommerce newsletter to receive timely
                updates from your favorite products.
              </p>

           
              <form action="#">
                <div className="input-group input-group-round">
                  <input
                    type="email"
                    className="form-control form-control-white"
                    placeholder="Your Email Address"
                    aria-label="Email Adress"
                    required=""
                  />
                  <div className="input-group-append">
                    <button className="btn" type="submit">
                      <span>go</span>
                    </button>
                  </div>
                  {/* .End .input-group-append */}
                </div>
                {/* .End .input-group */}
              </form>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="register-policy-2"
                  required=""
                />
                <label
                  className="custom-control-label"
                  htmlFor="register-policy-2"
                >
                  Do not show this popup again
                </label>
              </div>
              {/* End .custom-checkbox */}
            
            </div>
          </div>
          <div className="col-xl-2-5col col-lg-5 ">
            <img
              src="assets/images/popup/newsletter/img-1.jpg"
              className="newsletter-img"
              alt="newsletter"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</>


     );
}

export default Home;