import type { ZodObject } from "zod";

export function toJsonBody(
  schema: ZodObject<NonNullable<any>>,
  description: string,
) {
  return {
    content: {
      "application/json": {
        schema: schema,
      },
    },
    description,
  };
}
