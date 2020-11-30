import * as yup from 'yup';
import AmountType from '../types/AmountType';

const validationSchema = yup.object({
  name: yup.string().required('Please enter the scholarship name'),
  deadline: yup
    .date()
    .required('Please enter the scholarship deadline')
    .typeError('Please enter a valid date'),
  description: yup
    .string()
    .required('Please enter the scholarship description'),
  website: yup
    .string()
    .url('Website must be a valid URL')
    .required('Please enter the scholarship website'),
  amount: yup.object().shape({
    type: yup.mixed().required('Please choose an option above'),
    min: yup
      .number()
      .when('type', {
        is: AmountType.Fixed,
        then: yup
          .number()
          .required()
          .moreThan(0, 'Please enter the scholarship amount'),
      })
      .when('type', {
        is: AmountType.Range,
        then: yup
          .number()
          .test(
            'min < max test',
            'Minimum must be less than the maximum',
            (min, { parent }) =>
              min === 0 || parent.max === 0 || min < parent.max
          )
          .test(
            'min max both empty test',
            'Range amount must have a minimum and/or a maximum',
            (min, { parent }) => min > 0 || parent.max > 0
          ),
      }),
    max: yup
      .number()
      .min(0, 'Please input an amount greater than 0')
      .notRequired(),
  }),
});

export default validationSchema;
