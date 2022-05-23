import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  Button,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  Chip,
  createFilterOptions,
} from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import MinAmountFilter from './MinAmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import CustomAutocomplete from './CustomAutocomplete';
import State, { STATES } from '../types/States';
import { MAJORS } from '../types/options';
import { useTranslation } from 'react-i18next';

export default function FilterPanel({ onClose }) {
  const { t } = useTranslation(['filters', 'common']);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [params, setQueryParams] = useQueryParams();

  const [minAmount, setMinAmount] = useState(params.minAmount);
  const [grades, setGrades] = useState(params.grades);
  const [majors, setMajors] = useState(params.majors);
  const [states, setStates] = useState(params.states);
  const location = useLocation();

  useEffect(() => {
    const query = queryString.parse(location.search, {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: ',',
      parseNumbers: true,
    });

    setMinAmount(query.minAmount);
    setGrades(query.grades);
    setMajors(query.majors);
    setStates(query.states);
  }, [location]);

  const filters = {
    [t('whatAreYouStudying')]: {
      comp: (
        <>
          <CustomAutocomplete
            freeSolo
            value={majors || []}
            onChange={(e, val) => setMajors(val)}
            options={[...MAJORS]}
            limitReached={majors?.length >= 10}
            placeholder={`${t('enterMajorFilter')}...`}
          />
          {majors?.map((major) => (
            <Chip
              label={major}
              variant={
                params.majors?.includes(major) ? 'contained' : 'outlined'
              }
              color="primary"
              key={major}
              onClick={() => setMajors(majors.filter((m) => m !== major))}
              sx={{ mx: 1, mt: 1 }}
            />
          ))}
        </>
      ),
      changed:
        JSON.stringify(majors || []) !== JSON.stringify(params.majors || []),
      expanded: true,
    },
    [t('minAmount')]: {
      comp: (
        <MinAmountFilter
          min={minAmount ?? 0}
          onMinChange={(val) => setMinAmount(parseInt(val) || undefined)}
        />
      ),
      changed: minAmount !== params.minAmount,
    },
    [t('gradeLevel')]: {
      comp: <GradeLevelFilter grades={new Set(grades)} onChange={setGrades} />,
      changed:
        JSON.stringify(grades || []) !== JSON.stringify(params.grades || []),
    },
    [t('state')]: {
      comp: (
        <>
          <CustomAutocomplete
            value={states || []}
            onChange={(e, val) => setStates(val)}
            options={STATES.map((s) => s.abbr)}
            getOptionLabel={(s) => State.toString(s)}
            filterOptions={createFilterOptions({
              stringify: (s) => State.toString(s),
            })}
            limitReached={states?.length >= 10}
            placeholder={`${t('enterStateFilter')}...`}
          />
          {states?.map((state) => (
            <Chip
              label={State.toString(state)}
              variant={
                params.states?.includes(state) ? 'contained' : 'outlined'
              }
              color="primary"
              key={state}
              onClick={() => setStates(states.filter((s) => s !== state))}
              sx={{ mx: 1, mt: 1 }}
            />
          ))}
        </>
      ),
      changed:
        JSON.stringify(states || []) !== JSON.stringify(params.states || []),
    },
  };

  const filtersChanged = Object.keys(filters).some((k) => filters[k].changed);

  return (
    <Box>
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'space-between',
          alignContent: 'flex-end',
          width: '50%',
        }}>
        <IconButton
          onClick={() => {
            if (filtersChanged) setDialogOpen(true);
            else onClose();
          }}
          sx={{ visibility: { md: 'hidden' } }}>
          <CloseIcon />
        </IconButton>

        <Typography>{t('filters')}</Typography>
      </Toolbar>

      {Object.entries(filters).map(([name, filter]) => (
        <Accordion key={name} disableGutters defaultExpanded={filter.expanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={name + '-content'}
            id={name + '-header'}>
            <Typography sx={{ fontWeight: 'medium' }}>{name}</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ m: 1 }}>{filter.comp}</AccordionDetails>
        </Accordion>
      ))}

      <Stack direction="row" spacing={1} sx={{ m: 2 }}>
        {filtersChanged ? (
          <WarningAmberOutlinedIcon color="warning" />
        ) : (
          <CheckCircleOutlineIcon color="success" />
        )}
        <Typography>
          {filtersChanged
            ? t('changesNotYetApplied')
            : t('filtersCurrentlyApplied')}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ m: 2 }}>
        <Button
          variant="contained"
          disabled={!filtersChanged}
          onClick={() => {
            setQueryParams({ minAmount, grades, majors, states });
            onClose();
          }}>
          {t('common:actions.apply')}
        </Button>
        <Button
          disabled={!filtersChanged}
          onClick={() => {
            setMinAmount(params.minAmount);
            setGrades(params.grades);
            setMajors(params.majors);
            setStates(params.states);
          }}>
          {t('common:actions.cancel')}
        </Button>
      </Stack>

      <Box sx={{ height: { xs: 0, md: 200 } }} />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{t('unsavedChanges')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('closeConfirmation')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            {t('common:actions.cancel')}
          </Button>
          <Button color="error" onClick={onClose}>
            {t('common:actions.yesClose')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

FilterPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
};
