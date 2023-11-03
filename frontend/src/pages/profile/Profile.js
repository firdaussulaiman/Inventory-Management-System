import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import { getUser } from '../../services/authService';
import './Profile.scss';

const Profile = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Getting user');
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
      setIsLoading(false);
      dispatch(SET_USER(data));
      dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="profile --my2">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="profile --my2">
      {!profile ? (
        <Typography variant="body1">
          Something went wrong, please reload the page...
        </Typography>
      ) : (
        <Card sx={{ maxWidth: 345, flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Profile
            </Typography>
            <Typography variant="body1">
              <b>Name:</b> {profile.name}
            </Typography>
            <Typography variant="body1">
              <b>Email:</b> {profile.email}
            </Typography>
            <Typography variant="body1">
              <b>Phone:</b> {profile.phone}
            </Typography>
            <Link to="/edit-profile" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
