import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CartService from "../../../services/CartServices";
import { useUser } from "../../../services/UserContext";
import CheckoutService from "../../../services/CheckoutService";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { SiPaypal } from "react-icons/si";


const GHN_API_URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api';
const GHN_TOKEN = '45e0175b-2d97-11ef-8e53-0a00184fe694';


function Checkout() {
  document.title="Checkout";
  const location = useLocation();
  const { shippingMethod, shippingCost } = location.state || {};
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productImage, setProductImages] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [shippingInfo, setShippingInfo] = useState({});
  const user = jwtDecode(token);
  const [shippingCostState, setShippingCostState] = useState(0);
  const address = user.address; // "22 Đường số 9, Tăng Nhơn Phú B, Quận 9, Hồ Chí Minh, Việt Nam"
  const addressParts = address.split(',');
  const street = addressParts[0].trim(); // "22 Đường số 9"
  const ward = addressParts[1].trim(); // "Tăng Nhơn Phú B"
  const district = addressParts[2].trim(); // "Quận 9"
  const city = addressParts[3].trim(); // "Hồ Chí Minh"
  const country = addressParts[4].trim(); // "Việt Nam"


  useEffect(() => {
    if (user && user.userId) { // Kiểm tra xem user đã tồn tại và có thuộc tính userId không
      CartService.getCartItems(user.userId)
        .then((response) => {
          setCartItems(response.data);
          calculateTotal(response.data); 
          const carrt = response.data
          const productIds = carrt.map(Cart => Cart.product.id);
      
          const fetchImages = async () => {
           
  
            const fetchImageByProductId = async (id) => {
              try {
                const response = await axios.get(`http://localhost:9011/api/productimage/product/${id}`);
                if (response.status === 200) {
                  return response.data;
                }
              } catch (error) {
                console.error(`Error fetching images for product ${id}`, error);
                return [];
              }
            };
  
            const promises = productIds.map(id => fetchImageByProductId(id));
            const results = await Promise.all(promises);
  
            
            setProductImages(results);
          };
  
          if (productIds.length > 0) {
            fetchImages();
          }


        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((accumulator, item) => {
      return accumulator + item.price * item.qty;
    }, 0);
    setTotalAmount(total);
  };

//api tinh 

const getProvinceCode = async (cityName) => {
  try {
    const response = await axios.get(`${GHN_API_URL}/master-data/province`, {
      headers: {
        'Token': GHN_TOKEN
      }
    });
    const provinces = response.data.data;
    const province = provinces.find(province => province.ProvinceName.includes(cityName));
    console.log(province)
    return province ? province.ProvinceID : null;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return null;
  }
};

//api quận 

const getDistrictCode = async (provinceId, districtName) => {
  try {
    const response = await axios.post(`${GHN_API_URL}/master-data/district`, {
      "province_id": provinceId
    }, {
      headers: {
        'Token': GHN_TOKEN
      }
    });
    const districts = response.data.data;
    const district = districts.find(district => district.DistrictName.includes(districtName));
    console.log(district)
    return district ? district.DistrictID : null;
  } catch (error) {
    console.error('Error fetching districts:', error);
    return null;
  }
};
//api phường
const getWardCode = async (districtId, wardName) => {
  try {
    const response = await axios.post(`${GHN_API_URL}/master-data/ward`, {
      "district_id": districtId
    }, {
      headers: {
        'Token': GHN_TOKEN
      }
    });
    const wards = response.data.data;
    const ward = wards.find(ward => ward.WardName.includes(wardName));
    return ward ? ward.WardCode : null;
  } catch (error) {
    console.error('Error fetching wards:', error);
    return null;
  }
};



// api tinh thoi gian giao hang 
const calculateDeliveryTime = async (wardCode,districtCode) => {
  try {
    const response = await axios.post(`${GHN_API_URL}/v2/shipping-order/leadtime`, {
      "from_district_id": 1451, // Mã quận/huyện của kho hàng
      "to_district_id": districtCode,
      "service_id": shippingCost, // ID dịch vụ
      "from_ward_code": "20909", // Mã phường/xã của kho hàng
      "to_ward_code": wardCode
    }, {
      headers: {
        'Token': GHN_TOKEN
       
      }
    });
    const leadtime = response.data.data.leadtime;
    return leadtime ? new Date(leadtime * 1000) : null;
  } catch (error) {
    console.error('Error calculating delivery time:', error);
    return null;
  }
};

//api tinh phi van chuyen
console.log(shippingCost)

const calculateShippingCost = async (wardCode, districtCode) => {
  try {
    const response = await axios.post(`${GHN_API_URL}/v2/shipping-order/fee`, {
      "from_ward_code": "20909",
      "from_district_id": 1451,
      "service_id": shippingCost,
      "insurance_value": 0,
      "to_ward_code": wardCode,
      "to_district_id": districtCode,
      "weight":1200,
      "height":10,
      "length":1,
      "width":19,
     // Mã quận/huyện của kho hàng
    }, {
      headers: {
        'Token': GHN_TOKEN,
        'ShopId':192607
      }
    });
    const shippingFee = response.data.data.total;
    return shippingFee ? shippingFee : null; // Chuyển đổi từ đồng sang đơn vị tiền tệ của bạn
  } catch (error) {
    console.error('Error calculating shipping cost:', error);
    return null;
  }
};

useEffect(() => {
  const fetchShippingInfo = async () => {
    const provinceCode = await getProvinceCode(city);
    const districtCode = await getDistrictCode(provinceCode, district);
    const wardCode = await getWardCode(districtCode, ward);
    const deliveryTime = await calculateDeliveryTime(wardCode,districtCode);
    const shippingFee = await calculateShippingCost(wardCode, districtCode);
    setShippingCostState(shippingFee);
    setShippingInfo({ provinceCode, districtCode, wardCode, deliveryTime });
  };

  fetchShippingInfo();
}, [city, district, ward]);

 console.log(shippingInfo)
 console.log(shippingCostState)








  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const paymentData = [];
      cartItems.forEach((item) => {
        paymentData.push({
          amount:((item.price+shippingCost)/23000),
          currency: "USD",
          method: "paypal",
          intent: "sale",
          description: "Thanh Toan",
          idUser: user.userId,
          idProduct: item.product.id,
          status: "VERIFIED",
          quantity: item.qty,
          color: item.color,
          size: item.size,
          productname: item.product.name,
        });
      });

      
  
      const response = await fetch('http://localhost:9011/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
            'Authorization': `Bearer ${token}`
       
        },
        body: JSON.stringify(paymentData),
      });
  
      if (response.ok) {
        // Lấy đường link từ phản hồi API
        Swal.fire(
          "Checkout Successfully!",
          "You have successfully checked out your account!",
          "success"
        );
    

        
        const { approvalUrl } = await response.json();
  
        // Chuyển hướng người dùng đến trang thanh toán PayPal
        window.location.href = approvalUrl;
  
        // Log để kiểm tra
        console.log('Đã chuyển hướng đến trang thanh toán:', approvalUrl);
    
      }
    
  
     
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire(
        "Checkout Failed!",
        "There was an error while processing your payment!",
        "error"
      );
    }
  };

    return ( 
        <>
  <div className="page-wrapper">
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">
            Thanh toán<span>Shop</span>
          </h1>
        </div>
        {/* End .container */}
      </div>
      {/* End .page-header */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Trang chủ</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Giỏ hàng</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
               Thanh toán
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            {/* <div className="checkout-discount">
              <form action="#">
                <input
                  type="text"
                  className="form-control"
                  required=""
                  id="checkout-discount-input"
                />
                <label
                  htmlFor="checkout-discount-input"
                  className="text-truncate"
                >
                  Have a coupon? <span>Click here to enter your code</span>
                </label>
              </form>
            </div> */}
            {/* End .checkout-discount */}
            <form  >
              <div className="row">
                <div className="col-lg-7">
                  <h2 className="checkout-title"></h2>
                  {/* End .checkout-title */}
                  <div className="row">
                    <div className="col-sm-6">
                      <label>Name *</label>
                      <input type="text" value={user.name} className="form-control" required="" />
                    </div>
                    {/* End .col-sm-6 */}
                    <div className="col-sm-6">
                      <label>Phone *</label>
                      <input type="text" value={user.phone} className="form-control" required="" />
                    </div>
                    {/* End .col-sm-6 */}
                  </div>
   
                  <label>Address *</label>
                  <input type="text" value={user.address} className="form-control" required="" />
            
      
                  {/* End .row */}
                  <div className="row">
             
                  </div>
                  {/* End .row */}
                  <label>Email address *</label>
                  <input type="email" value={user.sub} className="form-control" required="" />
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkout-create-acc"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkout-create-acc"
                    >
                      Create an account?
                    </label>
                  </div>
                  {/* End .custom-checkbox */}
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkout-diff-address"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkout-diff-address"
                    >
                      Ship to a different address?
                    </label>
                  </div>
                  {/* End .custom-checkbox */}
                 
                </div>
                {/* End .col-lg-9 */}
                <aside className="col-lg-5">
                  <div className="summary">
                    <h3 className="summary-title">Chi tiết đơn đặt hàng</h3>
                    {/* End .summary-title */}
                    <table className="table table-summary" style={{ width: "100%", borderCollapse: "collapse" }}>
  <thead>
    <tr>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tên sản phẩm</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Kích thước</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Màu</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Số lượng</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tổng giá</th>
    </tr>
  </thead>
  <tbody>
    {cartItems.map((item, index) => (
      <tr key={index} >
        <td style={{ padding: "8px" }}>{index + 1}</td>
        <td style={{  padding: "8px" }}>
          <div className="product-image">
            {/* Hiển thị hình ảnh sản phẩm */}
            {Array.isArray(productImage) &&
              productImage.map((productArray) => {
                if (
                  Array.isArray(productArray) &&
                  productArray.length > 0
                ) {
                  const primaryProduct = productArray.find(
                    (product) => product.isPrimary === true
                  );

                  // Hiển thị hình ảnh nếu id sản phẩm trùng khớp
                  if (
                    primaryProduct &&
                    item.product.id === primaryProduct.product.id
                  ) {
                    return (
                      <img
                        key={primaryProduct.id}
                        src={`data:image/png;base64,${primaryProduct.imageData}`}
                        alt={primaryProduct.productname}
                        style={{ width: "100px", height: "100px" }}
                      />
                    );
                  }
                }
                return null;
              })}
          </div>
        </td>
        <td style={{ padding: "8px" }}>{item.size}</td>
        <td style={{  padding: "8px" }}>
          {/* Hiển thị màu */}
          <div
            className="color"
            style={{
              backgroundColor: item.color,
              width: "20px",
              height: "20px",
            
              display: "inline-block",
              marginRight: "5px",
            }}
          ></div>
        </td>
        <td style={{ padding: "8px" }}>{item.qty}</td>
        <td style={{ padding: "8px" }}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.qty)}
        </td>
      </tr>
    ))}
    <tr className="summary-subtotal">
      <td colSpan="5" style={{  padding: "8px" }}>Tổng:</td>
      <td style={{  padding: "8px" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</td>
    </tr>
    {/* End .summary-subtotal */}
    <tr>
      <td colSpan="5" style={{  padding: "8px" }}>Thời gian giao hàng ước tính:</td>
      <td style={{  padding: "8px" }}>
      {shippingInfo.deliveryTime ? (
                          <p> {shippingInfo.deliveryTime.toLocaleDateString()}</p>
                        ) : (
                          <p>Đang tính toán...</p>
                        )}
      </td>
     
      
    </tr>
    <tr>
    <td colSpan="5" style={{  padding: "8px" }}>Phí giao hàng:</td>
      <td style={{  padding: "8px" }}>
      {shippingCostState ? (
                          <p> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingCostState) }</p>
                        ) : (
                          <p>Đang tính toán...</p>
                        )}
      </td>


    </tr>
    <tr className="summary-total">
      <td colSpan="5" style={{ padding: "8px" }}>Tổng giá càn thanh toán:</td>
      <td style={{  padding: "8px" }}>
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount+shippingCost)} ≈ {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((totalAmount+shippingCost)/23000)}
      </td>
    </tr>
    {/* End .summary-total */}
  </tbody>
