import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import BaseLayout from "@/Layouts/BaseLayout";
import FormInput from "@/Components/Form/FormInput";
import Button from "@/Components/Buttons/Button";

type LoginPageProps = {
  status?: string;
  canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: LoginPageProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <BaseLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}
      <div className="container max-w-96 mt-12">
        <form onSubmit={submit}>
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>

              <FormInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="w-full"
                autoComplete="username"
                onChange={(e) => setData("email", e.target.value)}
              />
            </label>
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="my-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>

              <FormInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="w-full"
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
              />
            </label>

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="block mt-4">
            <label className="cursor-pointer label">
              <span className="label-text">Remember me</span>
              <input
                type="checkbox"
                className="toggle toggle-secondary"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
              />
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="hover:text-accent mr-5"
              >
                Forgot your password?
              </Link>
            )}

            <Button className="" type="submit" disabled={processing}>
              Log in
            </Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}
