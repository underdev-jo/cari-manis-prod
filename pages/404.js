import Link from "next/link";
import Button from "components/Button";
import ErrorLayout from "layouts/Error";
import PageHead from "./PageHead";
import { useRouter } from "next/router";

export default function Err505() {
  const { replace } = useRouter();
  const toHome = () => replace("/");
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
        <div className="mt-4 mb-2 flex justify-center">
          <Button onClick={toHome}>Kembali ke Home</Button>
        </div>
      </ErrorLayout>
    </div>
  );
}
