import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("product");
}
function getById(id)
{
    return httpAxios.get(`product/${id}`);
}
// function create(data)
// {
//     return httpAxios.post("product/store", data);
// }
// function update(data, id)
// {
//     return httpAxios.post("product/update/" + id, data);
// }
// function remove(id)
// {
//     return httpAxios.delete("product/destroy/" + id);
// }
// function getProductHome(limit, category_id)
// {
//     return httpAxios.get(`product_home/${limit}/${category_id}`);
// }
// function getProductAll(limit, page=1)
// {
//     return httpAxios.get(`product_all/${limit}/${page}`);
// }
// function getProductBySlug(slug)
// {
//     return httpAxios.get(`product_detail/${slug}`);
// }
// function getProductByCategoryId(limit, category_id)
// {
//     return httpAxios.get(`product_category/${limit}/${category_id}`);
// }
// function getProductByBrandId(limit, brand_id)
// {
//     return httpAxios.get(`product_brand/${limit}/${brand_id}`);
// }
// function getProductSearch(key)
// {
//     return httpAxios.get(`product_search/${key}`);
// }
function getProductImage()
{
    return httpAxios.get(`productimage`);
}
function getProductImageById(productId)
{
    return httpAxios.get(`productimage/${productId}`);
}

function getImgaeproduct(productId)
{
    return httpAxios.get(`productimage/product/${productId}`);
}
function getProductSale()
{
    return httpAxios.get("productsale");
}

 function getAllSizes() {
    return httpAxios.get("productsize");
}
 function getAllColors() {
    return httpAxios.get("productcolor");
}



function getsaleproduct(id) {
    return httpAxios.get(`productsale/products/${id}/sale`);
}


const ProductService = {
    getAll:getAll,
    getById:getById,
    // create:create,
    // update:update,
    // remove:remove,
    // getProductHome:getProductHome,
    // getProductAll:getProductAll,
    // getProductBySlug:getProductBySlug,
    // getProductSearch:getProductSearch,
    // getProductByCategoryId:getProductByCategoryId,
    // getProductByBrandId:getProductByBrandId,
    getProductImage:getProductImage,
    getProductImageById:getProductImageById,
    getAllSizes:getAllSizes,
    getAllColors:getAllColors,
    getImgaeproduct:getImgaeproduct,
    getProductSale:getProductSale,
    getsaleproduct:getsaleproduct,
}
export default ProductService;