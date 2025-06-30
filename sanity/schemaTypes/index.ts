import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './heroType'
import { productType } from './productType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType,productType],
}
