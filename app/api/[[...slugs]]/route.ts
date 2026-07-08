import { Elysia } from 'elysia'

export const app = new Elysia({ prefix: '/api' })
    .get('/', 'Hello Nextjs')


export const GET = app.fetch
export const POST = app.fetch