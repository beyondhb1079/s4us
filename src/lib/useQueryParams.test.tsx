import { MemoryRouter } from 'react-router-dom';
import useQueryParams from './useQueryParams';
import { renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';

function renderHookWithLocation(search: string, prune?: boolean) {
  const wrapper = (props: { children: ReactNode }) => (
    <MemoryRouter initialEntries={['?' + search]}>
      {props.children}
    </MemoryRouter>
  );
  const result = renderHook(() => useQueryParams(prune), { wrapper });
  const [params, setQueryParam] = result.result.current;
  return { params, setQueryParam };
}

test('parses using options', () => {
  const { params, setQueryParam } = renderHookWithLocation('x=string&y[]=1,2');

  expect(params).toMatchObject({ x: 'string', y: [1, 2] });
  expect(setQueryParam).toBeInstanceOf(Function);
});

test('prunes null or empty known keys', () => {
  ['minAmount', 'maxAmount', 'grades', 'majors', 'sortBy'].forEach((k) => {
    const { params, setQueryParam } = renderHookWithLocation(k + '=null');

    expect(params).toMatchObject({});
    expect(setQueryParam).toBeInstanceOf(Function);

    const res2 = renderHookWithLocation(k + '=');
    expect(res2.params).toMatchObject({});
    expect(res2.setQueryParam).toBeInstanceOf(Function);
  });
});

test('prunes lists of empty string for known keys', () => {
  const { params, setQueryParam } = renderHookWithLocation(
    'grades[]=,,&majors[]=,'
  );
  expect(params).toMatchObject({});
  expect(setQueryParam).toBeInstanceOf(Function);
});

test('prunes bad amount values', () => {
  const { params, setQueryParam } = renderHookWithLocation(
    'minAmount=4.0&maxAmount=-2&'
  );
  expect(params).toMatchObject({});
  expect(setQueryParam).toBeInstanceOf(Function);
});

test('prunes bad grade values', () => {
  const { params, setQueryParam } = renderHookWithLocation(
    'grades[]=Senior,8,90,1'
  );
  expect(params).toMatchObject({ grades: [8] });
  expect(setQueryParam).toBeInstanceOf(Function);
});

test('does not prune if explicitly false', () => {
  const { params, setQueryParam } = renderHookWithLocation(
    'grades[]=Senior&minAmount=x&maxAmount=5',
    /* prune = */ false
  );
  expect(params).toMatchObject({
    grades: ['Senior'],
    minAmount: 'x',
    maxAmount: 5,
  });
  expect(setQueryParam).toBeInstanceOf(Function);
});
