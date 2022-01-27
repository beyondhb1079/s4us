import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import GradeLevel from '../types/GradeLevel';
import sortOptions from './sortOptions';

const qParams = {
  MIN_AMOUNT: 'minAmount',
  MAX_AMOUNT: 'maxAmount',
  GRADES: 'grades',
  MAJORS: 'majors',
};

const options = {
  arrayFormat: 'bracket-separator',
  arrayFormatSeparator: ',',
  parseNumbers: true,
};

/** Returns a dictionary of query params and a setter function for individual params */
export function useQueryParams(prune = true) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = queryString.parse(location.search, options);
  const setQueryParam = (key, value, replace = false) => {
    if (value === undefined) {
      delete params[key];
    } else {
      params[key] = value;
    }
    navigate(
      {
        search: queryString.stringify(params, options),
      },
      { replace }
    );
  };

  if (prune) {
    /** Prune bad query parameter value strings */
    const clearQueryParam = (k) =>
      setQueryParam(k, undefined, /* replace= */ true);

    if (params.sortBy && !(params.sortBy in sortOptions)) {
      clearQueryParam('sortBy');
    }

    const { minAmount, maxAmount, grades, majors } = params;

    if (
      minAmount !== undefined &&
      !(Number.isInteger(minAmount) && minAmount > 0)
    ) {
      clearQueryParam(qParams.MIN_AMOUNT);
    }

    if (
      maxAmount !== undefined &&
      !(Number.isInteger(maxAmount) && maxAmount > 0)
    ) {
      clearQueryParam(qParams.MAX_AMOUNT);
    }

    /**
     * prunes invalid grade values not respresented by GradeLevel enum
     */
    if (grades !== undefined) {
      if (Array.isArray(grades) && grades.length > 0) {
        const prunedInvalid = [...new Set(grades)].filter((g) =>
          GradeLevel.keys().includes(g)
        );

        if (prunedInvalid.length !== grades.length) {
          setQueryParam(qParams.GRADES, prunedInvalid, /* prune = */ true);
        }
      } else clearQueryParam(qParams.GRADES);
    }

    if (majors !== undefined) {
      if (!Array.isArray(majors) || majors.length === 0 || majors[0] === '')
        clearQueryParam(qParams.MAJORS);
    }
  }

  return [params, setQueryParam];
}

export default qParams;