</table>

                    {/* End .table table-summary */}
                    <div className="accordion-summary" id="accordion-payment">
                  
                      {/* End .card */}

                      {/* End .card */}
                      <div className="card">
                        <div className="card-header" id="heading-4">
                          <h2 className="card-title">
                            <a
                              className="collapsed"
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-4"
                              aria-expanded="false"
                              aria-controls="collapse-4"
                            >
                               <SiPaypal size={30} style={{ color: '#003087' }} />
                              PayPal{" "}
                              <small className="float-right paypal-link">
                              Thanh toán Paypal là gì ?
                              </small>
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-4"
                          className="collapse"
                          aria-labelledby="heading-4"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                           
Thanh toán PayPal là quá trình sử dụng dịch vụ thanh toán trực tuyến PayPal để thực hiện các giao dịch mua bán hàng hóa hoặc dịch vụ qua Internet. PayPal là một trong những hình thức thanh toán điện tử phổ biến trên toàn thế giới, cho phép người dùng thanh toán mà không cần tiết lộ thông tin tài khoản ngân hàng hoặc thẻ tín dụng trực tiếp cho người bán
                          </div>
                          {/* End .card-body */}
                        </div>
                        {/* End .collapse */}
                      </div>
                      {/* End .card */}
  
                      {/* End .card */}
                    </div>
                    {/* End .accordion */}
                    <button
  type="button"
  className="btn btn-outline-primary-2 btn-order btn-block"
  onClick={handleCheckout} // Sử dụng sự kiện click thay vì submit
>
  <span className="btn-text">Thanh toán</span>
  <span className="btn-hover-text">Xác nhận thanh toán</span>
</button>
                  </div>
                  {/* End .summary */}
                </aside>
                {/* End .col-lg-3 */}
              </div>
              {/* End .row */}
            </form>
          </div>
          {/* End .container */}
        </div>
        {/* End .checkout */}
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

export default Checkout;