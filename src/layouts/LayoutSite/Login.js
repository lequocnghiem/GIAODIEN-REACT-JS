import React, { useEffect, useState } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import UserServices from '../../services/UserServices';
import FacebookLogin from 'react-facebook-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useUser } from '../../services/UserContext';
import Swal from 'sweetalert2';
import { Button, Modal, Spinner  } from 'react-bootstrap';
import '../../App.css';
import { BeatLoader, ClipLoader } from 'react-spinners';
import axios from 'axios';
import { css } from '@emotion/react';


function Login({ onLoginSuccess }) {
    const { login } = useUser();
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPhone, setphone] = useState('');
    const [registerAddress, setaddress] = useState('');
    const [ registername, setRegisterusername] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
      };
      const override = css`
  display: block;
  margin: 0 auto;
`;
      
    const navigate = useNavigate();
    const [agreePolicy, setAgreePolicy] = useState(false);

    const handleAgreePolicyChange = () => {
        setAgreePolicy(!agreePolicy);
      };


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRegisterEmailChange = (event) => {
        setRegisterEmail(event.target.value);
      };
    
      const handleRegisterPasswordChange = (event) => {
        setRegisterPassword(event.target.value);
      };

      const handleRegisterUsernameChange = (event) => {
        setRegisterusername(event.target.value);
      };
      const handleRegisterPhoneChange = (event) => {
        setphone(event.target.value);
      };
      const handleRegisterAddressChange = (event) => {
        setaddress(event.target.value);
      };
      const handleLogin = async (event) => {
        event.preventDefault();
        
        try {
            const response = await UserServices.loginUser({ email, password });
            const { token } = response.data;
    
            
            // Gọi API để kiểm tra vai trò của người dùng ngay tại đây
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            if (decodedToken.verified) {
              const roleResponse = await fetch('http://localhost:9011/jwt/login', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
  
              // Check if the user has the ROLE_USER permission
              if (roleResponse.status === 200) {
                  // Execute actions for users with ROLE_USER permission
                  localStorage.setItem('accessToken', token);
                  onLoginSuccess();
                  Swal.fire(
                      'Logged In Successfully!',
                      'You have successfully logged into your account!',
                      'success'
                  );
                  const closeButton = document.querySelector('.close');
                  if (closeButton) {
                      closeButton.click();
                  }
                  clearInputFields();
                  navigate('/');
              } else {
                  // Handle case where user does not have ROLE_USER permission
                  Swal.fire({
                      icon: 'error',
                      title: 'Access Denied',
                      text: 'You do not have permission to access this application.',
                  });
              }
          } else {
              // Notify the user if their account is not verified
              Swal.fire({
                  icon: 'info',
                  title: 'Account Not Verified',
                  text: 'Your account has not been verified. Please verify your account before logging in.',
              });
          }
      } catch (error) {
          console.error('Error during login:', error);
          Swal.fire({
              icon: 'info', // Change 'error' to 'info'
              title: 'Oops...',
              text: 'Wrong login name or password!',
          });
      }
  };
    


    const clearInputFields = () => {
      setEmail('');
      setPassword('');
      setRegisterEmail('');
      setRegisterPassword('');
      setphone('');
      setaddress('');
      setRegisterusername('');
  };
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};




const handleBlurEmail = () => {
  if (!validateEmail(registerEmail)) {
      setEmailError('Email không hợp lệ.');
  } else {
      setEmailError('');
  }
};

const handleBlurPhone = () => {
  if (!validatePhone(registerPhone)) {
      setPhoneError('Số điện thoại phải gồm 10 chữ số.');
  } else {
      setPhoneError('');
  }
};

