import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function Carousal() {
  return (
    <div>
      <Carousel fade >

        <Carousel.Item>
          <img
            className="d-block w-100"
            height={"400px"} style={{ filter: "brightness(30%)", objectFit: 'contain !important' }}
            src="https://resizer.otstatic.com/v2/photos/wide-huge/3/51224104.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <div class="carousel-caption" style={{ zIndex: "9", filter: "brightness(90%)" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
                <button className="btn text-white bg-primary" type="submit">Search</button>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height={"400px"} style={{ filter: "brightness(30%)", objectFit: 'contain !important' }}
            src="https://www.margna.ch/bilder/hauptbilder/gastronomie/_2200xAUTO_crop_center-center_none/food-parkhotel-margna-sils-11.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <div class="carousel-caption" style={{ zIndex: "9", filter: "brightness(90%)" }}>
              <form className="d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
                <button className="btn text-white bg-primary" type="submit">Search</button>
              </form>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height={"400px"} style={{ filter: "brightness(30%)", objectFit: 'contain !important' }}
            src="https://media1.miaminewtimes.com/mia/imager/u/magnum/16093942/papi_steak.jpg?cb=1673573410"
            alt="Third slide"
          />
          <Carousel.Caption>
            <div class="carousel-caption" style={{ zIndex: "9", filter: "brightness(90%)" }}>
              <form className="d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
                <button className="btn text-white bg-primary" type="submit">Search</button>
              </form>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>

  )
}

export default Carousal

