import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './heroType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType],
}
