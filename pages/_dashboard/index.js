import FormDrink from "./FormDrink";

export default function Dashboard() {
  return (
    <div className="p-4 max-w-lg my-8 mx-auto border-2 rounded-lg">
      <h2 className="text-xl font-semibold">Dashboard Cari Manis</h2>

      <div className="my-8">
        <FormDrink />
      </div>
    </div>
  );
}
