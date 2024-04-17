import Carousel from 'react-bootstrap/Carousel';

function CarouselInfo() {
  return (
    <Carousel data-bs-theme="dark" className='pt-5'>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.REACT_APP_API_URL +"media/Carousel/image1.jpg"}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.REACT_APP_API_URL +"media/Carousel/image1.jpg"}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.REACT_APP_API_URL +"media/Carousel/image1.jpg"}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselInfo;