"use server"

import {auth} from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_AUTH_PATH, getSafeCallbackPath, SIGN_IN_PATH } from "../utils/constantPaths";

export async function signInWithGithub(formaData: FormData){
    const callBack = formaData.get("callbackUrl");

    const redirectTo = getSafeCallbackPath(
        typeof callBack === "string" ? callBack : null
    )

    const result = await auth.api.signInSocial({
        body: {
            provider: "github",
            callbackURL: redirectTo,
        },
        headers: await headers(),
    })



    if(result.url){
        redirect(result.url);
    }
}

export async function getServerSession(){
    return auth.api.getSession({
        headers: await headers(),
    })
}

export async function requireAuth(redirectTo=SIGN_IN_PATH){
    const session = await getServerSession();

    if(! session){
        redirect(redirectTo);
    }

    return session;
}

export async function requireUnAuth(redirectTo=DEFAULT_AUTH_PATH){
    const session = await getServerSession();
    if(session){
        redirect(redirectTo);
    }

    return session;
}
