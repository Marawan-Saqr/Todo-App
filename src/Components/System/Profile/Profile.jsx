import React, { useState } from 'react';

const Profile = () => {

  const [profile, setProfile] = useState(null);

  return (
    <div className="profile">
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            {/* Sidebar */}
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                      alt="User"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{ 'John Doe'}</h4>
                      <p className="text-secondary mb-1">{'Full Stack Developer'}</p>
                      <p className="text-muted font-size-sm">{'San Francisco, CA'}</p>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {'John Doe'}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{'example@mail.com'}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{'(123) 456-7890'}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info" href="#edit-profile">
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;