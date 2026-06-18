import React from 'react'
import Image from 'next/image';
import type {Metadata} from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; 
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldSet,
} from "@/components/ui/field";
import { GithubSignInForm } from '@/features/auth/components/github-sign-in-form';

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your CodeDog account",
}

type SignInPageProps = {
    searchParams: Promise<{callbackUrl ?: string}> 
}

async function SignInPage({searchParams}: SignInPageProps) {
    const {callbackUrl} = await searchParams;
  return (
    <Card className="border-border/80 shadow-sm">
        <CardHeader className='items-center text-center'>
            <div className='mb-6 flex justify-center pt-2'>
                <Image 
                    src="/CodeDog.png"
                    alt='CodeDog logo'
                    width={70}
                    height={70}
                    priority
                    className='bg-muted/40'
                />
            </div>
            <CardTitle className='text-base'>Welcome</CardTitle>
            <CardDescription >Sign in with Github to review and manage your code.</CardDescription>
        </CardHeader>
        <CardContent>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <GithubSignInForm callbackUrl={callbackUrl} />
                        <FieldDescription className="text-center">
                            We only request the permission needed to identify your account. You can revoke access at any time in your GitHub settings.
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </CardContent>
    </Card>

  )
}

export default SignInPage