import { useState } from "react";
import ContactServices from "../../../services/ContactServices"; 
import { useUser } from '../../../services/UserContext';
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { css } from '@emotion/react';
import { BeatLoader, ClipLoader } from 'react-spinners';
import '../../../App.css';
function Contact() {
  document.title="Contact";
  const [contacts, setContacts] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [massage, setMassage] = useState('');
  const { loggedInUser } = useUser();
  const [loading, setLoading] = useState(false);
 
    const override = css`
display: block;
margin: 0 auto;
`;
    

  const token = localStorage.getItem("accessToken");
  
  const user = token ? jwtDecode(token) : null;
  const handleContact = async (event) => {
    event.preventDefault();
    setLoading(true);
  try{
    const response = await ContactServices.create({
      user: {
        id: user.userId
      },
      name: name,
      email: email,
      phone: phone,
      title: subject,  
      content: massage,
      status: 1,
    });
    setContacts(response);
    setLoading(false);
    Swal.fire(
      'Contact Successfully!',
      'You have successfully contact your account!',
      'success'
    )
  }catch (error) {
    setLoading(false); 
    Swal.fire({
      icon: 'error', // Thay 'error' thành 'info'
      title: 'Thông Báo',
      text: 'Lỗi',
    });

    
  };
}
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMassage(event.target.value);
  };
    return ( 
        <>
  <div className="page-wrapper">
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact us
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-2 mb-lg-0">
              <h2 className="title mb-1">Contact Information</h2>
              {/* End .title mb-2 */}
              <p className="mb-3">
              <p>Chào bạn,</p>
      <p>Chúng tôi rất vui khi bạn đã quan tâm đến việc liên hệ với chúng tôi! Tại <strong>LQN&BQL</strong>, chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn trong mọi thắc mắc, góp ý hoặc yêu cầu hỗ trợ.</p>
      <p>Chúng tôi cam kết mang lại trải nghiệm dịch vụ tốt nhất cho bạn. Vì vậy, đừng ngần ngại gửi thông điệp của bạn cho chúng tôi. Hãy cho chúng tôi biết về bất kỳ vấn đề nào bạn đang gặp phải hoặc ý kiến đóng góp nào bạn muốn chia sẻ.</p>
      <p>Hãy điền vào mẫu liên hệ dưới đây hoặc gửi email trực tiếp cho chúng tôi tại LQN&BQL. Đội ngũ hỗ trợ của chúng tôi sẽ nhanh chóng phản hồi và giải quyết mọi vấn đề của bạn.</p>
      <p>Chúng tôi xin chân thành cảm ơn sự quan tâm của bạn và mong muốn được hỗ trợ bạn trong thời gian sớm nhất!</p>
      <p>Trân trọng,<br/><strong>LQN&BQL</strong></p>
              </p>
              <div className="row">
                <div className="col-sm-7">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-map-marker" />
                        70 Washington Square South New York, NY 10012, United
                        States
                      </li>
                      <li>
                        <i className="icon-phone" />
                        <a href="tel:#">+92 423 567</a>
                      </li>
                      <li>
                        <i className="icon-envelope" />
                        <a href="mailto:#">info@Molla.com</a>
                      </li>
                    </ul>
                    {/* End .contact-list */}
                  </div>
                  {/* End .contact-info */}
                </div>
                {/* End .col-sm-7 */}
                <div className="col-sm-5">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-clock-o" />
                        <span className="text-dark">Monday-Saturday</span>{" "}
                        <br />
                        11am-7pm ET
                      </li>
                      <li>
                        <i className="icon-calendar" />
                        <span className="text-dark">Sunday</span> <br />
                        11am-6pm ET
                      </li>
                    </ul>
                    {/* End .contact-list */}
                  </div>
                  {/* End .contact-info */}
                </div>
                {/* End .col-sm-5 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .col-lg-6 */}
            <div className="col-lg-6">
              <h2 className="title mb-1">Got Any Questions?</h2>
              {/* End .title mb-2 */}
              <p className="mb-2">
                Use the form below to get in touch with the sales team
              </p>
              <form onSubmit={handleContact} action="#" className="contact-form mb-3">
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cname" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cname"
                      placeholder="Name *"
                      required=""
                      onChange={handleNameChange}
                    />
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <label htmlFor="cemail" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cemail"
                      placeholder="Email *"
                      required=""
                      onChange={handleEmailChange}
                    />
                  </div>
                  {/* End .col-sm-6 */}
                </div>
                {/* End .row */}
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cphone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="cphone"
                      placeholder="Phone"
                      onChange={handlePhoneChange}
                    />
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <label htmlFor="csubject" className="sr-only">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="csubject"
                      placeholder="Subject"
                      onChange={handleSubjectChange}
                    />
                  </div>
                  {/* End .col-sm-6 */}
                </div>
                {/* End .row */}
                <label htmlFor="cmessage" className="sr-only">
                  Message
                </label>
                <textarea
                  className="form-control"
                  cols={30}
                  rows={4}
                  id="cmessage"
                  required=""
                  placeholder="Message *"
                  defaultValue={""}
                  onChange={handleMessageChange}
                />
                <button
                  type="submit"
                  className="btn btn-outline-primary-2 btn-minwidth-sm"
                >
                  <span>SUBMIT</span>
                  <i className="icon-long-arrow-right" />
                </button>
              </form>
              {loading && (
        <div className="loading-overlay">
          <ClipLoader color={'#123abc'} loading={loading} size={150} />
        </div>
      )}

              {/* End .contact-form */}
            </div>
            {/* End .col-lg-6 */}
          </div>
          {/* End .row */}
          <hr className="mt-4 mb-5" />
          <div className="stores mb-4 mb-lg-5">
            <h2 className="title text-center mb-3">Our Stores</h2>
            {/* End .title text-center mb-2 */}
            <div className="row">
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img src="assets/images/stores/img-1.jpg" alt="image" />
                      </figure>
                      {/* End .store-media */}
                    </div>
                    {/* End .col-xl-6 */}
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Wall Street Plaza</h3>
                        {/* End .store-title */}
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        {/* End .store-subtitle */}
                        <div>Monday - Saturday 11am to 7pm</div>
                        <div>Sunday 11am to 6pm</div>
                        <a href="#" className="btn btn-link" target="_blank">
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                      {/* End .store-content */}
                    </div>
                    {/* End .col-xl-6 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .store */}
              </div>
              {/* End .col-lg-6 */}
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img src="assets/images/stores/img-2.jpg" alt="image" />
                      </figure>
                      {/* End .store-media */}
                    </div>
                    {/* End .col-xl-6 */}
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">One New York Plaza</h3>
                        {/* End .store-title */}
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        {/* End .store-subtitle */}
                        <div>Monday - Friday 9am to 8pm</div>
                        <div>Saturday - 9am to 2pm</div>
                        <div>Sunday - Closed</div>
                        <a href="#" className="btn btn-link" target="_blank">
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                      {/* End .store-content */}
                    </div>
                    {/* End .col-xl-6 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .store */}
              </div>
              {/* End .col-lg-6 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .stores */}
        </div>
        {/* End .container */}
        <div id="map" />
        {/* End #map */}
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

export default Contact;