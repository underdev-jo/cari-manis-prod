import Button from "components/Button/Button";
import Footer from "components/footer";
import ErrorLayout from "layouts/Error";
import PageHead from "./PageHead";

export default function Err505() {
  return (
    <div>
      <PageHead title="Server aren't active" />
      <ErrorLayout
        title="Sepertinya kamu tersesat..."
        imagePath="/faces/flat-face.svg"
      >
        <div>
          Halaman yang kamu cari tidak ada, sepertinya kamu salah mengakses
          link. Mau cari apa? Cari Manis aja gimana?
        </div>
        <div className="mt-4 mb-2">
          <Button model="plain">Kembali ke Home</Button>
        </div>
      </ErrorLayout>
      <Footer />
    </div>
  );
}
