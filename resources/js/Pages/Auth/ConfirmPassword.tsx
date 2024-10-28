import { FormEventHandler, useEffect } from "react";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import BaseLayout from "@/Layouts/BaseLayout";
import FormInput from "@/Components/Form/FormInput";
import Button from "@/Components/Buttons/Button";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.confirm"));
  };

  return (
    <BaseLayout>
      <Head title="Confirm Password" />

      <div className="container max-w-96 mt-12">
        <div className="mb-4">
          This is a secure area of the application. Please confirm your password
          before continuing.
        </div>

        <form onSubmit={submit}>
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
                className="w-full"
                onChange={(e) => setData("password", e.target.value)}
              />

              <InputError message={errors.password} className="mt-2" />
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button className="ms-4" disabled={processing}>
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}
