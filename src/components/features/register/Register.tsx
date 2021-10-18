import React, { ChangeEvent, SyntheticEvent, useContext } from 'react';
import { useActor, useSelector } from '@xstate/react';
import { Container, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, CircularProgress, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from '../copyright/Copyright';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { FormEvent } from '../../../domain/form/definition/FormEvents';
import {
  emailErrorSelector,
  firstNameErrorSelector,
  invalidCredentialsSelector,
  isInvalidCredentialsSelector,
  isLoadingSelector,
  isRegisteredSelector,
  isValidationDisabledSelector,
  lastNameErrorSelector,
  passwordErrorSelector
} from './Selectors';
import { AuthEvents } from '../../../domain/auth/definition/AuthEvents';

export const Register = () => {
  const { registerService, authService } = useContext(AuthenticationContext);

  const [state, sendToService] = useActor(registerService);
  const [authState, sendToAuthService] = useActor(authService);

  const firstNameErrorMessage = useSelector(registerService, firstNameErrorSelector);
  const lastNameErrorMessage = useSelector(registerService, lastNameErrorSelector);
  const emailErrorMessage = useSelector(registerService, emailErrorSelector);
  const passwordErrorMessage = useSelector(registerService, passwordErrorSelector);
  const isDisabled = useSelector(registerService, isValidationDisabledSelector);
  const isLoading = useSelector(registerService, isLoadingSelector);
  const isInvalid = useSelector(registerService, isInvalidCredentialsSelector);

  const invalidCredentialsMessage = useSelector(registerService, invalidCredentialsSelector);
  const isRegistered = useSelector(registerService, isRegisteredSelector);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    sendToService({ type: FormEvent.UpdateForm, formData: { [event.target.name]: event.target.value } });
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    sendToService({ type: FormEvent.Validate });
  };

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
          Sign up
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3 }}
          noValidate
          onSubmit={(event: SyntheticEvent) => (!isRegistered ? onSubmit(event) : sendToAuthService({ type: AuthEvents.SignIn }))}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps={{ autoComplete: 'off' }}
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => handleChange(event)}
                helperText={firstNameErrorMessage}
                error={!!firstNameErrorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps={{ autoComplete: 'off' }}
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
                onChange={(event) => handleChange(event)}
                helperText={lastNameErrorMessage}
                error={!!lastNameErrorMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ autoComplete: 'off' }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                onChange={(event) => handleChange(event)}
                helperText={emailErrorMessage}
                error={!!emailErrorMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ autoComplete: 'off' }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoFocus
                onChange={(event) => handleChange(event)}
                helperText={passwordErrorMessage}
                error={!!passwordErrorMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          {isInvalid && (
            <Typography align="center" variant="body1" sx={{ color: 'error.main' }}>
              {invalidCredentialsMessage}
            </Typography>
          )}
          <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: 'primary' }}
            disabled={isDisabled && !isRegistered}
            type="submit"
            loading={isLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            {isRegistered ? 'Sign in' : 'Sign up'}
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component="button" variant="body2" underline="hover" onClick={() => sendToAuthService({ type: AuthEvents.SignIn })}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
