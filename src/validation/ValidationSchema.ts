import * as yup from 'yup';
import AmountType from '../types/AmountType';

const validationSchema = yup.object({
  name: yup.string().required('name'),
  deadline: yup.date().required('deadline').typeError('validDate'),
  description: yup.string().required('description'),
  website: yup.string().url('validWebsite').required('website'),
  amount: yup.object().shape({
    type: yup.mixed().required('option'),
    min: yup
      .number()
      .when('type', {
        is: AmountType.Fixed,
        then: yup.number().required().moreThan(0, 'validFixedAmount'),
      })
      .when('type', {
        is: AmountType.Varies,
        then: yup
          .number()
          .min(0, 'validAmount')
          .test(
            'min < max test',
            'minLessMax',
            (min, { parent }) => !min || !parent?.max || min < parent.max
          ),
      }),
    max: yup.number().min(0, 'validAmount').notRequired(),
  }),
  requirements: yup.object().shape({
    gpa: yup
      .number()
      .test(
        'valid GPA',
        'validGpa',
        (gpa) =>
          gpa === undefined ||
          (gpa > 0 &&
            gpa <= 4 &&
            gpa.toString().match(/^[0-4](\.\d\d?)?$/) !== null)
      ),
  }),
});

export default validationSchema;
