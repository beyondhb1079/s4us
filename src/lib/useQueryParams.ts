import queryString, { ParseOptions } from 'query-string';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GradeLevel from '../types/GradeLevel';
import { STATES } from '../types/States';
import sortOptions from './sortOptions';

const options: ParseOptions = {
  arrayFormat: 'bracket-separator',
  arrayFormatSeparator: ',',
  parseNumbers: true,
};

type SetQueryParamsFn = (
  params: Record<string, any>,
  replace?: boolean
) => void;

/**
 * Returns the query string parsed as an object, and a function to update parameters.
 * @example
 * const [params, setQueryParams] = useQueryParams();
 * const { someKey } = params;
 * setQueryParams({someKey: 'new value'});
 *
 * @param prune whether to prune known bad parameter values.
 *
 */
export default function useQueryParams(
  prune = true
): [Record<string, any>, SetQueryParamsFn] {
  const locationSearch = useLocation().search;
  const navigate = useNavigate();

  const setQueryParams = (params: Record<string, any>, replace = false) => {
    const origParams = queryString.parse(locationSearch, options);
    Object.keys(params).forEach((k) => {
      if (params[k] === undefined) {
        delete origParams[k];
      } else {
        origParams[k] = params[k];
      }
    });

    const search = queryString.stringify(origParams, options);
    navigate({ search }, { replace });
  };

  const params = useMemo(
    () =>
      JSON.parse(JSON.stringify(queryString.parse(locationSearch, options))),
    [locationSearch]
  );

  if (prune) {
    /** Prune bad query parameter value strings */
    const { minAmount, maxAmount, grades, majors, states, sortBy } = params;

    if (
      sortBy !== undefined &&
      (typeof sortBy !== 'string' || !sortOptions.includes(sortBy))
    ) {
      delete params.sortBy;
    }

    if (
      minAmount !== undefined &&
      !(Number.isInteger(minAmount) && (minAmount as unknown as number) > 0)
    ) {
      delete params.minAmount;
    }

    if (
      maxAmount !== undefined &&
      !(Number.isInteger(maxAmount) && (maxAmount as unknown as number) > 0)
    ) {
      delete params.maxAmount;
    }

    if (grades !== undefined) {
      // Prune invalid grade values not respresented by GradeLevel enum
      params.grades = Array.isArray(grades)
        ? Array.from(
            new Set(grades.filter((g) => GradeLevel.keys().includes(g)))
          )
        : [];
      if (params.grades.length === 0) delete params.grades;
    }

    if (majors !== undefined) {
      // Prune empty strings
      params.majors = Array.isArray(majors)
        ? Array.from(new Set(majors)).filter((s) => s.length > 0)
        : [];
      if (params.majors.length === 0) {
        delete params.majors;
      }
    }

    if (states !== undefined) {
      params.states = Array.isArray(states)
        ? Array.from(
            new Set(
              states.filter((s) => STATES.map((st) => st.abbr).includes(s))
            )
          ).filter((s) => s.length > 0)
        : [];
      if (params.states.length === 0) {
        delete params.states;
      }
    }
  }

  // Navigate to the current page with the params cleaned up
  useEffect(() => {
    const search = queryString.stringify(params, options);
    if (locationSearch != search) {
      navigate({ search }, { replace: true });
    }
  }, [locationSearch, navigate, params]);

  return [params, setQueryParams];
}
