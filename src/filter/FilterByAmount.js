import AmountType from '../types/AmountType';

function FilterByAmount(resultAmount, filterMin, filterMax) {
  const { min, max, type } = resultAmount;

  if (type === AmountType.Range || type === AmountType.Fixed) {
    // both ranges filled
    if (min > 0 && max > 0)
      return (
        (filterMin > 0 &&
          filterMax > 0 &&
          min <= filterMax &&
          max >= filterMin) ||
        // only min fitler
        (filterMin > 0 && filterMax === 0 && max >= filterMin) ||
        // only max filter
        (filterMin === 0 && filterMax > 0 && min <= filterMax)
      );
    // only min range filled
    if (min > 0 && max === 0)
      return (
        filterMax >= min ||
        // only min filter
        filterMax === 0 ||
        // only max filter
        (filterMin === 0 && filterMax >= min)
      );

    // only max filled
    if (max > 0 && min === 0) return filterMin <= max;
  }
  if (type === AmountType.FullTuition) return filterMax === 0;
  if (type === AmountType.Unknown) return true;

  // if type is Unknown or Full Tuition
  return false;
}

export default FilterByAmount;
