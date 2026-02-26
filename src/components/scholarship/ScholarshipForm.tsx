import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import ScholarshipData from '../../types/ScholarshipData';
import Model from '../../models/base/Model';
import PureScholarshipForm from './PureScholarshipForm';

interface SFProps {
  scholarship: Model<ScholarshipData>;
}

export default function ScholarshipForm({
  scholarship,
}: SFProps): React.JSX.Element {
  const [submissionError, setSubmissionError] = useState(null as null | Error);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (
    values: ScholarshipData,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true);
    scholarship.data = { ...values };
    scholarship
      .save()
      .then((s) => {
        queryClient.invalidateQueries({ queryKey: ['scholarships'] });
        navigate(`/scholarships/${s.id}`, {
          state: {
            prevPath: location.pathname,
            scholarship: { id: s.id, data: s.data },
          },
        });
      })
      .catch(setSubmissionError)
      .finally(() => setSubmitting(false));
  };

  return (
    <PureScholarshipForm
      initialValues={scholarship.data}
      onSubmit={handleSubmit}
      submissionError={submissionError}
    />
  );
}
