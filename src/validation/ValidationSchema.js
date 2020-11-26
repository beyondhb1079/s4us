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
    minAmount: yup
      .number()
      .when('type', {
        is: AmountType.Fixed,
        then: yup
          .number()
          .required()
          .moreThan(0, 'Please enter the scholarship amount'),
      })
      /* eslint-disable func-names */
      .test('test', 'Minimum must be less than the maximum', function (value) {
        const { type, maxAmount } = this.parent;
        if (
          type === AmountType.Range &&
          value > 0 &&
          maxAmount > 0 &&
          value >= maxAmount
        )
          return false;
        return true;
      })
      .test(
        'test',
        'Range amount must have a minimum and/or a maximum',
        function (value) {
          const { type, maxAmount } = this.parent;
          if (type === AmountType.Range && value === 0 && maxAmount === 0)
            return false;
          return true;
        }
      ),
    maxAmount: yup.number().notRequired(),
  }),
});

export default validationSchema;
