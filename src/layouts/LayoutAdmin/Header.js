import { Link } from "react-router-dom";

function Header() {
  return (
    <section className="header bg-primary" >
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand text-white"  style={{fontSize:'15px',fontWeight:'bold'}}to="/admin">
              Quản Trị
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                <li className="nav-item dropdown" style={{fontSize:'15px'}}>
                  <Link
                    className="nav-link dropdown-toggle text-white"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sản Phẩm
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/product">
                        Tất cả sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/category">
                        Danh mục
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/brand">
                        Thương hiệu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/contact">
                        Liên hệ
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/menu">
                        Menu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/order">
                        Hóa đơn
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/post">
                        Bài viết
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/slider">
                        Slider
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/topic">
                        Chủ đề
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item"style={{fontSize:'14px'}} to="/admin/user">
                        Người dùng
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item" style={{fontSize:'15px'}}>
                  <Link className="nav-link active text-white" aria-current="page" to="#">
                    Home
                  </Link>
                </li>
                <li className="nav-item" style={{fontSize:'15px'}}>
                  <Link className="nav-link text-white" to="#">
                    Link
                  </Link>
                </li>
                <li className="nav-item" style={{fontSize:'15px'}}>
                  <Link className="nav-link disabled text-white">Disabled</Link>
                </li>
              </ul>
   
            </div>
          </div>
        </nav>
      </div>
    </section>
  
  );
}

export default Header;