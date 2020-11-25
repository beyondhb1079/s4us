import * as yup from 'yup';
import AmountType from '../types/AmountType';

/* eslint-disable import/prefer-default-export */
export const validationSchema = yup.object({
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
    amountType: yup
      .mixed()
      .oneOf(Object.values(AmountType), 'Please choose an option above'),
    minAmount: yup
      .number()
      .when('amountType', {
        is: AmountType.Fixed,
        then: yup
          .number()
          .required()
          .moreThan(0, 'Please enter the scholarship amount'),
      })
      .test('test', 'Minimum must be less than the maximum', function (value) {
        const { amountType, maxAmount } = this.parent;
        if (
          amountType === AmountType.Range &&
          value > 0 &&
          maxAmount > 0 &&
          value >= maxAmount
        )
          return false;
        return true;
      })
      .test(
        'test',
        'Amount range must have a minimum and/or a maximum',
        function (value) {
          const { amountType, maxAmount } = this.parent;
          if (amountType === AmountType.Range && value === 0 && maxAmount === 0)
            return false;
          return true;
        }
      ),
    maxAmount: yup.number().notRequired(),
  }),
});
