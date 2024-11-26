import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import BaseLayout from "@/Layouts/BaseLayout";
import Button from "@/Components/Buttons/Button";
import FormInput from "@/Components/Form/FormInput";

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <BaseLayout>
      <Head title="Register" />

      <div className="container max-w-96 mt-12">
        <form onSubmit={submit}>
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
              </div>

              <FormInput
                id="name"
                placeholder="Name"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                autoComplete="name"
                onChange={(e) => setData("name", e.target.value)}
                required
              />
            </label>
            <InputError message={errors.name} className="mt-2" />
          </div>

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
                autoComplete="username"
                onChange={(e) => setData("email", e.target.value)}
                required
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
                placeholder="Password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) => setData("password", e.target.value)}
                required
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
                id="password_confirmation"
                placeholder="Confirm password"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                required
              />
            </label>

            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href={route("login")}
              className="link-base-content hover:text-secondary"
            >
              Already registered?
            </Link>

            <Button
              className="ms-4 btn-accent"
              type="submit"
              disabled={processing}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}
