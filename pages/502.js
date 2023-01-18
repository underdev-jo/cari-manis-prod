import Button from "components/Button";
import ErrorLayout from "layouts/Error";
import PageHead from "./PageHead";

export default function Err505() {
  return (
    <div>
      <PageHead title="Server aren't active" />
      <ErrorLayout title="Oops sorry!" imagePath="/faces/sad-face.svg">
        <div>
          Server kami dalam kondisi tidak bisa diakses saat ini. Hubungi kami
          bila perlu
        </div>
        <div className="mt-4 mb-2 flex justify-items">
          <Button>Contact us</Button>
        </div>
      </ErrorLayout>
    </div>
  );
}
