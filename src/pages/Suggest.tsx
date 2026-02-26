import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore/lite';
import { getApp } from 'firebase/app';

export default function Suggest(): React.JSX.Element {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const appCheckInitialized = useRef(false);

  const initAppCheck = async () => {
    if (!appCheckInitialized.current && import.meta.env.PROD) {
      try {
        const { initializeAppCheck, ReCaptchaV3Provider } =
          await import('firebase/app-check');
        initializeAppCheck(getApp(), {
          provider: new ReCaptchaV3Provider(
            import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'dummy_key',
          ),
          isTokenAutoRefreshEnabled: true,
        });
        appCheckInitialized.current = true;
      } catch (err) {
        console.error('Failed to initialize AppCheck', err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      new URL(url); // Basic validation
    } catch {
      setError(t('suggest.error_invalid_url', 'Please enter a valid URL.'));
      return;
    }

    setLoading(true);
    setError(null);

    // Client-side cache deduplication
    const cachedUrlsRaw = localStorage.getItem('suggested_urls');
    const cachedUrls: string[] = cachedUrlsRaw ? JSON.parse(cachedUrlsRaw) : [];

    if (cachedUrls.includes(url)) {
      // Already submitted, fire-and-forget success immediately
      setSuccess(true);
      setLoading(false);
      setUrl('');
      return;
    }

    try {
      const db = getFirestore(getApp());
      await addDoc(collection(db, 'suggestions_queue'), {
        url,
        status: 'PENDING',
        submittedAt: serverTimestamp(),
      });

      // Update cache
      cachedUrls.push(url);
      localStorage.setItem('suggested_urls', JSON.stringify(cachedUrls));

      setSuccess(true);
      setUrl('');
    } catch (err) {
      console.error(err);
      setError(
        t(
          'suggest.error_submission',
          'Failed to submit the URL. Please try again.',
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AutoAwesome color="primary" sx={{ mr: 1, fontSize: 32 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            {t('suggest.title', 'Suggest a Link')}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 4 }} color="text.secondary">
          {t(
            'suggest.description',
            'Found a scholarship? Drop a link below. Our AI Co-Pilot will analyze the page and extract the requirements automatically.',
          )}
        </Typography>

        {success ? (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSuccess(false)}>
            {t(
              'suggest.success',
              'Awesome! Your link is queued for AI analysis. Thanks for contributing.',
            )}
          </Alert>
        ) : null}

        {error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : null}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            type="url"
            label={t('suggest.url_label', 'Scholarship URL')}
            placeholder="https://example.com/scholarship"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={initAppCheck}
            disabled={loading}
            required
            sx={{ mb: 3 }}
            inputProps={{
              'aria-label': t(
                'suggest.url_aria_label',
                'Enter the scholarship URL to analyze',
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={!url || loading}
            startIcon={loading ? undefined : <AutoAwesome />}>
            {loading
              ? t('common.loading', 'Loading...')
              : t('suggest.button', 'Queue for Analysis')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
