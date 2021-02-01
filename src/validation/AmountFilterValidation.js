import * as yup from 'yup';

const AmountFilterValidation = yup.object({
  min: yup.number().when('max', {
    is: (max) => max > 0,
    then: yup
      .number()
      .lessThan(yup.ref('max'), 'Minimum must be less than the maximum.'),
  }),
  max: yup.number().notRequired(),
});

export default AmountFilterValidation;
