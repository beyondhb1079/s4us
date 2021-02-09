function FilterByAmount(results, filterMin, filterMax) {
  // fixed range
  if (filterMin > 0 && filterMin === filterMax)
    return results.filter(
      (result) =>
        (result.data.amount.min <= filterMin &&
          result.data.amount.max >= filterMax) ||
        result.data.amount.max === 0
    );

  // only min is set
  if (filterMin > 0 && filterMax === 0)
    return results.filter(
      (result) =>
        (result.data.amount.min > 0 && result.data.amount.min >= filterMin) ||
        result.data.amount.max >= filterMin
    );

  // only max is set
  if (filterMax > 0 && filterMin === 0)
    return results.filter(
      (result) =>
        (result.data.amount.max > 0 && result.data.amount.max <= filterMax) ||
        result.data.amount.min <= filterMax
    );

  // both min and max are set to different values
  if (filterMin > 0 && filterMax > 0)
    return results.filter(
      (result) =>
        (result.data.amount.max >= filterMin &&
          result.data.amount.min <= filterMax) ||
        (result.data.amount.max === 0 && result.data.amount.min <= filterMax)
    );

  // when min and max are unknown
  return results;
}

export default FilterByAmount;
