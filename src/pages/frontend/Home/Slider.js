import React, { useEffect, useState } from 'react';
import SliderService from '../../../services/SliderServices';

function Slider() {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    SliderService.getAll()
      .then(response => {
        setSliders(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (  
    <div id="header-carousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {sliders.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            style={{ height: '100%' }}
          >
            <img
              className="img-fluid"
              src={`data:image/png;base64,${item.image}`}
              alt={item.altText}
              style={{ objectFit: 'cover', height: '300px', width: '100%' }}
              // Adjust height and width values as needed
            />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#header-carousel"
        role="button"
        data-slide="prev"
      >
        <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
          <span className="carousel-control-prev-icon mb-n2" />
        </div>
      </a>
      <a
        className="carousel-control-next"
        href="#header-carousel"
        role="button"
        data-slide="next"
      >
        <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
          <span className="carousel-control-next-icon mb-n2" />
        </div>
      </a>
    </div>
  );
}

export default Slider;
