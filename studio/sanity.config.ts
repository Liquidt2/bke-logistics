import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'bke-logistics',
  title: 'BKE Logistics CMS',

  // TODO: Replace with your actual Sanity project ID
  // Get this from https://sanity.io/manage after creating a project
  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
