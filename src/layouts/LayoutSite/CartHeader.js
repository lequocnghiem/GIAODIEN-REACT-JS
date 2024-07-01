import Swal from "sweetalert2";
import CartService from "../../services/CartServices";
import React, { useContext, useEffect, useState, useCallback } from "react";
import {jwtDecode} from "jwt-decode";
import ProductService from "../../services/ProductServices";

function CartHeader() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  const fetchCartItems = useCallback(() => {
    if (user && user.userId) {
      CartService.getCartItems(user.userId)
        .then((response) => {
          setCartItems(response.data);
          calculateTotal(response.data);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
    const intervalId = setInterval(fetchCartItems, 1000); // Update cart items every 1 second

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [fetchCartItems]);

  const removeItem = (productId) => {
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
        CartService.removeFromCart(productId)
          .then((response) => {
            setCartItems((prevCartItems) => prevCartItems.filter(item => item.product.id !== productId));
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
          })
          .catch((error) => {
            console.error('Error removing item from cart:', error);
          });
      }
    });
  };

  const calculateTotal = (items) => {
    const total = items.reduce((accumulator, item) => {
      return accumulator + item.price * item.qty;
    }, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    ProductService.getProductImage()
      .then((response) => {
        setProductImage(response.data.content);
      })
      .catch((error) => {
        console.error('Error fetching product images:', error);
      });
  }, []);

  const combinedData = cartItems.map(cart => {
    const correspondingImages = productImage.filter(image => image.product.id === cart.product.id && image.isPrimary === true);
    return {
      ...cart,
      correspondingImages
    };
  });

  return (
    <div className="dropdown-menu dropdown-menu-right">
      <div className="dropdown-cart-products">
        {cartItems.map((item) => {
          const correspondingImage = combinedData.find(cart => cart.id === item.id)?.correspondingImages[0];
          return (
            <div className="product" key={item.id}>
              <div className="product-cart-details">
                <h4 className="product-title">
                  <a href="product.html">{item.product.name}</a>
                </h4>
                <span className="cart-product-info">
                <span className="cart-product-qty">Số Lượng: {item.qty}</span> Giá: {(item.price * item.qty).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              </div>
              {correspondingImage && (
                <figure className="product-image-container">
                  <a href="product.html" className="product-image">
                    <img src={`data:image/png;base64, ${correspondingImage.imageData}`} alt="Product" />
                  </a>
                </figure>
              )}
              <a href="#" className="btn-remove" title="Remove Product" onClick={() => removeItem(item.id)}>
                <i className="icon-close" />
              </a>
            </div>
          );
        })}
      </div>
      <div className="dropdown-cart-total">
        <span>Tổng giá:</span>
        <span className="cart-total-price">{(totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))}</span>
      </div>
      <div className="dropdown-cart-action" style={{ paddingLeft: '140px' }}>
        <a href="/cart" className="btn btn-primary">
          Xem giỏ hàng
        </a>
      </div>
    </div>
  );
}

export default CartHeader;
