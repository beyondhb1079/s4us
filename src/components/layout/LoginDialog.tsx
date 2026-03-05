import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Box,
  Stack,
  Button,
} from '@mui/material';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import CancelIcon from '@mui/icons-material/Cancel';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useTranslation } from 'react-i18next';
import { logEventAsync } from '../../lib/analytics';

export default function LoginDialog(): React.JSX.Element {
  const location = useLocation();
  const showLoginDialog =
    (location.state as { showLoginDialog?: boolean })?.showLoginDialog || false;
  const { t } = useTranslation(['loginDialog', 'common']);

  const navigate = useNavigate();
  const closeDialog = () =>
    navigate(location.pathname, {
      replace: true,
      state: { showLoginDialog: false },
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSocialLogin = async (Provider: any) => {
    try {
      const auth = getAuth();
      const provider = new Provider();
      const result = await signInWithPopup(auth, provider);
      const additionalInfo = getAdditionalUserInfo(result);

      const method = result.providerId;

      logEventAsync(additionalInfo?.isNewUser ? 'signup' : 'login', { method });

      if (additionalInfo?.isNewUser) {
        navigate('/onboarding');
      } else {
        closeDialog();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Optional: Add a toast/snackbar here if the user closes the popup early
    }
  };

  return (
    <Dialog
      open={showLoginDialog}
      onClose={closeDialog}
      aria-labelledby="responsive-dialog-title">
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <IconButton
            size="medium"
            aria-haspopup="true"
            onClick={() => closeDialog()}
            color="inherit">
            <CancelIcon
              sx={{ color: { xs: 'background.paper', sm: 'inherit' } }}
            />
          </IconButton>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid
            container
            xs={12}
            sm={6}
            sx={{
              color: 'background.paper',
              bgcolor: 'primary.main',
              display: 'block',
            }}>
            <DialogTitle id="responsive-dialog-brand">
              DreamScholars
            </DialogTitle>

            <DialogTitle id="responsive-dialog-welcome">
              <Typography variant="h4" sx={{ color: 'background.paper' }}>
                {t('common:welcome')}
              </Typography>
            </DialogTitle>

            <DialogContentText sx={{ color: 'background.paper', p: 3 }}>
              <Typography paragraph sx={{ color: 'background.paper' }}>
                {t('providesScholarships')}
              </Typography>
              <Typography paragraph sx={{ color: 'background.paper' }}>
                {t('joinCommunity')}
              </Typography>
              <Typography paragraph sx={{ color: 'background.paper' }}>
                {t('getAccess')}
              </Typography>
            </DialogContentText>
          </Grid>

          <Grid container xs={12} sm={6} sx={{ pb: 4, display: 'block' }}>
            <DialogTitle
              id="responsive-dialog-title"
              sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                {t('common:actions.signIn')}
              </Typography>
            </DialogTitle>

            {/* Our custom, highly-optimized auth buttons */}
            <Stack spacing={2} sx={{ px: 4, mt: 1 }}>
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin(GoogleAuthProvider)}
                size="large"
                fullWidth
                sx={{
                  textTransform: 'none',
                  color: 'text.primary',
                  borderColor: 'grey.400',
                }}>
                Sign in with Google
              </Button>
              <Button
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={() => handleSocialLogin(FacebookAuthProvider)}
                size="large"
                fullWidth
                sx={{
                  textTransform: 'none',
                  color: '#1976d2',
                  borderColor: '#1976d2',
                }}>
                Sign in with Facebook
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
