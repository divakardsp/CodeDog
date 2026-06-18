import { requireUnAuth } from "@/features/auth/actions";



export default async function authLayout({children}: {children: React.ReactNode}){
    await requireUnAuth();
    return(
        <div className="flex min-h-full flex-col flex-1 items-center justify-center bg-muted/40 px-4 py-12">
            <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    )
    }