import Image from "next/image";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Section from "../../components/Sections/Section";
import style from "./SweetInfo.module.scss";

SwiperCore.use([Autoplay, Pagination]);

const messageList = [
  "Diabetes melitus terjadi saat kadar gula di dalam darah terlalu tinggi. Ini terjadi saat jumlah hormon insulin dalam tubuh tidak cukup untuk mengubah glukosa menjadi energi.",
  <>
    Maksimal asupan gula per orang sebanyak 4sdm atau 50gram per hari.
    <br />- Permenkes No. 30, 2013.
  </>,
  "Kadar gula dalam minuman perlu dihitung dari takaran dan jumlah sajian",
];

export default function SweetInfo() {
  const bulletClass = style.sweetInfoBullet;
  return (
    <Section>
      <div
        className="rounded-xl overflow-hidden text-white bg-secondary relative max-h-full"
        style={{ transition: "0.35s ease-in-out" }}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="w-[90%] max-w-[267px]">
            <div className="text-heading4 mb-2">Tahukah kamu?</div>
            <Swiper
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              pagination={{ el: `.${bulletClass}`, clickable: true }}
            >
              {messageList.map((message, index) => (
                <SwiperSlide key={index}>
                  <div className="text-small">{message}</div>
                </SwiperSlide>
              ))}
              <div className={bulletClass} />
            </Swiper>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Information"
              src="/icons/information.svg"
              width={63}
              height={77}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
