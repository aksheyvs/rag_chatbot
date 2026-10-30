import { SignIn } from "@clerk/nextjs";

import { PageContainer } from "@/components/page-shell";

export default function SignInPage() {
    return (
        <PageContainer className="flex min-h-[60vh] items-center justify-center py-12">
            <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
        </PageContainer>
    );
}
