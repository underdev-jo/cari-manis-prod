import { TwitterButton } from "components/Button/twitter";
import SectionStatic from "components/Section/static";
import PageHead from "pages/PageHead";

export default function TentangPembuat() {
  return (
    <>
      <PageHead title="Tentang Pembuat" />
      <div className="relative min-h-[400px]">
        <div className="container !mb-[84px]">
          <SectionStatic title="Tentang Pembuat">
            <div className="[&>p]:mb-[1rem]">
              <p>
                Cari Manis dibuat dengan tujuan untuk mencari informasi
                kandungan manis pada minuman yang biasa kita konsumsi
                sehari-hari. Kami ingin meningkatkan kesadaran akan bahaya
                konsumsi manis yang berlebihan dengan menyediakan informasi
                kandungan pada minuman berupa kadar gula dan kalori.
              </p>
              <p>
                Sobat manis (pengguna cari manis) juga dapat mengetahui batasan
                minuman yang ingin dikonsumsi dengan menghitungnya pada
                kalkulator manis. Dengan begitu sobat manis dapat tetap
                mengkonsumsi minuman manis tanpa khawatir berlebih dan
                menyebabkan berbagai penyakit.
              </p>
              <p>
                Tim cari manis terdiri dari 2 pembuat yang bekerja dibidang
                teknologi, diantaranya:
              </p>
            </div>
          </SectionStatic>
          <SectionStatic
            title={
              <div className="flex items-center gap-2">
                Jojo <TwitterButton username="tanganjojo" />
              </div>
            }
          >
            <div className="[&>p]:mb-[1rem]">
              <p>
                Jojo adalah nama panggilan, lahir dan tinggal di Bekasi. Saat
                ini bekerja sebagai Frontend Developer di sebuah Digital Agency
                daerah Jakarta.
              </p>
              <p>
                Jojo sudah bekerja selama 3 tahun+ sebagai Frontend Developer,
                membuat web application menggunakan ReactJS dan tools Javascript
                lainnya. Jojo juga pernah bekerja di bidang elektro dan familiar
                terhadap Arduino, XBee, WeMos dan microcontroller lainnya.
              </p>
            </div>
          </SectionStatic>
          <SectionStatic
            title={
              <div>
                Karom <TwitterButton username="mukharomf" />
              </div>
            }
          >
            <p>
              Karom - Fajar Mukharom, lahir dan tinggal di Bekasi. Saat ini
              bekerja sebagai Product Manager di sebuah perusahaan Email Service
              provider daerah Bekasi.
            </p>
            <p>
              Karom sudah bekerja 1 tahun sebagai PM, sebelumnya bekerja sebagai
              IT Helpdesk Support dan Sales Marketing. Hingga kemudian
              memutuskan untuk belajar UI/UX Design secara otodidak dan akhirnya
              switch career menjadi Digital Product Manager.
            </p>
          </SectionStatic>
        </div>
      </div>
    </>
  );
}
