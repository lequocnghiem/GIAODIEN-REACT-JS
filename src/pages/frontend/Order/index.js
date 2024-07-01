import React, { useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip, Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefundIcon from '@mui/icons-material/RotateLeft';
import axios from 'axios';
import { message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/es/modal/confirm';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';

function Order() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState({});
  const navigate = useNavigate();
  const [status, setStatus] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  const fetchOrderData = async () => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:9011/api/paypal/getPaypalByUserId/${user.userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order data');
      }
      const orderData = await response.json();
      setOrders(orderData);
      const orderCodes = orderData.map(order => order.order_code).filter(Boolean);
      const statusData = {};

      // Fetch status data for each order code
      await Promise.all(orderCodes.map(async (orderCode) => {
        try {
          const response = await fetch(`http://localhost:9011/api/shipping-order/${orderCode}`);
          if (!response.ok) {
            throw new Error('Failed to fetch status data');
          }
          const data = await response.json();
          statusData[orderCode] = data; // Store status data with order_code as key
        } catch (error) {
          console.error(`Error fetching status data for order ${orderCode}:`, error);
        }
      }));

      setStatus(statusData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(status)
  useEffect(() => {
    fetchOrderData();
  }, [user]);

  if (orders.length === 0) {
    return <div>Chưa Có Đơn Hàng Nào</div>;
  }

  const calculateTotal = () => {
    return orders.reduce((total, item) => total + item.quantity * item.amount, 0);
  };

  // const handleViewDetail = (orderId) => {
  //   navigate(`/order/detail/${orderId}`);
  // };


  const getStatusText = (status) => {
   
    switch (status.toUpperCase()) {
      case "READY_TO_PICK":
        return <Typography style={{ color: 'green' ,fontSize:'15px'}}>Chờ lấy hàng</Typography>;
      case "PICKING":
        return <Typography style={{ color: 'green' ,fontSize:'15px'}}>Đang lấy hàng</Typography>;
      case "MONEY_COLLECT_PICKING":
        return <Typography style={{ color: 'green',fontSize:'15px' }}>Tương tác với người gửi</Typography>;
      case "PICKED":
        return <Typography style={{ color: 'green',fontSize:'15px' }}>Lấy hàng thành công</Typography>;
      case "DELIVERING":
        return <Typography style={{ color: 'green',fontSize:'15px' }}>Đang giao</Typography>;
      case "DELIVERED":
        return <Typography style={{ color: 'green',fontSize:'15px' }}>Giao hàng thành công</Typography>;
      case "DELIVERY_FAIL":
        return <Typography style={{ color: 'green',fontSize:'15px' }}>Giao hàng không thành công</Typography>;
        case "CANCEL":
        return <Typography style={{ color: 'green',fontSize:'15px' }}>Đơn hàng đã hủy</Typography>;
      default:
        return <Typography style={{ color: 'green' ,fontSize:'15px'}}>Đang tải...</Typography>;
    }
  };


  const handleRefundOrder = async (paymentId, refundAmount, currency, order_code) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:9011/api/refund', {
        paymentId,
        refundAmount,
        currency
      });
      if (response.status === 200) {
        // Update status based on order_code
        if (status[order_code] && status[order_code].data && status[order_code].data.status === 'ready_to_pick') {
          try {
            const cancelResponse = await axios.post(
              'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel',
              { order_codes: [order_code] },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'ShopId': '192607',
                  'Token': '45e0175b-2d97-11ef-8e53-0a00184fe694'
                }
              }
            );
            console.log('Hủy đơn vận thành công !');
          } catch (error) {
            console.error('Hủy đơn vận thất bại !', error);
          }
        }
        localStorage.setItem(paymentId, 'cancelled');
        message.success('Hủy đơn hàng thành công');
      }
    } catch (error) {
      message.error(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      setLoading(false);
      // window.location.reload(); // Refresh page after handling refund
    }
  };

  const showConfirm = (paymentId, price, currency,order_code) => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Hủy và hoàn tiền đơn hàng sẽ mất phí bạn có muốn tiếp tục không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        handleRefundOrder(paymentId, price, currency,order_code);
      }
    });
  };

  return (
    <div className="page-wrapper">
      <main className="main">
        <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
          <div className="container">
            <h1 className="page-title">Shopping Order <span>Đơn Hàng</span></h1>
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
            </ol>
          </div>
        </nav>

        <div className="container">
          <div className="order-details">
            <table className="table table-striped">
              <thead>
                <tr>
                
                  <th>Mã thanh toán</th>
                  <th>Hình thức thanh toán</th>
                  <th>Thời gian thanh toán</th>
                  <th>Tổng giá</th>
                  <th></th>
                  <th ></th>
                </tr>
              </thead>
              <tbody>
              {orders.map((item, index) => (
  <tr key={item.id}>
   


                     <td> <Link style={{color:'black'}} to={`/order/detail/${item.paymentId}`} >{item.paymentId} </Link></td>
                  
                
                    <td>{item.method}</td>
                    <td>{new Date(item.paymentTime).toLocaleString()}</td>
                    {/* <td>{getStatusText(item.status)}</td> */}
                     
                    <td>{item.amount*23000}.VND </td>

                    <td>
  {status[item.order_code] && status[item.order_code].data && status[item.order_code].data.status ? (
    getStatusText(status[item.order_code].data.status)
  ) : (
    <Typography style={{ color: 'red', fontSize: '15px' }}>
      Đang chờ xác nhận
    </Typography>
  )}
</td>

<td>
  {item.order_code? (
    <span style={{  fontSize: '15px' }}>
{item.order_code}
    </span>
  ) : 'Chưa có'}
</td>


<td>
  {(!item.order_code ||
    (status[item.order_code] && (status[item.order_code].data.status == 'ready_to_pick' || status[item.order_code].data.status == 'picking'))) && (
      <Tooltip title={<span style={{ fontSize: '12px' }}>Hủy đơn hàng hoàn tiền</span>} arrow>
        <RefundIcon
          onClick={() => showConfirm(item.paymentId, item.amount, item.currency, item.order_code)}
          style={{ fontSize: '30px', cursor: 'pointer' }}
        />
      </Tooltip>
    )}
</td>
                </tr>
                ))}
              </tbody>
            </table>

            {loading && (
        <div className="loading-overlay">
          <ClipLoader color={'#123abc'} loading={loading} size={150} />
        </div>
      )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Order;
