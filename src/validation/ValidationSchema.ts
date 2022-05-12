import * as yup from 'yup';
import AmountType from '../types/AmountType';

const validationSchema: any = (t: (key: string) => string) =>
  yup.object({
    name: yup.string().required(t('validation:name')),
    deadline: yup
      .date()
      .required(t('validation:deadline'))
      .typeError(t('validation:validDate')),
    description: yup.string().required(t('validation:description')),
    website: yup
      .string()
      .url(t('validation:validWebsite'))
      .required(t('validation:website')),
    amount: yup.object().shape({
      type: yup.mixed().required(t('validation:option')),
      min: yup
        .number()
        .when('type', {
          is: AmountType.Fixed,
          then: yup
            .number()
            .required()
            .moreThan(0, t('validation:validFixedAmount')),
        })
        .when('type', {
          is: AmountType.Varies,
          then: yup
            .number()
            .min(0, t('validation:validAmount'))
            .test(
              'min < max test',
              t('validation:minLessMax'),
              (min, { parent }) => !min || !parent?.max || min < parent.max
            ),
        }),
      max: yup.number().min(0, t('validation:validAmount')).notRequired(),
    }),
    requirements: yup.object().shape({
      gpa: yup
        .number()
        .test(
          'valid GPA',
          t('validation:validGpa'),
          (gpa) =>
            gpa === undefined ||
            (gpa > 0 &&
              gpa <= 4 &&
              gpa.toString().match(/^[0-4](\.\d\d?)?$/) !== null)
        ),
    }),
  });

export default validationSchema;
