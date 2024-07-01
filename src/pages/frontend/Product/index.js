import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CategoryServices from '../../../services/CategoryServices';
import BrandServices from '../../../services/BrandServices';
import ProductServices from '../../../services/ProductServices';
import ProductItem from './ProductItem';
function Product() {
    document.title="Product";
    const { categoryId } = useParams();
    const {brandId} = useParams();
  
    const [categories, setCategories] = useState([]);
    const [brands, setBrand] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage  = 15;

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
  
 
  

    const combinedData = products.map(product => {
      // Lọc ra những hình ảnh có id sản phẩm trùng khớp với id sản phẩm hiện tại
      const correspondingImages = productImages.filter(image => image.product.id == product.id);
    
      // Trả về mảng các hình ảnh tương ứng với sản phẩm hiện tại
      return {
          ...product,
          images: correspondingImages
      };
  });

  
  useEffect(() => {
    CategoryServices.getAll()
      .then(response => {
        setCategories(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    BrandServices.getAll()
      .then(response => {
        setBrand(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
//color
  useEffect(() => {
    ProductServices.getAllColors()
      .then(response => {
        setColor(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  //size
  useEffect(() => {
    ProductServices.getAllSizes ()
      .then(response => {
        setSize(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  //checkbox category
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    // Kiểm tra xem idcategoryId có tồn tại hay không
    if (categoryId) {
        // Nếu tồn tại, cập nhật selectedCategories với mảng chứa idcategoryId
        setSelectedCategories(categoryId)
    }
}, [categoryId]);
  
  const handleCheckboxChange = (categoryId) => {
    const updatedSelectedCategories = [...selectedCategories];
    const index = updatedSelectedCategories.indexOf(categoryId);
    if (index === -1) {
      updatedSelectedCategories.push(categoryId);
    } else {
      updatedSelectedCategories.splice(index, 1);
    }
    setSelectedCategories(updatedSelectedCategories);
  };
  //checkbox brand
  const [selectedBrands, setSelectedBrands] = useState([]);
  useEffect(() => {
    // Kiểm tra xem idcategoryId có tồn tại hay không
    if (brandId) {
        // Nếu tồn tại, cập nhật selectedCategories với mảng chứa idcategoryId
        setSelectedBrands(brandId)
    }
}, [brandId]);

  const handleCheckboxChangeBrand = (brandId) => {
    console.log(brandId)
    const updatedSelectedBrands = [...selectedBrands];
    const index = updatedSelectedBrands.indexOf(brandId);
    if (index === -1) {
      updatedSelectedBrands.push(brandId);
    } else {
      updatedSelectedBrands.splice(index, 1);
    }
    setSelectedBrands(updatedSelectedBrands);
  };


  const getCategoryItemCount = (categoryId) => {
    const categoryProducts = products.filter(product => product.category.id == categoryId);
  
    return categoryProducts.length;
  };
  //

  const getBrandItemCount = (brandId) => {
    const brandProducts = products.filter(product => product.brand.id == brandId);
  console.log(brandProducts)
    return brandProducts.length;
  };
  
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const currentProducts = combinedData.slice(indexOfFirstProducts, indexOfLastProducts);
  
// Khai báo state cho danh sách các màu đã chọn
const [selectedColors, setSelectedColors] = useState([]);

// Gọi hàm handleCheckboxChangeColor khi người dùng thay đổi checkbox màu
const handleCheckboxChangeColor = (colorCode) => {
  const updatedSelectedColors = [...selectedColors];
  const index = updatedSelectedColors.indexOf(colorCode);
  if (index === -1) {
    // Nếu màu sắc chưa được chọn, thêm vào danh sách các màu đã chọn
    updatedSelectedColors.push(colorCode);
  } else {
    // Nếu màu sắc đã được chọn, loại bỏ khỏi danh sách các màu đã chọn
    updatedSelectedColors.splice(index, 1);
  }
  // Cập nhật state với danh sách các màu đã chọn mới
  setSelectedColors(updatedSelectedColors);
};


const [selectedSizes, setSelectedSizes] = useState([]);

const handleCheckboxChangeSize = (sizeId) => {
  const updatedSelectedSizes = [...selectedSizes];
  const index = updatedSelectedSizes.indexOf(sizeId);
  if (index === -1) {
    updatedSelectedSizes.push(sizeId);
  } else {
    updatedSelectedSizes.splice(index, 1);
  }
  setSelectedSizes(updatedSelectedSizes);
};


  
    return ( 
        <>
  <div className="page-wrapper">
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Trang chủ</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Cửa hàng</a>
            </li>
            {/* <li className="breadcrumb-item active" aria-current="page">
              Grid 4 Columns
            </li> */}
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="toolbox">
                <div className="toolbox-left">
                  <div className="toolbox-info">
                    {/* Showing <span>9 of 56</span> Products */}
                  </div>
                  {/* End .toolbox-info */}
                </div>
                {/* End .toolbox-left */}
                <div className="toolbox-right">
                  <div className="toolbox-sort">
                    <label htmlFor="sortby">Sort by:</label>
                    <div className="select-custom">
                      <select
                        name="sortby"
                        id="sortby"
                        className="form-control"
                      >
                        <option value="popularity" selected="selected">
                          Most Popular
                        </option>
                        <option value="rating">Most Rated</option>
                        <option value="date">Date</option>
                      </select>
                    </div>
                  </div>
                  {/* End .toolbox-sort */}
                  <div className="toolbox-layout">
                    <a href="category-list.html" className="btn-layout">
                      <svg width={16} height={10}>
                        <rect x={0} y={0} width={4} height={4} />
                        <rect x={6} y={0} width={10} height={4} />
                        <rect x={0} y={6} width={4} height={4} />
                        <rect x={6} y={6} width={10} height={4} />
                      </svg>
                    </a>
                    <a href="category-2cols.html" className="btn-layout">
                      <svg width={10} height={10}>
                        <rect x={0} y={0} width={4} height={4} />
                        <rect x={6} y={0} width={4} height={4} />
                        <rect x={0} y={6} width={4} height={4} />
                        <rect x={6} y={6} width={4} height={4} />
                      </svg>
                    </a>
                    <a href="category.html" className="btn-layout">
                      <svg width={16} height={10}>
                        <rect x={0} y={0} width={4} height={4} />
                        <rect x={6} y={0} width={4} height={4} />
                        <rect x={12} y={0} width={4} height={4} />
                        <rect x={0} y={6} width={4} height={4} />
                        <rect x={6} y={6} width={4} height={4} />
                        <rect x={12} y={6} width={4} height={4} />
                      </svg>
                    </a>
                    <a href="category-4cols.html" className="btn-layout active">
                      <svg width={22} height={10}>
                        <rect x={0} y={0} width={4} height={4} />
                        <rect x={6} y={0} width={4} height={4} />
                        <rect x={12} y={0} width={4} height={4} />
                        <rect x={18} y={0} width={4} height={4} />
                        <rect x={0} y={6} width={4} height={4} />
                        <rect x={6} y={6} width={4} height={4} />
                        <rect x={12} y={6} width={4} height={4} />
                        <rect x={18} y={6} width={4} height={4} />
                      </svg>
                    </a>
                  </div>
                  {/* End .toolbox-layout */}
                </div>
                {/* End .toolbox-right */}
              </div>
              {/* End .toolbox */}
              <div className="products mb-3">
                <div className="row justify-content">
                {currentProducts
                .filter((item) =>
                  (selectedCategories.length === 0 || selectedCategories.includes(item.category.id))
                  && (selectedBrands.length === 0 || selectedBrands.includes(item.brand.id))
                  && (!selectedColors.length || (item.colors && item.colors.map(color => color.id).some(colorId => selectedColors.includes(colorId))))
                  && (!selectedSizes.length || (item.sizes && item.sizes.map(size => size.id).some(sizeId => selectedSizes.includes(sizeId)))
                )
                  
                )
                .map((combinedItem, index) => (
                  <ProductItem product={combinedItem} key={index} />
                ))}

                  {/* End .col-sm-6 col-lg-4 col-xl-3 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .products */}
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a
                      className="page-link page-link-prev"
                      href="#"
                      aria-label="Previous"
                      tabIndex={-1}
                      aria-disabled="true"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <span aria-hidden="true">
                        <i className="icon-long-arrow-left" />
                      </span>
                      Prev
                    </a>
                  </li>
                  {Array.from({ length: Math.ceil(combinedData.length / productsPerPage) }, (_, index) => (
                  <li className="page-item active" aria-current="page">
                     <a className="page-link" href="#" onClick={() => paginate(index + 1)}>
                    {index + 1}
                    </a>
                  </li>
                   ))}
                  
           
                  <li className={`page-item ${currentPage === Math.ceil(combinedData.length / productsPerPage) ? 'disabled' : ''}`}>                    <a
                      className="page-link page-link-next"
                      href="#"
                      aria-label="Next"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(combinedData.length / productsPerPage)}
                    >
                      Next{" "}
                      <span aria-hidden="true">
                        <i className="icon-long-arrow-right" />
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            {/* End .col-lg-9 */}
            <aside className="col-lg-3 order-lg-first">
              <div className="sidebar sidebar-shop">
                {/* <div className="widget widget-clean">
                  <label>Filters:</label>
                  <a href="#" className="sidebar-filter-clear">
                    Clean All
                  </a>
                </div> */}
                {/* End .widget widget-clean */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a
                      data-toggle="collapse"
                      href="#widget-1"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-1"
                    >
                      Danh mục
                    </a>
                  </h3>
                  {/* End .widget-title */}
                  <div className="collapse show" id="widget-1">
                    <div className="widget-body">
                      <div className="filter-items filter-items-count">
                      {categories.map((category, index) => (
                        <div className="filter-item" key={index}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`cat-${index + 1}`}
                              onChange={() => handleCheckboxChange(category.id)}
                              checked={selectedCategories.includes(category.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`cat-${index + 1}`}
                            >
                              {category.name}
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <span className="item-count">{getCategoryItemCount(category.id)}</span>
                        </div>
                      ))}
                        {/* End .filter-item */}
                      </div>
                      {/* End .filter-items */}
                    </div>
                    {/* End .widget-body */}
                  </div>
                  {/* End .collapse */}
                </div>
                {/* End .widget */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a
                      data-toggle="collapse"
                      href="#widget-2"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-2"
                    >
                      Kích thước
                    </a>
                  </h3>
                  {/* End .widget-title */}
                  <div className="collapse show" id="widget-2">
                    <div className="widget-body">
                      <div className="filter-items">
                      {size.map((sizeItem, index) => (
  <div key={index} className="filter-item">
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id={`size-${index}`}
        // Xử lý sự kiện khi thay đổi trạng thái của checkbox
        onChange={() => handleCheckboxChangeSize(sizeItem.id)}
        // Kiểm tra xem kích thước này có được chọn hay không
        checked={selectedSizes.includes(sizeItem.id)}
      />
      <label
        className="custom-control-label"
        htmlFor={`size-${index}`}
      >
        {sizeItem.size}
      </label>
    </div>
    {/* End .custom-checkbox */}
  </div>
))}
                        {/* End .filter-item */}
                      </div>
                      {/* End .filter-items */}
                    </div>
                    {/* End .widget-body */}
                  </div>
                  {/* End .collapse */}
                </div>
                {/* End .widget */}
               
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a
                      data-toggle="collapse"
                      href="#widget-3"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-3"
                    >
                     Màu sắc
                    </a>
                  </h3>
                  {/* End .widget-title */}
                  <div className="collapse show" id="widget-3">
                    <div className="widget-body">
                      <div className="filter-colors">
                      {color.map((colorItem, index) => (
  <div key={index} className="filter-item">
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id={`color-${index}`}
        onChange={() => handleCheckboxChangeColor(colorItem.id)}
        checked={selectedColors.includes(colorItem.id)}
      />
      <a
        href="#"
        className={`color-link ${selectedColors.includes(colorItem.id) ? 'selected' : ''}`}
        style={{ background: colorItem.color }}
        onClick={(e) => {
          e.preventDefault();
          handleCheckboxChangeColor(colorItem.id);
        }}
      />
    </div>
    {/* End .custom-checkbox */}
  </div>
))}

                      </div>
                      {/* End .filter-colors */}
                    </div>
                    {/* End .widget-body */}
                  </div>
                  {/* End .collapse */}
                </div>
                {/* End .widget */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a
                      data-toggle="collapse"
                      href="#widget-4"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-4"
                    >
                      Thương hiệu
                    </a>
                  </h3>
                <div className="collapse show" id="widget-4">
                    <div className="widget-body">
                      <div className="filter-items filter-items-count">
                      {brands.map((brand, index) => (
                        <div className="filter-item" key={index}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`bra-${index + 1}`}
                              onChange={() => handleCheckboxChangeBrand(brand.id)}
                              checked={selectedBrands.includes(brand.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`bra-${index + 1}`}
                            >
                              {brand.name}
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <span className="item-count">{getBrandItemCount(brand.id)}</span>
                        </div>
                      ))}
                        {/* End .filter-item */}
                      </div>
                      {/* End .filter-items */}
                    </div>
                    {/* End .widget-body */}
                  </div>
                  </div>
                {/* End .widget */}
               
                {/* End .widget */}
              </div>
              {/* End .sidebar sidebar-shop  */}
            </aside>
            {/* End .col-lg-3 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
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

export default Product;