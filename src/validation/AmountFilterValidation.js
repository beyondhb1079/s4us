import * as yup from 'yup';

const AmountFilterValidation = yup.object({
  min: yup.number().when('max', {
    is: (max) => max > 0,
    then: yup
      .number()
      .test(
        'min <= max',
        'Minimum must be less than or equal to the Maximum.',
        (min, { parent }) => min <= parent.max
      ),
  }),
  max: yup.number().notRequired(),
});

export default AmountFilterValidation;
