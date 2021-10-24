import React, { ChangeEvent, SyntheticEvent, useContext } from 'react';
import { useActor } from '@xstate/react';
import { Container, Box, Avatar, Typography, TextField, Grid, Link, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from '../copyright/Copyright';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { FormEvent } from '../../../services/domain/form/definition/FormEvents';

export const Forgot = () => {
  const { authService } = useContext(AuthenticationContext);

  const [authState, sendToAuthService] = useActor(authService);
  const forgotService = authState.context.registerRef;
  const [state, sendToService] = useActor(forgotService);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    sendToService({ type: FormEvent.UpdateForm, formData: { [event.target.name]: event.target.value } });
  };
  const isInvalid = false;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot your password?
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'light' }}>
          Please enter your email
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={(event: SyntheticEvent) => {}}>
          <TextField
            inputProps={{ autoComplete: 'off' }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={(event) => handleChange(event)}
          />
          <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={false}
            type="submit"
            loading={false}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            Continue
          </LoadingButton>
          {isInvalid && (
            <Typography align="center" variant="body1" sx={{ color: 'error.main' }}>
              Invalid email
            </Typography>
          )}
          <Grid container justifyContent="center">
            <Grid item>
              <Link component="button" variant="body2" underline="hover" onClick={() => {}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
