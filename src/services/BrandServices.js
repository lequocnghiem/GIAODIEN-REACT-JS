import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("brand");
}


function getCategoryBySlug(slug)
{
    return httpAxios.get("brand/show/"+slug);
}
const BrandService = {
    getAll:getAll,
    getCategoryBySlug:getCategoryBySlug
}
export default BrandService;