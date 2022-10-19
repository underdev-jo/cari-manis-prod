import Image from "next/image";
import { useEffect, useState } from "react";
import Section from "../../components/Sections/Section";

const messageList = [
  "Diabetes melitus terjadi saat kadar gula di dalam darah terlalu tinggi. Ini terjadi saat jumlah hormon insulin dalam tubuh tidak cukup untuk mengubah glukosa menjadi energi.",
  "Setiap orang maksimal mendapatkan asupan gula sebanyak 4sdm atau 50gram per hari  - Permenkes No. 30, 2013",
];

export default function SweetInfo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timing;
    let el = document.getElementById("elKProgress");

    el.classList.add("animating");
    timing = setTimeout(() => {
      setIndex((index + 1) % messageList.length);
      el.classList.remove("animating");
    }, 3000);

    return () => clearTimeout(timing);
  }, [index]);

  return (
    <Section>
      <div className="rounded-xl overflow-hidden text-white bg-secondary relative pt-4">
        <div className="kprogress" id="elKProgress" />
        <div className="p-4 flex items-center justify-between">
          <div className="w-[90%] max-w-[267px]">
            <div className="cm-heading h4 mb-2">Tahukah kamu?</div>
            <div className="text-small">{messageList[index]}</div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Information"
              src="/information.svg"
              width={63}
              height={77}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
