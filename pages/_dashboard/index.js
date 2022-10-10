import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import LinkWrapper from "../../components/LinkWrapper/LinkWrapper";
import FormDrink from "./FormDrink";

export default function Dashboard() {
  return (
    <div className="bg-primary-content min-h-screen">
      <Header />
      <div className="w-full max-w-xs mx-auto py-4 md:px-4 bg-primary-content">
        <FormDrink />
      </div>
    </div>
  );
}
