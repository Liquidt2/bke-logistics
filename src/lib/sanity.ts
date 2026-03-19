import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'bsdvrntg',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function getAllPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "mainImageUrl": mainImage.asset->url,
      "categories": categories[]->title,
      "authorName": author->name,
    }
  `);
}

export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      "mainImageUrl": mainImage.asset->url,
      "categories": categories[]->title,
      "authorName": author->name,
    }
  `, { slug });
}

export async function getRecentPosts(limit = 3) {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "mainImageUrl": mainImage.asset->url,
      "categories": categories[]->title,
    }
  `, { limit });
}
