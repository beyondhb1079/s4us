import * as yup from 'yup';
import AmountType from '../types/AmountType';

const validationSchema: any = (t: (key: string) => string) =>
  yup.object({
    name: yup.string().required(t('validation:nameRequired')),
    deadline: yup
      .date()
      .required(t('validation:deadlineRequired'))
      .typeError(t('validation:dateValid')),
    description: yup.string().required(t('validation:descriptionRequired')),
    website: yup
      .string()
      .url(t('validation:websiteValid'))
      .required(t('validation:websiteRequired')),
    amount: yup.object().shape({
      type: yup.mixed().required(t('validation:amountOptionRequired')),
      min: yup
        .number()
        .when('type', {
          is: AmountType.Fixed,
          then: yup
            .number()
            .required()
            .moreThan(0, t('validation:fixedAmountValid')),
        })
        .when('type', {
          is: AmountType.Varies,
          then: yup
            .number()
            .min(0, t('validation:amountValid'))
            .test(
              'min < max test',
              t('validation:minLessMax'),
              (min, { parent }) => !min || !parent?.max || min < parent.max
            ),
        }),
      max: yup.number().min(0, t('validation:amountValid')).notRequired(),
    }),
    requirements: yup.object().shape({
      gpa: yup
        .number()
        .test(
          'valid GPA',
          t('validation:GpaValid'),
          (gpa) =>
            gpa === undefined ||
            (gpa > 0 &&
              gpa <= 4 &&
              gpa.toString().match(/^[0-4](\.\d\d?)?$/) !== null)
        ),
    }),
  });

export default validationSchema;
