import {defineConfig} from 'sanity'
import {StructureBuilder, structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema-types'
import {BookIcon} from '@sanity/icons'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['home'])

const singletonListItem = (S: StructureBuilder, typeName: string, title?: string) =>
  S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName))

export default defineConfig({
  name: 'default',
  title: 'jan-snijder',

  projectId: 'etofyibz',
  dataset: 'production',
  basePath: '/admin',

  plugins: [
    structureTool({
      title: "Pagina's",
      icon: BookIcon,
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            singletonListItem(S, 'home', 'Home'),
            S.documentTypeListItem('painting').title('Schilderijen'),
            S.documentTypeListItem('exhibit').title('Exposities'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
