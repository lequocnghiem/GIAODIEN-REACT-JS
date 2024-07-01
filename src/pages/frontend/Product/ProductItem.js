import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import CartService from "../../../services/CartServices"; 
import WishlistService from "../../../services/WishlistServices";
import ProductService from "../../../services/ProductServices";
import { jwtDecode } from "jwt-decode";


function ProductItem(props) {
  const [cartItems, setCartItems] = useState([]);
  const [proudctsale, setproductsale] = useState('');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);


  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [inventory, setInventory] = useState([]);

 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // Giải mã token và trích xuất thông tin người dùng
      const decodedToken = jwtDecode(token);
      // ở đây bạn có thể lấy thông tin người dùng từ decodedToken và lưu vào state
      setUser(decodedToken);
    }
  }, []);

  // console.log(showModal)Hàm mở modal
  const handleShowModal = () => {
    setShowModal(true);
    fetchInventory();
  };
  const fetchInventory = async () => {
    try {
      const response = await fetch(`http://localhost:9011/api/productinventory/product/${props.product.id}`);
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching product inventory:', error);
    }
  };

  useEffect(() => {
   
    if (selectedSize && selectedColor) {
      const item = inventory.find(inv => inv.color.id == selectedColor && inv.size.id == selectedSize);
    
      setAvailableQuantity(item ? item.quantity : 0);
    }
  }, [selectedSize, selectedColor, inventory]);
 
  // Hàm đóng modal
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    CartService.getCartItems()
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  useEffect(() => {
    ProductService.getsaleproduct(props.product.id)
        .then(saleResponse => {
          if (saleResponse.data &&saleResponse.data!=null) {
          setproductsale(saleResponse.data)
          console.log(saleResponse.data)
          }
        }) .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }, []);
  

  const handleAddToCart = () => {
    if(user){
      console.log(selectedQuantity)
      if (selectedQuantity == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Thông Báo',
          text: 'Sản phẩm đang tạm hết hàng',
        });
        return;
      }
      const productData = {
        product: {
          id: props.product.id
        },
        price: proudctsale.salePrice ? proudctsale.salePrice : props.product.price,
      color: selectedColor ? props.product.colors.find(color => color.id == selectedColor).color : '',
        qty: selectedQuantity, // Assuming quantity is always 1 when adding to cart
        size: selectedSize ? props.product.sizes.find(size => size.id == selectedSize).size : '',
        user: {
          id: user.userId
        }
      };
      console.log(productData)
      CartService.addToCart(productData)
        .then(() => {
          Swal.fire(
           
            "Thêm vào giỏ hàng thành công",
            "success"
          );
          
          setSelectedSize("");
          setSelectedColor("");
          setSelectedQuantity(1);
         
        
      
        
          setShowModal(false);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
        setShowModal(false);
    }else{
      Swal.fire({
        icon: 'info', // Thay 'error' thành 'info'
        title: 'Thông Báo',
        text: 'Vui lòng đăng nhập trước',
      });
      
      setShowModal(false);
      return;
    }
   
  };
  //WISHLIST
  // useEffect(() => {
  //   WishlistService.getWishlistItems()
  //     .then((response) => {
  //       setWishlistItems(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching cart items:', error);
  //     });
  // }, []);
  // const handleAddToWishlist = () => {

  //   console.log("Adding to wishlist:", props.product.id,props.product.image); 
  //   WishlistService.addToWishlist(props.product.id,props.product.image)
  //     .then(() => {
   
  //       Swal.fire(
  //         "The product has been added to wishlist.",
  //         "Your product has been added to the wishlist!",
  //         "success"
  //       );
  //     })onClick={handleAddToWishlist} 
  //     .catch((error) => {
  //       console.error("Error adding to wishlist: ", error);
  //     });
  // };
  function getImageUrl(product) {
    const primaryImage = product.images.find(image => image.isPrimary === true);
    const secondaryImage = product.images.find(image => image.isPrimary === false);
    
    const imageUrl = primaryImage ? primaryImage.imageData : secondaryImage ? secondaryImage.imageData : '';
    const image2Url = secondaryImage ? secondaryImage.imageData : '';
    
    return { imageUrl, image2Url };
  }
  const { imageUrl, image2Url } = getImageUrl(props.product);
    return ( 
      <div className="col-6 col-md-4 col-lg-3 col-xl-5col">
      <div className="product product-11 text-center">
      <figure className="product-media">
      { proudctsale? (
  <span className="product-label label-circle label-sale">Sale</span>
) : null}

        <Link to={`/productdetail/${props.product.id}`}>
  <img
    src={`data:image/png;base64, ${imageUrl}`}
    className="product-image"
  />
  <img
    src={`data:image/png;base64, ${image2Url}`}
    className="product-image-hover"
  />
</Link>
          <div className="product-action-vertical">
            <a href="#" className="btn-product-icon btn-wishlist ">
              <span>add to wishlist</span>
            </a>
          </div>
          {/* End .product-action-vertical */}
        </figure>
        {/* End .product-media */}
        <div className="product-body">
          <div className="product-cat">
            <a href="#">{props.product.brand.name}</a>
          </div>
          {/* End .product-cat */}
          <h3 className="product-title">
          <a href="product.html">{props.product.name}</a>
          </h3>
          {/* End .product-title */}
          {proudctsale ? (
 <>
 <div style={{ textDecoration: 'line-through', color: '#999' }} className="product-price-sale">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.price)}</div>
    <div className="product-price">  <h6>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(proudctsale.salePrice)}</h6></div></>
) : (
  <div className="product-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.price)}</div>
)}
          {/* End .product-price */}
        </div>
        {/* End .product-body */}
        <div className="product-action">
          <a  onClick={handleShowModal}  className="btn-product btn-cart">
            
            <span>add to cart</span>
          </a>
        </div>
        {/* End .product-action */}
      </div>
      {showModal && (
        <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="modal-content" style={{ width: '400px', height: '400px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <span className="close" onClick={handleCloseModal} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>&times;</span>
            <h3 style={{ marginBottom: '20px' }}>Thêm vào giỏ hàng</h3>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} style={{ marginBottom: '10px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}>
              {props.product.sizes.map((size, index) => (
                <option key={index} style={{ fontSize: '16px', padding: '10px', borderRadius: '5px' }} value={size.id}>{size.size}</option>
              ))}
            </select>
            <div style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {props.product.colors.map((color, index) => (
                  <div key={index} className="color-item" style={{ backgroundColor: color.color, width: '35px', height: '35px', borderRadius: '50%', border: selectedColor === color.id ? '4px solid #DCDCDC' : '1px solid #ccc', cursor: 'pointer', marginRight: '10px' }} onClick={() => setSelectedColor(color.id)}></div>
                ))}
              </div>
            </div>
            {availableQuantity > 0 ? (
              <>
                <div style={{ marginBottom: '10px',color: 'red' }}>
                  Số lượng có sẵn: {availableQuantity}
                </div>
                <input
                  type="number"
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Math.min(e.target.value, availableQuantity))}
                  style={{ marginBottom: '10px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
                  min="1"
                  max={availableQuantity}
                />
              </>
            ) : (
              <div style={{ marginBottom: '10px', color: 'red' }}>
                Sản phẩm tạm hết hàng
              </div>
            )}
            <div className="modal-footer" style={{ textAlign: 'right' }}>
              <button className="btn-secondary" onClick={handleCloseModal} style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#ccc', color: '#fff', cursor: 'pointer' }}>Đóng</button>
              <button className="btn-primary" onClick={handleAddToCart} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}>Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
      )}
    </div>

     );
}

export default ProductItem;