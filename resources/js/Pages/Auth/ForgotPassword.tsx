import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import BaseLayout from "@/Layouts/BaseLayout";
import FormInput from "@/Components/Form/FormInput";
import Button from "@/Components/Buttons/Button";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <BaseLayout>
      <Head title="Forgot Password" />

      <div className="container max-w-96 mt-12">
        <div className="mb-4">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </div>

        {status && (
          <div className="mb-4 font-medium text-sm text-green-600">
            {status}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="mt-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <FormInput
                id="email"
                placeholder="Email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                onChange={(e) => setData("email", e.target.value)}
              />
            </label>

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button
              className="ms-4 btn-outline btn-accent"
              type="submit"
              disabled={processing}
            >
              Email Password Reset Link
            </Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}
