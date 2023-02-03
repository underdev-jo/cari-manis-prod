import SectionStatic from "components/Section/static";
import PageHead from "pages/PageHead";

export default function PageSumberInformasi() {
  return (
    <>
      <PageHead title="Sumber Informasi" />
      <div className="relative min-h-[400px]">
        <div className="container !mb-[84px]">
          <SectionStatic title="Sumber Informasi">
            <div>
              Cari Manis mengumpulkan informasi dari berbagai sumber agar
              mendapatkan informasi yang sesuai dan akurat untuk sobat manis.
              Kami sangat berterima kasih kepada sumber informasi yang membantu
              kami mendapatkan data untuk Cari Manis.
            </div>
          </SectionStatic>
          <SectionStatic title="Klik Indomaret">
            <div>
              <div>
                Hampir semua data produk minuman yang diambil bersumber dari
                klik indomaret sebagai salah satu gerai minimarket online
                terbesar. Data yang kami ambil merupakan data pada bulan Januari
                2023, apabila terdapat perbedaan data dengan data saat ini,
                sobat manis dapat memberikan feedback agar kami dapat
                memperbaharui data tersebut. Beberapa data yang kami gunakan
                diantaranya:
              </div>
              <div>
                <ul className="list-disc [&>li]:ml-6">
                  <li>Gambar produk</li>
                  <li>Nama produk</li>
                  <li>Harga perkiraan produk</li>
                  <li>
                    Beberapa sumber informasi produk (kandungan gula dan kalori)
                  </li>
                </ul>
              </div>
            </div>
          </SectionStatic>
          <SectionStatic title="Fatsecret">
            Fatsecret sebagai aplikasi penghitung kalori gratis menjadi sumber
            pelengkap informasi kami untuk mencari kandungan kalori dan gula
            pada minuman yang ada. Aplikasi ini sangat membantu kami untuk
            mendapatkan informasi tersebut, sehingga melengkapi data yang tidak
            tersedia pada web Klik Indomaret.
          </SectionStatic>
        </div>
      </div>
    </>
  );
}
