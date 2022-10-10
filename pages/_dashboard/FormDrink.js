import { useForm, Controller } from "react-hook-form";
import Input from "../../components/Input/Input";

export default function FormDrink() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: { name: "Hehehe" },
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
  });

  const classInput = "input input-bordered w-full";

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input placeholder="Nama Minuman" label="Nama Minuman" {...field} />
          )}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
