import { Elysia } from 'elysia'


export const rooms = new Elysia({ prefix: "/room" })
    .post("/create", () => {
        console.log("Room created");
        return { success: true, roomId: crypto.randomUUID() };
 })

export const app = new Elysia({ prefix: '/api' })
    .use(rooms)


export const GET = app.fetch
export const POST = app.fetch