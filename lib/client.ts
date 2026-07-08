import { treaty } from '@elysia/eden'
import type { app } from '../app/api/[[...slugs]]/route'

const baseUrl =
    typeof window === 'undefined'
        ? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
        : window.location.origin

// .api enters the Elysia `/api` prefix.
export const client = treaty<typeof app>(baseUrl).api
