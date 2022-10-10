import { useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setLoading(true);
    console.log("Submitted: ", values);
    setTimeout(setLoading, 1000, false);
  });

  return (
    <div className="bg-primary-content min-h-screen relative p-4">
      <div className="card w-96 shadow-xl mx-auto my-8 bg-base-100">
        <figure>
          <Image
            src="https://placeimg.com/400/225/arch"
            alt="Architecture"
            width={400}
            height={225}
          />
        </figure>
        <form className="card-body" onSubmit={onSubmit}>
          <h2 className="card-title">Onlymin.</h2>
          <p className="mb-6">Who are you?</p>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input placeholder="Username" disabled={loading} {...field} />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Password"
                type="password"
                disabled={loading}
                {...field}
              />
            )}
          />
          <div className="card-actions justify-end">
            <Button type="submit" loading={loading}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
