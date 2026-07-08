import { treaty } from '@elysia/eden'
import type { app } from '../app/api/[[...slugs]]/route'

// .api to enter /api prefix
export const client =
    // process is defined on server side and build time
    typeof process !== 'undefined'
        ? treaty<typeof app>('/api').api
        : treaty<typeof app>('localhost:3001').api