import { useForm } from "react-hook-form";
import { removeCookie } from "../../helpers/util";
import FormImage from "./FormImage";
import FormInputDrink from "./FormInputDrink";

export default function FormDrink() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
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
    // alert(JSON.stringify(values));
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
        <h2 className="cm-heading h4">TAMBAH DATA MINUMAN</h2>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <FormImage />
          <FormInputDrink control={control} errors={errors} />
          <div className="btn-group mt-10">
            <button className="btn btn-error" type="button" onClick={logout}>
              Logout
            </button>
            <button className="btn btn-wide btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
