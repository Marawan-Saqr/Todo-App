import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../Shared/Loader/Loader";

const Profile = () => {
  // Component States
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract Token To Get Email
  const getEmailFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const payload = JSON.parse(jsonPayload);
      return payload.email || null;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  // User Profile Function
  const fetchProfile = async () => {
    const email = getEmailFromToken();
    if (email) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/profile`,
          {
            params: {
              email: email,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    }
  };

  // Use Effect
  useEffect(() => {
    fetchProfile();
  }, []);

  // If loading, show loader
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="profile">
      <h2 className="text-center m-4">Your Profile</h2>
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