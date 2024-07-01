import { useEffect, useState } from "react";
import Category from "./Category";
import Login from "./Login";
import Menu from "./Menu";
import Swal from 'sweetalert2';
import CartHeader from "./CartHeader";
import WishlistService from "../../services/WishlistServices";
import CartService from "../../services/CartServices";
import {jwtDecode} from "jwt-decode";
import'./seach.css';
import ProductServices from '../../services/ProductServices';
import { Link } from "react-router-dom";
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); //
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchUserData();
  };


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


  const handleLogout = () => {
    localStorage.removeItem('accessToken');

    Swal.fire({
      title: 'Are You Sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Signed Out!',
          'You have logged out of your account',
          'success'
        );
        setIsLoggedIn(false);
        setUser(null);
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      updateWishlistItemCount();
      updateCartItemCount();
    }
  }, [isLoggedIn]);

  const fetchUserData = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  };

  const updateWishlistItemCount = () => {
    WishlistService.getWishlistItems()
      .then((response) => {
        setWishlistItemCount(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching wishlist items:', error);
      });
  };

  const updateCartItemCount = () => {
    if (user && user.userId) {
      CartService.getCartItems(user.userId)
        .then((response) => {
          setCartItemCount(response.data.length);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }
  };

   useEffect(() => {
    const intervalId = setInterval(() => {
      updateCartItemCount();
    }, 1000); // 1 second interval

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [updateCartItemCount]);




  

  const fetchProducts = (searchTerm) => {
    fetch(`http://localhost:9011/api/product/search/${encodeURIComponent(searchTerm)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSearchResults(data);
        setShowSearchResults(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


  const combinedData = searchResults.map(product => {
    // Lọc ra những hình ảnh có id sản phẩm trùng khớp với id sản phẩm hiện tại
    const correspondingImages = productImages.filter(image => image.product.id === product.id && image.isPrimary == true);

    // Trả về mảng các hình ảnh tương ứng với sản phẩm hiện tại
    return {
        ...product,
        images: correspondingImages
    };
});


  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchProducts(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Thực hiện tìm kiếm và cập nhật combinedData
    fetchProducts();
  };

  const handleProductClick = () => {
    // Đặt lại giá trị ô tìm kiếm về null
    setSearchTerm('');
  };

  return (
    <header className="header header-2 header-intro-clearance">
      <Login onLoginSuccess={handleLoginSuccess} />
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <p>Special collection already available.</p>
            <a href="#">&nbsp;Read more ...</a>
          </div>
          <div className="header-right">
            <ul className="top-menu">
              <li>
                <a href="#">Links</a>
                <ul>
                  <li>
                    <div className="header-dropdown">
                      <a href="#">USD</a>
                      <div className="header-menu">
                        <ul>
                          <li><a href="#">Eur</a></li>
                          <li><a href="#">Usd</a></li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="header-dropdown">
                      <a href="#">English</a>
                     
                    </div>
                  </li>
                  <li>
                    {isLoggedIn ? (
                      <a href="#signin-modal" onClick={handleLogout} data-toggle="modal">
                        Đăng xuất
                      </a>
                    ) : (
                      <a href="#signin-modal" data-toggle="modal">
                        Sign in / Sign up
                      </a>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-middle">
        <div className="container">
          <div className="header-left">
            <button className="mobile-menu-toggler">
              <span className="sr-only">Toggle mobile menu</span>
              <i className="icon-bars" />
            </button>
            <a href="/" className="logo">
              <img
                src="assets/images/demos/demo-2/logo.png"
                alt="Molla Logo"
                width={105}
                height={25}
              />
            </a>
          </div>
          <div className="header-center">
      <div className="header-search header-search-extended header-search-visible header-search-no-radius  d-lg-block" >
        <form onSubmit={handleSearchSubmit}>
          <div className="header-search-wrapper search-wrapper-wide">
            <label htmlFor="q" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="q"
              id="q"
              placeholder="Search product ..."
              value={searchTerm}
              onChange={handleInputChange}
              required
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </div>
        </form>
      </div>
      {/* Dropdown-menu kết quả tìm kiếm slice(0, 3) */}
      <div className={`search-results ${combinedData.length > 0 ? 'show' : ''}`}>
        <ul>
        {combinedData.map((product) => (
       
                    <li key={product.id}>
                         
                        <Link to={`/productdetail/${product.id}`} onClick={handleProductClick}>
          <img src={`data:image/png;base64, ${product.images[0].imageData}`} alt={product.name} />
                     
                      <div className="product-details">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                      </div>
                       </Link>
                    </li>
                   
                  ))}
        
        </ul>
      </div>
    </div>


          
          <div className="header-right">
          <div className="header-dropdown">
  <div className="account">
    <a href="dashboard.html" title="My account">
      <div className="icon">
        <i className="icon-user" />
      </div>
      <p>{user ? user.name : "Account"}</p>
    </a>
    
  </div>
  {user && (
  <div className="header-menu" style={{ marginRight: '-20px' }}>
                        <ul>
                    
        <Link to="/order" style={{ display: 'flex', alignItems: 'center' }}>
          <i className="icon-shopping-cart" style={{ marginRight: '5px', fontSize: '20px' }} />
          <span style={{ fontSize: '15px' }}>Đơn Hàng</span>
        </Link>
         
                        </ul>
                      </div>
                       )}
</div>

            <div className="wishlist">
              <a href="/wishlist" title="Wishlist">
                <div className="icon">
                  <i className="icon-heart-o" />
                  <span className="wishlist-count badge">{wishlistItemCount}</span>
                </div>
                <p>Wishlist</p>
              </a>
            </div>
            <div className="dropdown cart-dropdown">
              <a
                href="/cart"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static"
              >
                <div className="icon">
                  <i className="icon-shopping-cart" />
                  <span className="cart-count">{cartItemCount}</span>
                </div>
                <p>Cart</p>
              </a>
              <CartHeader />
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom sticky-header">
        <div className="container">
          <div className="header-left">
            <Category />
          </div>
          <Menu />
          <div className="header-right">
            <i className="la la-lightbulb-o" />
            <p>
              Clearance<span className="highlight">&nbsp;Up to 30% Off</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
