import { Controller } from "react-hook-form";
import Input from "../../components/Input/Input";

export default function FormInputDrink({ control, errors }) {
  const reqErr = (name = "Field") => `${name} wajib diisi`;

  const genError = (error, name) => {
    let message = "";
    if (error.type === "required") message = reqErr(name);
    else if (error.type === "min") message = `${name} kurang dari minimum`;
    return message;
  };

  return (
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
              error={errors.kalori && genError(errors.kalori, "Jumlah kalori")}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}