const handleBlurPassword = () => {
  if (!validatePassword(registerPassword)) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
  } else {
      setPasswordError('');
  }
};

      const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!registerEmail || !registerPassword || !registername || !registerPhone || !registerAddress) {
          Swal.fire('Vui lòng điền đầy đủ các trường bắt buộc.');
          setLoading(false);
          return;
      }

      if (!validatePhone(registerPhone)) {
          setPhoneError('Số điện thoại phải gồm 10 chữ số.');
          setLoading(false);
          return;
      }

      if (!validatePassword(registerPassword)) {
          Swal.fire('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
          setLoading(false);
          return;
      }

      

        try {
        await UserServices.registerUser({
            email: registerEmail,
            password: registerPassword,
            name: registername,
            phone:registerPhone,
            username: "DEFAULT",  
            address: registerAddress,
        
            status: 1,
          });
          setLoading(false);
          try {
            await UserServices.addRoleToUser(registerEmail, ['ROLE_USER']);
            Swal.fire({
              icon: 'info', // Thay 'error' thành 'info'
              title: 'Thông Báo',
              text: 'Hãy Nhập Mã OTP',
            });
            setShowConfirmationModal(true);
        } catch (error) {
          setLoading(false); 
          Swal.fire({
            icon: 'error', // Thay 'error' thành 'info'
            title: 'Thông Báo',
            text: 'Lỗi',
          });
        }

    
        } catch (error) {
          console.error('Error registering user:', error);
          setLoading(false); 
          window.alert('Đã có lỗi xảy ra trong quá trình đăng ký!');
        }
        
      };


      const handleConfirmationSubmit = async (e) => {
        e.preventDefault();
        console.log(registerEmail)
        try {
       
       
        await axios.post(`http://localhost:9011/api/user/verify?email=${(registerEmail)}&otp=${confirmationCode}`);
       
        Swal.fire({
          icon: 'success', // Thay 'error' thành 'info'
          title: 'Thông Báo',
          text: 'Tạo Tài Khoản Thành Công',
        });
        setShowConfirmationModal(false);
        clearInputFields()
            navigate('/login');
           
        } catch (error) {
        
          Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'You do not have permission to access this application.',
        });
        } 
       
      };
      











    useEffect(() => {
      
        UserServices.getAll()
          .then(response => {
            console.log('Data from API:', response.data.content);
            setUsers(response.data.content);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);




    const handleGoogleLogin = async (credentialResponse) => {
        try {
          if (credentialResponse && credentialResponse.credential) {
            const decodedToken = jwtDecode(credentialResponse.credential);
            console.log('API:', decodedToken);
            const { email, name } = decodedToken;
            const response = await UserServices.registerUser({
              email,
              name,
              password: "DEFAULT",
              phone: "DEFAULT",
              username: "DEFAULT",  
              address: "DEFAULT",
              image: "DEFAULT",
              roles: "1",
              createdAt: "2023-12-30T07:54:31.000+00:00",
              updatedAt: null,
              createdBy: null,
              updatedBy: null,
              status: 1,
              role: 0
          
            });
      
            onLoginSuccess();
            console.log('Google Login successful', response);
            Swal.fire(
              'Logged In Successfully!',
              'You have successfully logged into your account!',
              'success'
            )
            const closeButton = document.querySelector('.close');
            if (closeButton) {
                closeButton.click();
            }
    
            navigate('/');
          } else {
            console.error('Invalid Google Login response:', credentialResponse);
          }
        } catch (error) {
          console.error('Error handling Google Login:', error);
        }
      };
      // useEffect(() => {
      //   const storedUser = localStorage.getItem('loggedInUser');

      //   if (storedUser) {
      //     const user = JSON.parse(storedUser);

      //     login(user);
      //     onLoginSuccess();
      //   }
      // }, [login, onLoginSuccess]);


    return (  
      <>
        <div
        className="modal fade"
        id="signin-modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
       
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul className="nav nav-pills nav-fill" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="signin-tab"
                        data-toggle="tab"
                        href="#signin"
                        role="tab"
                        aria-controls="signin"
                        aria-selected="true"
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="register-tab"
                        data-toggle="tab"
                        href="#register"
                        role="tab"
                        aria-controls="register"
                        aria-selected="false"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    {/* LOGIN */}
                    <div
                      className="tab-pane fade show active"
                      id="signin"
                      role="tabpanel"
                      aria-labelledby="signin-tab"
                    >
                      <form onSubmit={handleLogin}>
                        <div className="form-group">
                          <label htmlFor="singin-email">
                            Username or email address *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="singin-email"
                            name="singin-email"
                            value={email}
                            onChange={handleEmailChange}
                            required=""
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-group">
                          <label htmlFor="singin-password">Password *</label>
                          <input
                            type="password"
                            className="form-control"
                            id="singin-password"
                            name="singin-password"
                            value={password}
                            onChange={handlePasswordChange}
                            required=""
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>LOG IN</span>
                            <i className="icon-long-arrow-right" />
                          </button>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="signin-remember"
                              
                              checked={true}
                              onChange={handleRememberMeChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="signin-remember"
                            >
                              Remember Me
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <a href="#" className="forgot-link">
                            Forgot Your Password?
                          </a>
                        </div>
                        {/* End .form-footer */}
                      </form>
                      <div className="form-choice">
                        <p className="text-center">or sign in with</p>
                        <div className="row">
                          <div className="col-sm-6">
                        
                            <GoogleOAuthProvider clientId="63487271461-8saii2i38r6dlbbfeqh2rjs54grh3vj9.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                  console.log('Login Failed');
                                }}
                              />
                            </GoogleOAuthProvider>
                        
                          </div>
                          {/* End .col-6 */}
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login btn-f">
                              <i className="icon-facebook-f" />
                              Login With Facebook
                            </a>
                          </div>
                          {/* End .col-6 */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .form-choice */}
                    </div>
                    {/* REIGISTER */}
                    <div
                      className="tab-pane fade"
                      id="register"
                      role="tabpanel"
                      aria-labelledby="register-tab"
                    >
                      <form onSubmit={handleRegister}>
                      <div className="form-group">
                <label htmlFor="register-email">Địa chỉ email của bạn *</label>
                <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    id="register-email"
                    name="register-email"
                    value={registerEmail}
                    onChange={handleRegisterEmailChange}
                    onBlur={handleBlurEmail}
                    required
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
                        {/* End .form-group */}
                        <div className="form-group">
                <label htmlFor="register-password">Mật khẩu *</label>
                <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="register-password"
                    name="register-password"
                    value={registerPassword}
                    onChange={handleRegisterPasswordChange}
                    onBlur={handleBlurPassword}
                    required
                />
                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>


                        <div className="form-group">
    <label htmlFor="register-username">Name*</label>
    <input
      type="text"
      className="form-control"
      id="register-username"
      name="register-username"
      value={registername}
      onChange={handleRegisterUsernameChange}
      required=""
    />
  </div>

  <div className="form-group">
                <label htmlFor="register-phone">Số điện thoại *</label>
                <input
                    type="text"
                    className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                    id="register-phone"
                    name="register-phone"
                    value={registerPhone}
                    onChange={handleRegisterPhoneChange}
                    onBlur={handleBlurPhone}
                    required
                />
                {phoneError && <div className="invalid-feedback">{phoneError}</div>}
            </div>

  <div className="form-group">
    <label htmlFor="register-address">Address *</label>
    <input
      type="text"
      className="form-control"
      id="register-address"
      name="register-address"
      value={registerAddress}
      onChange={handleRegisterAddressChange}
      required=""
    />
  </div>  
                        {/* End .form-group */}
                        {!showConfirmationModal && (
  <div className="form-footer">
    <button
      type="submit"
      className="btn btn-outline-primary-2"
      disabled={!agreePolicy}
    >
      <span>SIGN UP</span>
      <i className="icon-long-arrow-right" />
    </button>
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id="register-policy"
        checked={agreePolicy}
        onChange={handleAgreePolicyChange}
        required=""
      />
      <label
        className="custom-control-label"
        htmlFor="register-policy"
      >
        I agree to the <a href="#">privacy policy</a> *
      </label>
    </div>
    {/* End .custom-checkbox */}
  </div>
)}
                        {/* End .form-footer */}
                      </form>
                      {loading && (
        <div className="loading-overlay">
          <ClipLoader color={'#123abc'} loading={loading} size={150} />
        </div>
      )}




                      {showConfirmationModal && (
                  <div className="form-group">
                    <label htmlFor="otp">Nhập mã OTP *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      name="otp"
                 
                    
                      value={confirmationCode}
                      onChange={(e) => setConfirmationCode(e.target.value)}
                      required=""
                    />
                    <Button onClick={handleConfirmationSubmit} style={{marginTop:'10px'}}> Xác thực</Button>
                  </div>
                )}



                      <div className="form-choice">
                        <p className="text-center">or sign in with</p>
                        <div className="row">
                          <div className="col-sm-6">
                          <GoogleOAuthProvider clientId="63487271461-8saii2i38r6dlbbfeqh2rjs54grh3vj9.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                  console.log('Login Failed');
                                }}
                              />
                            </GoogleOAuthProvider>
                          </div>
                          {/* End .col-6 */}
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login  btn-f">
                              <i className="icon-facebook-f" />
                              Login With Facebook
                            </a>
                          </div>
                          {/* End .col-6 */}
                        </div>
                        {/* End .row */}
                      </div>
                    
                      {/* End .form-choice */}
                    </div>
                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                <div className="form-group">
             
        </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
        
      </div>


    
</>




    );
}

export default Login;