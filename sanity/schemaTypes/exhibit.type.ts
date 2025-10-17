import {defineField, defineType} from 'sanity'

export const exhibitType = defineType({
  name: 'exhibit',
  title: 'Exhibit',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'year',
      type: 'number',
    }),
    defineField({
      name: 'location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
  ],
})
