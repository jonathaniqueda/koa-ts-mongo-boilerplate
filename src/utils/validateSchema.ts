import * as Joi from 'joi';
import * as R from 'ramda';

type Errors = { [key: string]: string };

export const validateSchema = (schema: Joi.Schema, validationTarget: object) => {
    const { error } = Joi.validate(validationTarget, schema, { abortEarly: false, convert: false });

    if (!error || !error.details) {
        return undefined;
    }

    // transform { message: 'foo', path: ['a', 'b'] } => { 'a.b': 'foo' }
    const errorsArray = error.details.map(({ message, path }) => ({ [path.join('.')]: message }));
    const errors = R.mergeAll(errorsArray);

    return errors;
};
