import {DocumentTextIcon} from '@sanity/icons'
import { defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subTitle',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      type: 'file',
      title: 'Main Image',
      options: {
        accept: 'image/*',
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ]
    }),
    
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainVideo',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})