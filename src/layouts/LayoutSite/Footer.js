function Footer() {
  return (  
<footer className="footer footer-2">
<div className="icon-boxes-container">
  <div className="container">
    <div className="row">
      <div className="col-sm-6 col-lg-3">
        <div className="icon-box icon-box-side">
          <span className="icon-box-icon text-dark">
            <i className="icon-rocket" />
          </span>
          <div className="icon-box-content">
            <h3 className="icon-box-title">Free Shipping</h3>
            {/* End .icon-box-title */}
            <p>orders $50 or more</p>
          </div>
          {/* End .icon-box-content */}
        </div>
        {/* End .icon-box */}
      </div>
      {/* End .col-sm-6 col-lg-3 */}
      <div className="col-sm-6 col-lg-3">
        <div className="icon-box icon-box-side">
          <span className="icon-box-icon text-dark">
            <i className="icon-rotate-left" />
          </span>
          <div className="icon-box-content">
            <h3 className="icon-box-title">Free Returns</h3>
            {/* End .icon-box-title */}
            <p>within 30 days</p>
          </div>
          {/* End .icon-box-content */}
        </div>
        {/* End .icon-box */}
      </div>
      {/* End .col-sm-6 col-lg-3 */}
      <div className="col-sm-6 col-lg-3">
        <div className="icon-box icon-box-side">
          <span className="icon-box-icon text-dark">
            <i className="icon-info-circle" />
          </span>
          <div className="icon-box-content">
            <h3 className="icon-box-title">Get 20% Off 1 Item</h3>
            {/* End .icon-box-title */}
            <p>When you sign up</p>
          </div>
          {/* End .icon-box-content */}
        </div>
        {/* End .icon-box */}
      </div>
      {/* End .col-sm-6 col-lg-3 */}
      <div className="col-sm-6 col-lg-3">
        <div className="icon-box icon-box-side">
          <span className="icon-box-icon text-dark">
            <i className="icon-life-ring" />
          </span>
          <div className="icon-box-content">
            <h3 className="icon-box-title">We Support</h3>
            {/* End .icon-box-title */}
            <p>24/7 amazing services</p>
          </div>
          {/* End .icon-box-content */}
        </div>
        {/* End .icon-box */}
      </div>
      {/* End .col-sm-6 col-lg-3 */}
    </div>
    {/* End .row */}
  </div>
  {/* End .container */}
</div>
{/* End .icon-boxes-container */}

{/* End .footer-newsletter bg-image */}
<div className="footer-middle">
  <div className="container">
    <div className="row">
      <div className="col-sm-12 col-lg-6">
        <div className="widget widget-about">
          <img
            src="assets/images/demos/demo-2/logo.png"
            className="footer-logo"
            alt="Footer Logo"
            width={105}
            height={25}
          />
          <p>
          Chào mừng đến với cửa hàng của chúng tôi! Chúng tôi tự hào mang đến cho bạn những sản phẩm chất lượng, đa dạng từ thời trang đến đồ gia dụng. Với cam kết mang đến sự hài lòng tối đa cho khách hàng, chúng tôi luôn nỗ lực cải thiện và mang đến những trải nghiệm mua sắm tuyệt vời nhất. Hãy khám phá và mua sắm ngay hôm nay cùng chúng tôi!
          </p>
          <div className="widget-about-info">
            <div className="row">
              <div className="col-sm-6 col-md-4">
                <span className="widget-about-title">
                  Got Question? Call us 24/7
                </span>
                <a href="tel:123456789">+0123 456 789</a>
              </div>
              {/* End .col-sm-6 */}
              <div className="col-sm-6 col-md-8">
                <span className="widget-about-title">Payment Method</span>
                <figure className="footer-payments">
                  <img
                    src="assets/images/payments.png"
                    alt="Payment methods"
                    width={272}
                    height={20}
                  />
                </figure>
                {/* End .footer-payments */}
              </div>
              {/* End .col-sm-6 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .widget-about-info */}
        </div>
        {/* End .widget about-widget */}
      </div>
      {/* End .col-sm-12 col-lg-3 */}
      <div className="col-sm-4 col-lg-2">
        <div className="widget">
          <h4 className="widget-title">Information</h4>
          {/* End .widget-title */}
          <ul className="widget-list">
            <li>
              <a href="/l">About Molla</a>
            </li>

            <li>
              <a href="/contact">Contact us</a>
            </li>
            <li>
              <a href="/login">Log in</a>
            </li>
          </ul>
          {/* End .widget-list */}
        </div>
        {/* End .widget */}
      </div>
      {/* End .col-sm-4 col-lg-3 */}

      {/* End .col-sm-4 col-lg-3 */}
      <div className="col-sm-4 col-lg-2">
        <div className="widget">
          <h4 className="widget-title">My Account</h4>
          {/* End .widget-title */}
          <ul className="widget-list">
            <li>
              <a href="/login">Sign In</a>
            </li>
            <li>
              <a href="/cart">View Cart</a>
            </li>
            <li>
              <a href="/Wishlist">My Wishlist</a>
            </li>

          </ul>
          {/* End .widget-list */}
        </div>
        {/* End .widget */}
      </div>
      {/* End .col-sm-64 col-lg-3 */}
    </div>
    {/* End .row */}
  </div>
  {/* End .container */}
</div>
{/* End .footer-middle */}

{/* End .footer-bottom */}
</footer>



  );
}

export default Footer;