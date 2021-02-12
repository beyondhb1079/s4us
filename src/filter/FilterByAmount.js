import AmountType from '../types/AmountType';

function FilterByAmount(result, filterMin, filterMax) {
  const { min, max, type } = result.data.amount;
  // console.log(`Type: ${type} - Min:${min} Max:${max}`);

  if (type === AmountType.Range) {
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

  if (type === AmountType.Fixed)
    return (
      // both filter values
      (filterMin > 0 &&
        filterMax > 0 &&
        filterMin <= min &&
        filterMax >= max) ||
      // min filter only
      (filterMax === 0 && filterMin <= min) ||
      // max filter only
      (filterMin === 0 && filterMax >= max)
    );

  // if type is Unknown or Full Tuition
  return false;
}

export default FilterByAmount;
