import { MemoryRouter } from 'react-router-dom';
import useQueryParams from './useQueryParams';
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { ReactNode } from 'react';

function renderHookWithLocation(search: string, prune?: boolean) {
  const wrapper = (props: { children: ReactNode }) => (
    <MemoryRouter initialEntries={['?' + search]}>
      {props.children}
    </MemoryRouter>
  );
  const { result } = renderHook(() => useQueryParams(prune), { wrapper });
  const [params, setQueryParams] = result.current;
  return { params, setQueryParams };
}

test('parses using options', () => {
  const { params, setQueryParams } = renderHookWithLocation('x=string&y[]=1,2');

  expect(params).toMatchObject({ x: 'string', y: [1, 2] });
  expect(setQueryParams).toBeInstanceOf(Function);
});

test('prunes null or empty known keys', () => {
  [
    'minAmount',
    'maxAmount',
    'grades',
    'majors',
    'states',
    'schools',
    'ethnicities',
    'sortBy',
    'showExpired',
  ].forEach((k) => {
    const { params, setQueryParams } = renderHookWithLocation(k + '=null');

    expect(params).toMatchObject({});
    expect(setQueryParams).toBeInstanceOf(Function);

    const res2 = renderHookWithLocation(k + '=');
    expect(res2.params).toMatchObject({});
    expect(res2.setQueryParams).toBeInstanceOf(Function);
  });
});

test('prunes bad types for known keys', () => {
  const { params, setQueryParams } = renderHookWithLocation(
    'grades=bar,,&minAmount=2.3&maxAmount=foo&majors=4&states=ca&schools=23&ethnicities=asian&showExpired=0',
  );
  expect(params).toMatchObject({});
  expect(setQueryParams).toBeInstanceOf(Function);
});

test('prunes null or empty list values for known list keys', () => {
  const { params, setQueryParams } = renderHookWithLocation(
    'grades[]=,,&majors[]=,foo&states[]=&schools[]=&ethnicities[]=',
  );
  expect(params).toMatchObject({ majors: ['foo'] });
  expect(setQueryParams).toBeInstanceOf(Function);
});

test('prunes bad types', () => {
  const { params, setQueryParams } = renderHookWithLocation(
    'minAmount=4.0&maxAmount=-2&',
  );
  expect(params).toMatchObject({});
  expect(setQueryParams).toBeInstanceOf(Function);
});

test('prunes bad grade values', () => {
  const { params, setQueryParams } = renderHookWithLocation(
    'grades[]=Senior,8,90,1',
  );
  expect(params).toMatchObject({ grades: [8] });
  expect(setQueryParams).toBeInstanceOf(Function);
});

test('does not prune if explicitly false', () => {
  const { params, setQueryParams } = renderHookWithLocation(
    'grades[]=Senior&minAmount=x&maxAmount=5',
    /* prune = */ false,
  );
  expect(params).toMatchObject({
    grades: ['Senior'],
    minAmount: 'x',
    maxAmount: 5,
  });
  expect(setQueryParams).toBeInstanceOf(Function);
});

test('prunes bad state values', () => {
  const { params, setQueryParams } = renderHookWithLocation(
    'states[]=tx,23,CA,ER',
  );
  expect(params).toMatchObject({ states: ['CA'] });
  expect(setQueryParams).toBeInstanceOf(Function);
});

test('prunes bad ethnicity values', () => {
  const { params, setQueryParams } = renderHookWithLocation(
    'ethnicities[]=23,test,ASIAN',
  );
  expect(params).toMatchObject({ ethnicities: ['ASIAN'] });
  expect(setQueryParams).toBeInstanceOf(Function);
});
