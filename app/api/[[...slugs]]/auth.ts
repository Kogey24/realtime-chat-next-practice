import { redis } from "@/lib/redis";
import Elysia from "elysia"

class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthError";
    }
}


export const authMiddleware = new Elysia({
    name: "auth"
})
    .error({ AuthError })
    .onError(({ code, error, set }) => {
        if (code === "AuthError" || error instanceof AuthError) {
            set.status = 401;
            return { error: "unauthorized" };
        }
    })
    .derive({ as: "scoped" }, async ({ query, cookie }) => {
        const roomId = query.roomId;
        const token = cookie["x-auth-token"]?.value as string | undefined;

        if (!roomId || !token) {
            throw new AuthError("Missing roomId or token.");
        }

        const connected = await redis.hget<string[]>(`meta:${roomId}`, "connected");

        if (!connected?.includes(token)) {
            throw new AuthError("invalid Token");
        }

        return { auth: { roomId, token, connected } };
    })
