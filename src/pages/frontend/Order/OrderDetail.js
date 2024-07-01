import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import ColorBox from './ColorBox';
function OrderDetail() {
    const [paymentInfo, setPaymentInfo] = useState(null);
    const { orderId } = useParams();
    const [image, setimage] = useState(null);
    const [user, setUser] = useState(null);
 
    console.log(orderId)
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      }
    }, []);
  
    useEffect(() => {
      const fetchPaymentInfo = async () => {
        try {
          const response = await fetch(`http://localhost:9011/api/getPaypalByUserId/${user.userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch payment information');
          }
          const data = await response.json();
          
  const filteredPayment = data.filter(payment => payment.paymentInfo.paymentId == orderId);
  
  if (filteredPayment) {
    // If filteredPayment is valid, fetch image using userId
    fetchImagesByProductIds(filteredPayment.map(payment => payment.productId))
    setPaymentInfo(filteredPayment);
  } else {
    console.error('Payment information not found for orderId:', orderId);
    // Handle case where payment info is not found
  }
        } catch (error) {
          console.error('Error fetching payment information:', error);
        }
      };
  
      fetchPaymentInfo();
    }, [user]); 


console.log(paymentInfo)

const fetchImagesByProductIds = async (productIds) => {
  console.log(productIds)
  try {
      const response = await fetch(`http://localhost:9011/api/getPaypalByproductIds?productIds=${productIds}`);
      if (!response.ok) {
          throw new Error('Failed to fetch images');
      }
      const imageData = await response.json();
      setimage(imageData);
  } catch (error) {
      console.error('Error fetching images:', error);
  }
};

  console.log(image)    
  return (
    <div className="page-wrapper">
      <main className="main">
        <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
          <div className="container">
            <h1 className="page-title">Shopping Order <span>Thông Tin Đơn Hàng</span></h1>
          </div>
        </div>
        
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Order</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Shopping order</li>
              <li className="breadcrumb-item active" aria-current="page">Shopping orderdetail</li>
            </ol>
          </div>
        </nav>

          <div className="container">
                    {paymentInfo && paymentInfo.length > 0? (
                        <div className="order-details">
                            <h2>Thông tin đơn hàng</h2>
                            <p>Mã đơn hàng: {orderId}</p>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Tên sản phẩm</th>
                                        <th>Kích thước</th>
                                        <th>Màu</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Tổng giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentInfo.map((payment, index) => (
                                        <tr key={payment.id}>
                                            <td>
                                                {Array.isArray(image) && image[index] && image[index].length > 0 ? (
                                                    <img
                                                        src={`data:image/png;base64,${image[index][0].imageData}`}
                                                        alt={`Image ${index}`}
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                ) : (
                                                    <span>No image available</span>
                                                )}
                                            </td>

                                            <td>{payment.productname}</td>
                                            <td>{payment.size}</td>
                                            <td><ColorBox color={payment.color} /></td>
                                            <td>{payment.quantity}</td>
                                            <td>{payment.amount*23000} .VND</td>
                                            <td>{(payment.quantity * payment.amount)*23000} .VND</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
) : (
  <p>Loading payment information...</p>
)}
         
        </div>
      </main>
    </div>
  );
}

export default OrderDetail;
