import { React } from "react";
import PublicLayout from "../../Layouts/PublicLayout";
import TableWithManualExport from "../../Layouts/TableWithManualExport";
const Home = () => {
  return (
    <div>
      <PublicLayout>
        <div className=" p-5 row mt-5 vw-100">
          {/* corusal */}
          <div
            id="carouselExampleCaptions"
            className="carousel slide mb-4  col-md-6 mt-5 "
            data-bs-ride="carousel"
            data-bs-interval="3000" // Set the interval speed here
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://www.alltrails.com/_next/image?url=https%3A%2F%2Fimages.alltrails.com%2FeyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNzE4MjUxMTQvODlmMmY3YzMxYTFkZGJlOTBiZjM2YjE2OGJhMDZkZTkuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0%3D&w=3840&q=90"
                  className="d-block w-100 "
                  alt="First Slide"
                  style={{ height: 333, objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First Slide</h5>
                  <p>
                    Some representative placeholder content for the first slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src=" https://www.nationalparks.org/uploads/_1200x630_crop_center-center_82_none/shutterstock_97706066_1.jpg?mtime=1655840475"
                  className="d-block w-100 "
                  alt="First Slide"
                  style={{ height: 333, objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second Slide</h5>
                  <p>
                    Some representative placeholder content for the first slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src=" https://lp-cms-production.imgix.net/2023-01/USA-HorseshoeBend-Jordan-Siemens-GettyImages-627106231-RFC.jpg?fit=crop&w=3840&auto=format&q=75"
                  className=" w-100 "
                  alt="First Slide"
                  style={{ height: 333, objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third Slide</h5>
                  <p>
                    Some representative placeholder content for the first slide.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          {/* corusal */}
          <br />
          <TableWithManualExport />
          <div className="text-center my-5  ">
            <h2>Our Services</h2>
            <p>We offer a variety of services to cater to your needs.</p>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Service 1</h5>
                    <p className="card-text">Description of service 1.</p>
                    <a href="#" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Service 2</h5>
                    <p className="card-text">Description of service 2.</p>
                    <a href="#" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Service 3</h5>
                    <p className="card-text">Description of service 3.</p>
                    <a href="#" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center my-5">
            <h2></h2>
            <p>What our clients say about us.</p>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      "Amazing service! Highly recommend."
                    </p>
                    <h6 className="card-title">- Client 1</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      "A wonderful experience from start to finish."
                    </p>
                    <h6 className="card-title">- Client 2</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      "I will definitely use their services again!"
                    </p>
                    <h6 className="card-title">- Client 3</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  );
};

export default Home;
