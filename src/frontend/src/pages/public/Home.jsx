import React from "react";
import Typewriter from "typewriter-effect"; // Import the Typewriter component
import PublicLayout from "../../Layouts/PublicLayout";

const Home = () => {
  return (
    <div>
      <PublicLayout>
        <div className="p-5 row mt-5 vw-100">
          {/* Hero Section */}
          <div className="hero-section text-center mb-5 ">
            <h1 className="display-4 fw-bold text-dark">
              <Typewriter
                options={{
                  strings: [
                    "Welcome to <span class='logify-text'>worktracker</span>",
                    "Track and Optimize Your Worklogs",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 75, // Speed of typing
                }}
              />
            </h1>
            <p className="lead text-muted">
              worktracker is your all-in-one platform for efficient worklog
              management and team productivity optimization.
            </p>
            <a href="#/login" className="btn btn-primary btn-lg mt-4">
              Get Started <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          {/* Worklog Insights Section */}
          {/* <div id="worklog-insights" className="text-center my-5">
            <h2>Logify Worklog Insights</h2>
            <p>
              Gain valuable insights into your team's work hours and
              productivity with Logify.
            </p>
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow-sm mb-4">
                  <div className="card-body text-center">
                    <h4 className="card-title">Total Work Hours</h4>
                    <p className="card-text">1200 Hours</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm mb-4">
                  <div className="card-body text-center">
                    <h4 className="card-title">Active Projects</h4>
                    <p className="card-text">6 Projects</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm mb-4">
                  <div className="card-body text-center">
                    <h4 className="card-title">Pending Tasks</h4>
                    <p className="card-text">8 Tasks</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Services Section */}
          {/* <div className="text-center my-5">
            <h2>Our Services at Logify</h2>
            <p>
              We offer a range of services to streamline your workflow and
              improve productivity.
            </p>
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h5 className="card-title">Worklog Management</h5>
                    <p className="card-text">
                      Effortlessly manage and track work logs in real time with
                      Logify.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h5 className="card-title">Time Tracking</h5>
                    <p className="card-text">
                      Track time spent on tasks and optimize your team's
                      productivity.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h5 className="card-title">Data Analysis</h5>
                    <p className="card-text">
                      Analyze work logs and performance data to improve team
                      efficiency.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </PublicLayout>
    </div>
  );
};

export default Home;
