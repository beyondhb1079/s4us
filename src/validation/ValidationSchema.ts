import { TFunction } from 'i18next';
import * as yup from 'yup';
import AmountType from '../types/AmountType';

const validationSchema: any = (t: TFunction) =>
  yup.object({
    name: yup.string().required(t('nameRequired')),
    deadline: yup
      .date()
      .required(t('deadlineRequired'))
      .typeError(t('dateValid')),
    description: yup.string().required(t('descriptionRequired')),
    website: yup.string().url(t('websiteValid')).required(t('websiteRequired')),
    amount: yup.object().shape({
      type: yup.mixed().required(t('amountOptionRequired')),
      min: yup
        .number()
        .when('type', {
          is: AmountType.Fixed,
          then: yup.number().required().moreThan(0, t('fixedAmountValid')),
        })
        .when('type', {
          is: AmountType.Varies,
          then: yup
            .number()
            .min(0, t('amountValid'))
            .test(
              'min < max test',
              t('minLessMax'),
              (min, { parent }) => !min || !parent?.max || min < parent.max
            ),
        }),
      max: yup.number().min(0, t('amountValid')).notRequired(),
    }),
    requirements: yup.object().shape({
      gpa: yup
        .number()
        .test(
          'valid GPA',
          t('GpaValid'),
          (gpa) =>
            gpa === undefined ||
            (gpa > 0 &&
              gpa <= 4 &&
              gpa.toString().match(/^[0-4](\.\d\d?)?$/) !== null)
        ),
    }),
  });

export default validationSchema;
