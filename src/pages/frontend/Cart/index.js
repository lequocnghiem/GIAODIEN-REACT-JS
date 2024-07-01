import React, { useContext, useEffect, useState } from "react";
import CartService from "../../../services/CartServices"; 
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const GHN_API_URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api';
const GHN_TOKEN = '45e0175b-2d97-11ef-8e53-0a00184fe694';
function Cart() {
  document.title="Cart";
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [user, setUser] = useState(null);
  const [productImage, setProductImages] = useState([]);



  const [shippingServices, setShippingServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');


  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // Giải mã token và trích xuất thông tin người dùng
      const decodedToken = jwtDecode(token);
      // ở đây bạn có thể lấy thông tin người dùng từ decodedToken và lưu vào state
      setUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (user && user.address) { // Ensure user object and address property exist
      const addressParts = user.address.split(',');
      setStreet(addressParts[0].trim());
      setWard(addressParts[1].trim());
      setDistrict(addressParts[2].trim());
      setCity(addressParts[3].trim());
      setCountry(addressParts[4].trim());
    }
  }, [user]); // Run this effect whenever user object changes

  useEffect(() => {
    if (user && user.userId) { 
      
      
      
      // Kiểm tra xem user đã tồn tại và có thuộc tính userId không
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
  
            // results.forEach((result, index) => {
            //   imagesMap[productIds[index]] = result;
            // });
  
            // Lưu danh sách hình ảnh vào state
            setProductImages(results);
          };
  
          // Gọi hàm fetchImages để lấy danh sách hình ảnh khi có productIds
          if (productIds.length > 0) {
            fetchImages();
          }


        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [user]);

console.log(productImage)
  
    const removeItem = (productId) => {
      
      CartService.removeFromCart(productId)
        .then((response) => {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              setCartItems((prevCartItems) => prevCartItems.filter(item => item.product.id !== productId));

              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
        
            }
          })
        })
        .catch((error) => {
          console.error('Error removing item from cart:', error);
        });
    };
  const calculateTotal = (items) => {
    const total = items.reduce((accumulator, item) => {
      return accumulator + item.price * item.qty;
    }, 0);
    setTotalAmount(total);
  };
  const handleChangeQuantity = (productId, newQuantity,color,size) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, qty: parseInt(newQuantity, 10),color,size};
      }
      return item;
    });
  
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
    const token = localStorage.getItem("accessToken");
  
    const queryParams = new URLSearchParams({
      qty: newQuantity,
      color:color,
      size:size

    }).toString();
  
    fetch(`http://localhost:9011/api/cart/${productId}?${queryParams}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success
      console.log('Cart updated successfully');
    })
    .catch(error => {
      // Handle error
      console.error('There was a problem updating the cart:', error);
    });
  };
  
  
  function getImageUrl(product) {
    const primaryImage = product.images.find(image => image.isPrimary === true);
    const secondaryImage = product.images.find(image => image.isPrimary === false);
    
    const imageUrl = primaryImage ? primaryImage.imageData : secondaryImage ? secondaryImage.imageData : '';
    const image2Url = secondaryImage ? secondaryImage.imageData : '';
    
    return { imageUrl, image2Url };
  }

  const handleFreeShippingChange = (serviceId) => {
    setSelectedShippingMethod('Giao hàng nhanh');
    
    setSelectedService(serviceId);
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
//danh sach dich vu 
const listservice = async (districtCode) => {
  try {
    const response = await axios.post(`${GHN_API_URL}/v2/shipping-order/available-services`, {
      "shop_id":192607,
      "from_district":1451,
      "to_district": districtCode
    }, {
      headers: {
        'Token': GHN_TOKEN,
      }
    });

    const totalServices = response.data.data;

    // Map over the services and extract service_id
    // const serviceIds = totalServices.map(service => service.service_id);

    return totalServices;
  } catch (error) {
    console.error('Error fetching shipping services:', error);
    return [];
  }
};





useEffect(() => {
  const fetchShippingInfo = async () => {
    const provinceCode = await getProvinceCode(city);
    const districtCode = await getDistrictCode(provinceCode, district);
    console.log(districtCode  )
    const wardCode = await getWardCode(districtCode, ward);
    const listservicee = await listservice(districtCode);
    console.log(listservicee  )
    setShippingServices(listservicee)
  };
  if (city && district && ward) {
    fetchShippingInfo();
  }
}, [city, district, ward]);



  const navigate = useNavigate();
const handleProceedToCheckout = () => {
  if (selectedService ) {
    navigate('/checkout', { state: { shippingMethod: selectedShippingMethod,shippingCost: selectedService } });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Please select a shipping method before proceeding to checkout.'
    });
  }
};


  console.log(shippingServices)

  
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
            Giỏ hàng<span>Shop</span>
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
              <a href="#">Cửa hàng</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Giỏ hàng
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <table className="table table-cart table-mobile">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th style={{ padding: "8px" }}>Kích thước</th>
      <th style={{ padding: "8px" }}>Màu</th>
      <th style={{ padding: "8px" }}>Số lượng</th>
                      <th>Tổng giá:</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                  {cartItems.map((item) => (
                    
                    <tr key={item.id}>
                        <td>
      {Array.isArray(productImage) && productImage.map(productArray => {
        // Kiểm tra xem productArray có phải là một mảng và có phần tử hay không
        if (Array.isArray(productArray) && productArray.length > 0) {
          const primaryProduct = productArray.find(product => product.isPrimary === true);
      
          if (primaryProduct && item.product.id == primaryProduct.product.id) {
           
            return (
              <img
                key={primaryProduct.id}
                src={`data:image/png;base64,${primaryProduct.imageData}`}
                alt={primaryProduct.productname}
                style={{ width: '100px', height: '100px' }}
              />
            );
          }
        }
        return null;
      })}
    </td>
                      <td className="product-col">
                        <div className="product">
                          {/* <figure className="product-media">
                          <Link to={`/productdetail/${item.product.id}`}>
  <img
    src={`data:image/png;base64, ${imageUrl}`}
    className="product-image"
  />
</Link>
                          </figure> */}
                          <h3 className="product-title">
                            <Link to={`/productdetail/${item.product.id}`}>{item.product.name}</Link>
                          </h3>
                          {/* End .product-title */}
                        </div>
                       
                      </td>
                    
                      <td className="price-col">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                      <td>
                      <div>
                       {item.size}
                       </div>
                       </td>
                       <td>
      {/* Hiển thị màu */}
      <div className="color" style={{ backgroundColor: item.color, width: '20px', height: '20px' }}></div>
    </td>
                      <td className="quantity-col">
                        <div className="cart-product-quantity">
                          <input
                            type="number"
                            className="form-control"
                            defaultValue={item.qty}
                            min={1}
                            max={10}
                            step={1}
                            data-decimals={0}
                            required=""
                            onChange={(e) => handleChangeQuantity(item.id, e.target.value,item.color,item.size)}
                          />
                        </div>
                        {/* End .cart-product-quantity */}
                      </td>
                      <td className="total-col">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.qty)}</td>
                      <td className="remove-col">
                        <button className="btn-remove"
                        onClick={() => removeItem(item.id)}>
                          <i className="icon-close" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                {/* End .table table-wishlist */}
                <div className="cart-bottom">
                  <div className="cart-discount">
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          placeholder="coupon code"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-primary-2"
                            type="submit"
                          >
                            <i className="icon-long-arrow-right" />
                          </button>
                        </div>
                        {/* .End .input-group-append */}
                      </div>
                      {/* End .input-group */}
                    </form>
                  </div>
                  {/* End .cart-discount */}
                  <a  className="btn btn-outline-dark-2"
                  onClick={() => window.location.reload()}>
                    <span>Cập nhật giỏ hàng</span>
                    <i className="icon-refresh" />
                  </a>
                </div>
                {/* End .cart-bottom */}
              </div>
              {/* End .col-lg-9 */}
              <aside className="col-lg-3">
                <div className="summary summary-cart">
                  <h3 className="summary-title">Tổng giỏ hàng</h3>
                  {/* End .summary-title */}
                  <table className="table table-summary">
                    <tbody>
                    
                      {/* End .summary-subtotal */}
                      <tr className="summary-shipping">
                        <td>Đơn vị vận chuyển:</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr className="summary-shipping-row">
  <td colSpan="2">
    <div className="custom-control custom-radio">
      <input
        type="radio"
        id="free-shipping"
        name="shipping"
        className="custom-control-input"
        onChange={handleFreeShippingChange}
        value="Giao hàng nhanh"
        checked={selectedShippingMethod === 'Giao hàng nhanh'}
      />
      <label className="custom-control-label" htmlFor="free-shipping">
        Giao hàng nhanh
      </label>
    </div>
    {/* End .custom-control */}
    
    {/* Hiển thị danh sách dịch vụ vận chuyển */}
    {selectedShippingMethod === 'Giao hàng nhanh' && shippingServices.length > 0 && (
      <div style={{ 
      
        padding: '10px', /* Khoảng cách nội dung */
        maxHeight: '300px', /* Chiều cao tối đa */
        overflowY: 'auto' /* Cho phép cuộn nếu nội dung dài */
      }}>
        <label style={{ 
          display:'flex',
          justifyItems:'center',
         textAlign:'center',
          fontWeight: 'initial', /* Độ dày của chữ */
          marginBottom: '10px', /* Khoảng cách dưới nhãn */
          
        }}>
          Danh sách dịch vụ
        </label>
        <ul style={{ 
          listStyleType: 'none', /* Bỏ dấu đầu dòng */
          paddingLeft: '0', /* Khoảng cách bên trái */
          marginTop: '0', /* Loại bỏ khoảng trống đầu danh sách */
          maxHeight: '250px', /* Chiều cao tối đa danh sách */
          overflowY: 'auto' /* Cho phép cuộn nếu danh sách dài */
        }}>
          {shippingServices.map(service => (
            
            <li key={service.service_id} style={{ marginBottom: '5px' /* Khoảng cách giữa các mục */ }}>
              <label style={{ 
                display: 'flex', /* Hiển thị theo hàng ngang */
                alignItems: 'center', /* Căn chỉnh theo chiều dọc */
                cursor: 'pointer', /* Chuyển đổi con trỏ chuột */
                padding: '5px' /* Khoảng cách nội dung bên trong */
                
              }}>
                <input
                style={{marginRight:'10px'}}
                  type="radio"
                  name="selectedService"
                  value={service.service_id}
                  onChange={() => handleFreeShippingChange(service.service_id)}
                />
                {service.short_name} 
              </label>
            </li>
          ))}
        </ul>
      </div>
    )}
  </td>
</tr>




{/* Hiển thị danh sách dịch vụ vận chuyển */}

                      {/* End .summary-shipping-row */}
                    
                      {/* End .summary-shipping-row */}
                 
                      {/* End .summary-shipping-estimate */}
                      <tr className="summary-total">
                        <td>Tổng giá:</td>
                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</td>
                      </tr>
                      {/* End .summary-total */}
                    </tbody>
                  </table>
                  {/* End .table table-summary */}
                  <a
                
                    onClick={handleProceedToCheckout}
                    className="btn btn-outline-primary-2 btn-order btn-block"
                  >
                    Tiến Hành Thanh Toán
                  </a>
                </div>
                {/* End .summary */}
                <a
                  href="/"
                  className="btn btn-outline-dark-2 btn-block mb-3"
                >
                  <span>CONTINUE SHOPPING</span>
                  <i className="icon-refresh" />
                </a>
              </aside>
              {/* End .col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .cart */}
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

export default Cart;