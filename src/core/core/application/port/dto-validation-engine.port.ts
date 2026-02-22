export const DTO_VALIDATION_ENGINE = Symbol('DTO_VALIDATION_ENGINE');

export const DTO_SCHEMA_KEY = 'dto:schema';

export interface DtoValidationEnginePort<TSchema = unknown> {
  validate(schema: TSchema, value: unknown): unknown;
}
