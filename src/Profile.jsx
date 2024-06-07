import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context';
import { fetchUser } from './api'; // Importing fetchUser from its original location
import Images from './Images'; // Import Images component
import UploadImage from './UploadImage';
import './App.css'; // Import the CSS file

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchUser({ auth }); // Call fetchUser with auth
        console.log('GET PROFILE: RESPONSE', response);
        
        // Check if response.data exists before accessing properties
        if (response.data) {
          setProfileData(response.data); // Assuming the response contains user profile data
        } else {
          console.log('ERROR: Profile data not found in response');
        }
      } catch (error) {
        console.log('ERROR: ', error);
        // auth.setAccessToken(undefined);
      }
    };

    if (auth.accessToken) {
      fetchUserProfile();
    }
  }, [auth.setAccessToken, auth]);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <UploadImage />
      {profileData && (
        <div className="profile-info">
          {/* Displaying firstName as username, lastName as email, and using id as key */}
          <h4>{profileData.first_name ? profileData.firstName : ''}</h4>
          <p>{profileData.last_name ? profileData.lastName : ''}</p>
          {/* Render other profile-related information */}
          <hr />
          <Images />
        </div>
      )}
    </div>
  );
};

export default Profile;


