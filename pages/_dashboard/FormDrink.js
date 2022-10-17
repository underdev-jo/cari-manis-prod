import { useForm, Controller } from "react-hook-form";
import Input from "../../components/Input/Input";
import { removeCookie } from "../../helpers/util";
import FormImage from "./FormImage";
// import FormInputDrink from "./FormInputDrink";

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

  const reqErr = (name = "Field") => `${name} wajib diisi`;

  const genError = (error, name) => {
    let message = "";
    if (error.type === "required") message = reqErr(name);
    else if (error.type === "min") message = `${name} kurang dari minimum`;
    return message;
  };

  return (
    <div className="my-8">
      <div>
        <h2 className="cm-heading h4">TAMBAH DATA MINUMAN</h2>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <FormImage />
          <div>
            <div className="mb-4">
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    label="Nama Minuman"
                    error={errors.name && genError(errors.name, "Nama minuman")}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="netto"
                control={control}
                rules={{ required: true, min: 1 }}
                render={({ field }) => (
                  <Input
                    label="Netto"
                    after="ml"
                    type="number"
                    error={errors.netto && genError(errors.netto, "Netto")}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="gula"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    label="Kadar gula"
                    type="number"
                    after="mg"
                    error={errors.gula && genError(errors.gula, "Kadar gula")}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex mb-4">
              <div className="mr-3">
                <Controller
                  name="takaranSaji"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <Input
                      label="Takaran Saji"
                      type="number"
                      after="ml"
                      error={
                        errors.takaranSaji &&
                        genError(errors.takaranSaji, "Takaran saji")
                      }
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="ml-3">
                <Controller
                  name="jumlahSajian"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <Input
                      label="Jumlah Sajian"
                      type="number"
                      after="ml"
                      error={
                        errors.jumlahSajian &&
                        genError(errors.jumlahSajian, "Jumlah sajian")
                      }
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="mb-4">
              <Controller
                name="kalori"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    label="Jumlah Kalori"
                    type="number"
                    after="kKal"
                    error={
                      errors.kalori && genError(errors.kalori, "Jumlah kalori")
                    }
                    {...field}
                  />
                )}
              />
            </div>
          </div>
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
