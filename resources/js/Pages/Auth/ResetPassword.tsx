import { FormEventHandler, useEffect } from "react";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import BaseLayout from "@/Layouts/BaseLayout";
import FormInput from "@/Components/Form/FormInput";
import Button from "@/Components/Buttons/Button";

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.store"));
  };

  return (
    <BaseLayout>
      <Head title="Reset Password" />

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
                className="mt-1 block w-full"
                autoComplete="username"
                onChange={(e) => setData("email", e.target.value)}
              />
            </label>
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>

              <FormInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) => setData("password", e.target.value)}
              />
            </label>

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Confirm password</span>
              </div>

              <FormInput
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
              />
            </label>

            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button
              className="ms-4 btn-outline btn-accent"
              type="submit"
              disabled={processing}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}
