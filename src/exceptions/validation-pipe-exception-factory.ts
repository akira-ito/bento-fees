import { ValidationError } from '@nestjs/common';
import { MessageCode } from 'src/filter/app-response.dto';
import { AppBadRequestException } from './bad-request.exception';
import { AppResponseException } from './exception';

function getValidationErrors(
  errors: ValidationError[],
  parentName: string = '',
): AppResponseException['fields'] {
  return (
    errors.reduce(
      (res: AppResponseException['fields'], error: ValidationError) => {
        if (error.constraints)
          return [
            ...res,
            {
              name: `${parentName + error?.property}` || '',
              errors: error.constraints,
              value: error.value,
            },
          ];

        return [
          ...res,
          ...getValidationErrors(
            error?.children ?? [],
            `${parentName + error.property}.`,
          ),
        ];
      },
      [] as AppResponseException['fields'],
    ) || ([] as AppResponseException['fields'])
  );
}

export function validationPipeExceptionFactory(
  validationErrors: ValidationError[] = [],
) {
  return new AppBadRequestException(
    'Validation failed',
    validationErrors,
    getValidationErrors(validationErrors),
    MessageCode.FIELDS_VALIDATION_ERROR,
  );
}
