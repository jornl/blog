import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import BaseLayout from "@/Layouts/BaseLayout";
import Button from "@/Components/Buttons/Button";

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("verification.send"));
  };

  return (
    <BaseLayout>
      <Head title="Email Verification" />

      <div className="container max-w-96 mt-12">
        <div className="mb-4">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </div>

        {status === "verification-link-sent" && (
          <div className="mb-4 font-medium">
            A new verification link has been sent to the email address you
            provided during registration.
          </div>
        )}

        <form onSubmit={submit}>
          <div className="mt-4 flex items-center justify-between">
            <Button
              type="submit"
              className="btn-outline btn-accent"
              disabled={processing}
            >
              Resend Verification Email
            </Button>

            <Link
              href={route("logout")}
              method="post"
              as="button"
              className="btn"
            >
              Log Out
            </Link>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}
