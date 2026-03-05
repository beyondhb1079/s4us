import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Collapse,
  Stack,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { usePendingApprovalsQuery } from '../../hooks/usePendingApprovalsQuery';
import PureScholarshipForm from '../scholarship/PureScholarshipForm';
import ScholarshipData from '../../types/ScholarshipData';
import scholarships from '../../models/Scholarships';
import { useQueryClient } from '@tanstack/react-query';

export default function PendingApprovalsQueue(): React.JSX.Element {
  const { t } = useTranslation(['dashboard', 'common', 'scholarships']);
  const { data, isLoading, error } = usePendingApprovalsQuery();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {t('common:errors.loadingFailed')}
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          {t('noPendingApprovals', 'No pending AI approvals.')}
        </Typography>
      </Box>
    );
  }

  const handleDismiss = async (id: string) => {
    const item = data.find((d) => d.id === id);
    if (item && window.confirm(t('common:actions.confirmDelete'))) {
      await item.delete();
      queryClient.invalidateQueries({ queryKey: ['pending_approvals'] });
    }
  };

  const handlePublish = async (id: string, values: ScholarshipData) => {
    try {
      // 1. Save to main scholarships collection
      const newScholarship = scholarships.new(values);
      await newScholarship.save();

      // 2. Delete from pending queue
      const item = data.find((d) => d.id === id);
      if (item) {
        await item.delete();
      }

      queryClient.invalidateQueries({ queryKey: ['pending_approvals'] });
      queryClient.invalidateQueries({ queryKey: ['scholarships'] });
      setExpandedId(null);
    } catch (err) {
      console.error('Failed to publish scholarship', err);
      alert(t('common:errors.saveFailed'));
    }
  };

  return (
    <Stack spacing={2}>
      {data.map((model) => {
        const { id, data: item } = model;
        const isExpanded = expandedId === id;

        return (
          <Paper key={id} elevation={1} sx={{ overflow: 'hidden' }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => setExpandedId(isExpanded ? null : id)}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name || t('common:labels.untitled')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.sourceUrl}
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                onClick={(e) => e.stopPropagation()}>
                <Tooltip title={t('common:actions.viewSource', 'View Source')}>
                  <IconButton
                    size="small"
                    component="a"
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <LinkIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('common:actions.delete')}>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDismiss(id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <IconButton size="small">
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Stack>
            </Box>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Divider />
              <Box sx={{ p: 3, bgcolor: 'background.default' }}>
                <Typography variant="h6" gutterBottom>
                  {t('reviewAndEdit', 'Review and Edit Details')}
                </Typography>
                <PureScholarshipForm
                  initialValues={item}
                  submitLabel={t(
                    'common:actions.publish',
                    'Publish Scholarship',
                  )}
                  onSubmit={(values, setSubmitting) => {
                    handlePublish(id, values).finally(() =>
                      setSubmitting(false),
                    );
                  }}
                  submissionError={null}
                />
              </Box>
            </Collapse>
          </Paper>
        );
      })}
    </Stack>
  );
}
