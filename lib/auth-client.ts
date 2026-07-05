import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    baseURL: "https://prior-handsfree-cataract.ngrok-free.dev",
});
