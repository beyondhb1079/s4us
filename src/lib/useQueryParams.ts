import queryString, { ParseOptions } from 'query-string';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GradeLevel from '../types/GradeLevel';
import sortOptions from './sortOptions';

const options: ParseOptions = {
  arrayFormat: 'bracket-separator',
  arrayFormatSeparator: ',',
  parseNumbers: true,
};

type SetQueryParamFn = (
  key: 'minAmount' | 'maxAmount' | 'grades' | 'majors' | 'sortBy',
  value: any,
  replace: boolean
) => void;

/**
 * Returns the query string parsed as an object, and a function to update individual parameters.
 * @example
 * const [params, setQueryParam] = useQueryParam();
 * const { someKey } = params;
 * setQueryParam(someKey, 'new value');
 *
 * @param prune whether to prune known bad parameter values.
 *
 */
export default function useQueryParams(
  prune = true
): [Record<string, any>, SetQueryParamFn] {
  const location = useLocation();
  const navigate = useNavigate();
  const origParams = queryString.parse(location.search, options);
  const setQueryParam = (key: string, value: any, replace = false) => {
    if (value === undefined) {
      delete origParams[key];
    } else {
      origParams[key] = value;
    }
    navigate(
      {
        search: queryString.stringify(origParams, options),
      },
      { replace }
    );
  };

  const params = JSON.parse(JSON.stringify(origParams));

  useEffect(() => {
    if (prune) {
      /** Prune bad query parameter value strings */
      const { minAmount, maxAmount, grades, majors, sortBy } = params;

      if (
        sortBy !== undefined &&
        (typeof sortBy !== 'string' || !(sortBy in sortOptions))
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

      if (JSON.stringify(params) !== JSON.stringify(origParams)) {
        // Navigate to the current page with the params cleaned up
        navigate(
          {
            search: queryString.stringify(params, options),
          },
          { replace: true }
        );
      }
    }
  }, [navigate, params, prune, origParams]);

  return [{ ...params }, setQueryParam];
}
