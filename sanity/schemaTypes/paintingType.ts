import {defineField, defineType} from 'sanity'

export const paintingType = defineType({
  name: 'painting',
  title: 'Painting',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
})
