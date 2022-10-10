import { useForm, Controller } from "react-hook-form";
import Input from "../../components/Input/Input";

export default function FormDrink() {
  const { control, register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
  });

  const classInput = "input input-bordered w-full";

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* <input
          type="text"
          placeholder="Nama Minuman"
          className={classInput}
          {...register("name")}
        /> */}
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
