import { SignUp } from "@clerk/nextjs";

import { PageContainer } from "@/components/page-shell";

export default function SignUpPage() {
    return (
        <PageContainer className="flex min-h-[60vh] items-center justify-center py-12">
            <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
        </PageContainer>
    );
}
