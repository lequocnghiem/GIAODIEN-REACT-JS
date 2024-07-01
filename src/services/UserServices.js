import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("user");
}
function getById(id)
{
    return httpAxios.get("user" + id);
}
function registerUser(data)
{
    return httpAxios.post("user/register", data);
}

function loginUser(data)
{
    return httpAxios.post("user/login", data);
}

function addRoleToUser(email,rolename)
{
    return httpAxios.post("user/add-role", { email, rolename });
}


const UserService = {
    getAll:getAll,
    getById:getById,
    registerUser: registerUser,
    loginUser:loginUser,
    addRoleToUser:addRoleToUser
}
export default UserService;