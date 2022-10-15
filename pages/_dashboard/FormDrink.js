import { useForm, Controller } from "react-hook-form";
import Input from "../../components/Input/Input";
import { removeCookie } from "../../helpers/util";

export default function FormDrink() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      netto: 0,
      takaranSaji: 0,
      jumlahSajian: 1,
      gula: 0,
      totalGula: 0,
      image: "",
      packaging: "",
      harga: 0,
      kalori: 0,
      source: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
  });

  const logout = () => {
    removeCookie("onlymin");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="my-8">
      <div>
        <h2 className="cm-heading h4">Tulis data minuman</h2>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Nama Minuman"
                  label="Nama Minuman"
                  {...field}
                />
              )}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="netto"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Jumlah berat bersih"
                  label="Netto (ml)"
                  {...field}
                />
              )}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>

          <button className="btn btn-error" type="button" onClick={logout}>
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
