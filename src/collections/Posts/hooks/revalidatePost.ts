import { articleRevalidateHooks } from '../../_shared/articleRevalidateHooks'

export const { revalidateAfterChange: revalidatePost, revalidateAfterDelete: revalidateDelete } =
  articleRevalidateHooks('posts', 'posts-sitemap')
