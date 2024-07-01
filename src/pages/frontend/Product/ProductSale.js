import { useEffect, useState } from "react";
import ProductServices from '../../../services/ProductServices';
import ProductSaleItem from "./ProductSaleItem";

function ProductSale() {
    const [productsales, setProductsales] = useState([]);
    const [productImages, setProductImages] = useState([]);
    // const getImgUrl = (imageName) => {
    //     const endpoint = 'productsale'; 
    //     return `http://localhost:8081/api/${endpoint}/image/${imageName}`;
    //   };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const [productsResponse, productImagesResponse] = await Promise.all([
              ProductServices.getProductSale(),
              ProductServices.getProductImage(),
            ]);
    
            const productsData = productsResponse.data.content;
            const productImagesData = productImagesResponse.data.content;
            setProductsales(productsData);
            setProductImages(productImagesData);
      
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      const sortedProducts = productsales.sort((a, b) => b.id - a.id);
      const top10Products = sortedProducts.slice(0, 10);


      const combinedData = top10Products.map(product => {
        // Lọc ra những hình ảnh có id sản phẩm trùng khớp với id sản phẩm hiện tại
        const correspondingImages = productImages.filter(image => image.product.id == product.product.id);
      
        // Trả về mảng các hình ảnh tương ứng với sản phẩm hiện tại
        return {
            ...product,
            images: correspondingImages
        };
    });


      
    
    return ( <>
       <div className="products">
              <div className="row justify-content-center">
              {combinedData.map((combinedItem, index) => (
                    <ProductSaleItem product={combinedItem} key={index} />
                ))}

                {/* End .col-sm-6 col-md-4 col-lg-3 */}
              </div>
              {/* End .row */}
            </div></> );
}

export default ProductSale;