/* eslint-disable no-template-curly-in-string */
const typeTemplate = 'This is not a valid ${type}';

export const defaultValidateMessages = {
  default: "Validation error on field '${name}'",
  required: "'${name}' is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date",
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters",
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}",
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length",
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}",
  },
};

/** Form validation messages that do not include the names of the fields */
export const unnamedValidateMessages = {
  default: 'Validation error on this field',
  required: 'This field is required',
  enum: 'Must be one of [${enum}]',
  whitespace: 'Cannot be empty',
  date: {
    format: 'Provided input is invalid for format date',
    parse: 'Provided input could not be parsed as date',
    invalid: 'Provided input is invalid date',
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: 'Must be exactly ${len} characters',
    min: 'Must be at least ${min} characters',
    max: 'Cannot be longer than ${max} characters',
    range: 'Must be between ${min} and ${max} characters',
  },
  number: {
    len: 'Must equal ${len}',
    min: 'Cannot be less than ${min}',
    max: 'Cannot be greater than ${max}',
    range: 'Must be between ${min} and ${max}',
  },
  array: {
    len: 'Must be exactly ${len} in length',
    min: 'Cannot be less than ${min} in length',
    max: 'Cannot be greater than ${max} in length',
    range: 'Must be between ${min} and ${max} in length',
  },
  pattern: {
    mismatch: 'Does not match pattern ${pattern}',
  },
};
