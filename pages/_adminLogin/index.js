import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { setCookie, supaKey, supaUrl } from "../../helpers/util";
import Alert from "../../components/Alert/Alert";
import PageHead from "../PageHead";

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const [resErr, setResErr] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: { username: "", password: "" },
  });

  const supabase = createClient(supaUrl(), supaKey());

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    setResErr(false);
    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("username", values.username)
      .eq("password", values.password);
    if (data && data.length > 0 && typeof data === "object") {
      setCookie("onlymin", JSON.stringify(data[0]));
      window.location.reload();
    } else if (data.length < 1 || error) {
      setLoading(false);
      setResErr(error || "Invalid!");
    }
  });

  return (
    <>
      <PageHead title="Onlymin - cari manis" />
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
            {resErr && <Alert type="error" message={resErr} />}
            <div className="card-actions justify-end">
              <Button type="submit" loading={loading}>
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
