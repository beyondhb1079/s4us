import * as yup from 'yup';
import AmountType from '../types/AmountType';

/* eslint-disable import/prefer-default-export */
export const validationSchema = yup.object({
  name: yup.string().required('Please enter the scholarship name'),
  deadline: yup
    .date()
    .required('Please enter the scholarship deadline')
    .nullable()
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
      .oneOf(Object.values(AmountType))
      .required()
      .nullable(),
    minAmount: yup.number().when('amountType', {
      is: AmountType.Fixed,
      then: yup
        .number()
        .required()
        .moreThan(0, 'Please enter the scholarship amount'),
    }),
    maxAmount: yup.number().when(['amountType', 'minAmount'], {
      is: (amountType, minAmount) =>
        amountType === AmountType.Range && minAmount > 0,
      then: yup.number().test('test1', 'min less than max', (value) => {
        if (value !== 0 && value < yup.ref('minAmount')) return true;
        return false;
      }),
    }),
  }),
});
