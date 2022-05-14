import * as yup from 'yup';
import AmountType from '../types/AmountType';

const validationSchema: any = (validationT: any) =>
  yup.object({
    name: yup.string().required(validationT('nameRequired')),
    deadline: yup
      .date()
      .required(validationT('deadlineRequired'))
      .typeError(validationT('dateValid')),
    description: yup.string().required(validationT('descriptionRequired')),
    website: yup
      .string()
      .url(validationT('websiteValid'))
      .required(validationT('websiteRequired')),
    amount: yup.object().shape({
      type: yup.mixed().required(validationT('amountOptionRequired')),
      min: yup
        .number()
        .when('type', {
          is: AmountType.Fixed,
          then: yup
            .number()
            .required()
            .moreThan(0, validationT('fixedAmountValid')),
        })
        .when('type', {
          is: AmountType.Varies,
          then: yup
            .number()
            .min(0, validationT('amountValid'))
            .test(
              'min < max test',
              validationT('minLessMax'),
              (min, { parent }) => !min || !parent?.max || min < parent.max
            ),
        }),
      max: yup.number().min(0, validationT('amountValid')).notRequired(),
    }),
    requirements: yup.object().shape({
      gpa: yup
        .number()
        .test(
          'valid GPA',
          validationT('GpaValid'),
          (gpa) =>
            gpa === undefined ||
            (gpa > 0 &&
              gpa <= 4 &&
              gpa.toString().match(/^[0-4](\.\d\d?)?$/) !== null)
        ),
    }),
  });

export default validationSchema;
