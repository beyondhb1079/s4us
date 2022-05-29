import React, { useState } from 'react';
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

import CustomAutocomplete from './CustomAutocomplete';
import State, { STATES } from '../types/States';
import { SCHOOLS } from '../types/options';
import { MAJORS } from '../types/options';
import { useTranslation } from 'react-i18next';

export default function FilterPanel({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element {
  const { t } = useTranslation(['filters', 'common']);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [params, setQueryParams] = useQueryParams();

  const [minAmount, setMinAmount] = useState(params.minAmount);
  const [grades, setGrades] = useState(params.grades || []);
  const [majors, setMajors] = useState(params.majors || []);
  const [states, setStates] = useState(params.states || []);
  const [schools, setSchools] = useState(params.schools || []);

  const filters = {
    [t('whatAreYouStudying')]: {
      comp: (
        <>
          <CustomAutocomplete
            freeSolo
            value={majors}
            onChange={(e: any, val: string[]) => setMajors(val)}
            options={Array.from(MAJORS)}
            limitReached={majors?.length >= 10}
            placeholder={`${t('enterMajorFilter')}...`}
          />
          {majors?.map((major: string) => (
            <Chip
              label={major}
              variant={params.majors?.includes(major) ? 'filled' : 'outlined'}
              color="primary"
              key={major}
              onClick={() =>
                setMajors(majors.filter((m: string) => m !== major))
              }
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
          onMinChange={(val) => setMinAmount(val || undefined)}
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
            value={states}
            onChange={(e: any, val: string[]) => setStates(val)}
            options={STATES.map((s) => s.abbr)}
            getOptionLabel={(s: string) => State.toString(s)}
            filterOptions={createFilterOptions({
              stringify: (s: string) => State.toString(s),
            })}
            limitReached={states?.length >= 10}
            placeholder={`${t('enterStateFilter')}...`}
          />
          {states?.map((state: string) => (
            <Chip
              label={State.toString(state)}
              variant={params.states?.includes(state) ? 'filled' : 'outlined'}
              color="primary"
              key={state}
              onClick={() =>
                setStates(states.filter((s: string) => s !== state))
              }
              sx={{ mx: 1, mt: 1 }}
            />
          ))}
        </>
      ),
      changed:
        JSON.stringify(states || []) !== JSON.stringify(params.states || []),
    },
    [t('school')]: {
      comp: (
        <>
          <CustomAutocomplete
            freeSolo
            value={schools}
            onChange={(e: any, val: string[]) => setSchools(val)}
            options={SCHOOLS.map(({ name, state }) => `${name} (${state})`)}
            limitReached={schools?.length >= 10}
            placeholder={t('enterSchoolFilter')}
          />
          {schools?.map((school: string) => (
            <Chip
              label={school}
              variant={params.schools?.includes(school) ? 'filled' : 'outlined'}
              color="primary"
              key={school}
              onClick={() =>
                setSchools(schools.filter((s: string) => s !== school))
              }
              sx={{ mx: 1, mt: 1 }}
            />
          ))}
        </>
      ),
      changed:
        JSON.stringify(schools || []) !== JSON.stringify(params.schools || []),
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
            setQueryParams({ minAmount, grades, majors, states, schools });
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
            setSchools(params.schools);
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
