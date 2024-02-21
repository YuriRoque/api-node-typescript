import { RequestHandler } from 'express';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

type Property = 'body' | 'header' | 'params' | 'query';
type GetSchema = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T>,
) => ObjectSchema<T>;
type AllSchemas = Record<Property, ObjectSchema<any>>;
type GetAllSchemas = (getSchema: GetSchema) => Partial<AllSchemas>;
type Validation = (schemas: GetAllSchemas) => RequestHandler;

export const validation: Validation =
  GetAllSchemas => async (req, res, next) => {
    const schemas = GetAllSchemas(schema => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as Property], { abortEarly: false });
      } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(error => {
          if (!error.path) {
            return;
          }

          errors[error.path] = error.message;
        });

        errorsResult[key] = errors;
      }
    });

    if (!Object.entries(errorsResult)) {
      return next();
    } else {
      return res.status(400).json({ errors: errorsResult });
    }
  };
