import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/authService';
import ChangePassword from '../../components/changePassword/ChangePassword';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  CircularProgress, 
  Typography 
} from '@mui/material';

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
  };

  const [profile, setProfile] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        name: profile.name,
        phone: profile.phone,
      };

      const data = await updateUser(formData);
      toast.success("User updated");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Card sx={{ maxWidth: 345, flexDirection: 'column' }}>
          <CardContent>
            <form onSubmit={saveProfile}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                value={profile.name || ''}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={profile.email || ''}
                onChange={handleInputChange}
                margin="normal"
                disabled
              />
              <Typography variant="caption" display="block">
                Email cannot be changed.
              </Typography>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                name="phone"
                value={profile.phone || ''}
                onChange={handleInputChange}
                margin="normal"
              />
              <Button variant="contained" color="primary" type="submit">
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
