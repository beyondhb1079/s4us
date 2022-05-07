import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScholarshipCard from './ScholarshipCard';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';
import ScholarshipData from '../types/ScholarshipData';
import GradeLevel from '../types/GradeLevel';
import Ethnicity from '../types/Ethnicity';
import State from '../types/States';

const app = initializeTestApp({ projectId: 'scholarship-card-test' });
beforeAll(() => clearFirestoreData(app.options));
afterAll(() => app.delete());

const renderCard = (card: JSX.Element) =>
  render(
    <MemoryRouter>
      <Suspense fallback="loading">
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={createTheme()}>{card}</ThemeProvider>
        </I18nextProvider>
      </Suspense>
    </MemoryRouter>
  );

const data = {
  deadline: new Date(),
  name: 'test scholarship',
  description: 'bad description: 2017-2018',
  organization: 'City of Seattle',
  amount: ScholarshipAmount.unknown(),
  website: 'http://foo.com/',
  requirements: {
    states: ['CA', 'WA'],
    gpa: 4.0,
    grades: [GradeLevel.HsFreshman, GradeLevel.HsSophomore],
    ethnicities: [Ethnicity.HispanicOrLatino, Ethnicity.BlackOrAfricanAmerican],
    majors: ['Computer Science', 'Software Engineering'],
    schools: ['Cal Tech', 'MIT', 'LSU'],
  },
  tags: ['cool', 'tags', 'bro'],
  author: { id: '123', email: '123@foo.com' },
} as ScholarshipData;

const scholarship = { id: '123', data: data };
const editableScholarship = { id: '234', data: { ...data, author: undefined } };

const basicStrings = [
  ScholarshipAmount.toString(data.amount),
  data.deadline.toLocaleDateString(),
  data.description,
  data.name,
  data.organization,
  ...(data.tags as string[]),
] as string[];

const detailStrings = [
  'Eligibility Requirements',
  data.requirements?.ethnicities?.map(Ethnicity.toString),
  data.requirements?.gpa + '.0',
  data.requirements?.grades?.map(GradeLevel.toString),
  data.requirements?.majors,
  data.requirements?.schools,
  data.requirements?.states?.map(State.toString),
].flat() as string[];

const lintWarning = /potential issues detected/;

test('result renders basic info', () => {
  const { getByText, queryByText } = renderCard(
    <ScholarshipCard scholarship={scholarship} />
  );

  basicStrings.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  detailStrings.forEach((s) => expect(queryByText(s)).not.toBeInTheDocument());
  expect(queryByText(lintWarning)).not.toBeInTheDocument();
  const cardActionArea = screen.getByRole('button');
  expect(cardActionArea.textContent).toContain(data.name);
});

test('result view for editor show lint warnings', () => {
  const { getByText } = renderCard(
    <ScholarshipCard style="result" scholarship={editableScholarship} />
  );

  expect(getByText(lintWarning)).toBeInTheDocument();
});

test('detail renders detail info and Apply button', () => {
  const { getByText, queryByText } = renderCard(
    <ScholarshipCard style="detail" scholarship={scholarship} />
  );

  basicStrings.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  detailStrings.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  expect(queryByText(data.website)).not.toBeInTheDocument();
  expect(queryByText(lintWarning)).not.toBeInTheDocument();
  expect(screen.getByRole('button').textContent).toEqual('Share');
  const links = screen.getAllByRole('link');
  expect(links.map((l) => l.textContent)).toEqual(['Apply', 'Report Issue']);
  expect(links[0].href).toEqual(data.website);
  expect(links[1].href).toContain('mailto');
});

test('detail view for editor shows lint warnings and edit button', () => {
  const { getByText } = renderCard(
    <ScholarshipCard style="detail" scholarship={editableScholarship} />
  );

  basicStrings.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  detailStrings.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  expect(getByText(lintWarning)).toBeInTheDocument();
  const links = screen.getAllByRole('link');
  expect(links.map((l) => l.textContent)).toEqual([
    'Apply',
    '',
    'Report Issue',
  ]);
  expect(links[1].href).toEqual('http://localhost/edit');
});

test('preview renders detail info and URL', () => {
  const { getByText, queryByText } = renderCard(
    <ScholarshipCard style="preview" scholarship={scholarship} />
  );

  basicStrings.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  detailStrings.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  expect(getByText(data.website)).toBeInTheDocument();
  expect(queryByText(lintWarning)).not.toBeInTheDocument();
  expect(screen.getByRole('button').textContent).toEqual('Share');
  const links = screen.getAllByRole('link');
  expect(links.map((l) => l.textContent)).toEqual([data.website, 'Apply']);
  expect(links[0].href).toEqual('http://localhost/#');
  expect(links[1].href).toEqual(data.website);
});

test('preview view for editor does not show lint warnings nor edit button', () => {
  const { getByText, queryByText } = renderCard(
    <ScholarshipCard style="preview" scholarship={editableScholarship} />
  );

  basicStrings.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  detailStrings.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  expect(queryByText(lintWarning)).not.toBeInTheDocument();
  const links = screen.getAllByRole('link');
  expect(links.map((l) => l.textContent)).toEqual([data.website, 'Apply']);
});
