import React, { useState, useEffect, useContext } from "react";
import { useProfileMutation } from "../../../Redux/Query/Auth.query";
import Loader from "../../../Shared/Loader/Loader";
import { titleName } from '../../../Contexts/TitleCont';

const Profile = () => {

  // Component States
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ getProfile ] = useProfileMutation();
  const { title, changeTitle } = useContext(titleName);


  // User Profile Function
  const fetchProfile = async () => {
    try {
      const response = await getProfile().unwrap();
      setProfile(response);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };


  // useEffect
  useEffect(() => {
    changeTitle("Your Profile");
  }, [changeTitle]);


  // Use Effect to fetch profile data
  useEffect(() => {
    fetchProfile();
  }, []);


  // If loading, show loader
  if (loading) {
    return <Loader />;
  }


  return (
    <div className="profile">
      <h2 className="text-center m-4">{title}</h2>
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="mt-3">
                      <h4>{profile?.firstName || "User"}</h4>
                      <p className="text-secondary mb-1">
                        Created at:{" "}
                        {profile?.createdAt
                          ? new Date(profile.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p className="text-secondary mb-1">
                        Updated at:{" "}
                        {profile?.updatedAt
                          ? new Date(profile.updatedAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile?.email || "example@mail.com"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">First Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile?.firstName || "First Name"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Last Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile?.lastName || "Last Name"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Is Email Verified</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile?.isEmailVerified ? "Yes" : "No"}
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