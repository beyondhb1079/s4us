export const ScholarshipFields = {
  name: {
    key: 1,
    label: 'Scholarship Name *',
    type: 'text',
  },
  deadline: {
    key: 2,
    label: 'Deadline *',
    type: 'date',
  },
  description: {
    key: 3,
    label: 'Description *',
    type: 'text',
  },
  amountType: {
    key: 4,
    label: 'Type of Reward? *',
    type: 'select',
    options: ['unknown', 'fixed', 'range', 'fullride'], // TODO: replace with enums
  },
  rewardAmount: {
    type: 'amountSub',
    amount: {
      key: 5,
      label: 'Amount *',
      type: 'number',
    },
    minAmount: {
      key: 6,
      label: 'Minimum *',
      type: 'number',
    },
    maxAmount: {
      key: 7,
      label: 'Maximum *',
      type: 'number',
    },
  },
  website: {
    key: 8,
    label: 'Website *',
    type: 'text',
  },
  scholarshipType: {
    key: 9,
    label: 'Type of Scholarship?',
    type: 'select',
    options: ['unknown', 'academic', 'sports', 'community', 'organization'], // TODO: replace with enums
  },
  active: {
    key: 10,
    label: 'Scholarship Active?',
    type: 'checkbox',
  },
};

// TODO: implement Eligibility fields
export const EligibilityFields = {
  gpa: {
    // text field
    key: 1,
    label: 'GPA',
    type: 'number',
  },
  majors: {
    // multiple value autocomplete
    key: 2,
    label: 'Major/Majors',
    type: 'multi-autocomplete',
  },
  grades: {
    // multiple value autocomplete
    key: 3,
    label: 'Grade/Grades',
    type: 'multi-autocomplete',
  },
  schools: {
    // multiple value autocomplete
    key: 4,
    label: 'School/Schools',
    type: 'multi-autocomplete',
  },
  states: {
    // multiple value autocomplete
    key: 5,
    label: 'State/States',
    type: 'multi-autocomplete',
  },
  'first-gen': {
    // checkbox
    key: 6,
    label: 'First Generation?',
    type: 'checkbox',
  },
  gender: {
    // select (unknown, male, female, other)
    key: 7,
    label: 'Gender',
    type: 'select',
  },
  daca: {
    // select (unknown, required, not required)
    key: 8,
    label: 'Daca required?',
    type: 'select',
  },
};
