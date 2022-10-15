import PageHead from "../PageHead";
import FormDrink from "./FormDrink";

export default function Dashboard() {
  return (
    <div className="bg-primary-content min-h-screen">
      <PageHead title="Dashboard - cari manis" />
      <div className="w-full max-w-md mx-auto px-6 py-4 md:px-4 bg-primary-content">
        <FormDrink />
      </div>
    </div>
  );
}
