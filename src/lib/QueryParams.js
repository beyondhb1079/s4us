import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

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
export function useQueryParams() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = queryString.parse(location.search, options);
  const setter = (key, value, prune = false) => {
    if (value === undefined) {
      delete params[key];
    } else {
      params[key] = value;
    }
    navigate(
      {
        search: queryString.stringify(params, options),
      },
      { replace: prune }
    );
  };
  return [{ ...params }, setter];
}

export default qParams;
