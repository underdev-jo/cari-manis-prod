import Image from "next/image";
import Section from "../../components/Sections/Section";

export default function SweetInfo() {
  return (
    <Section>
      <div className="rounded-xl p-4 flex items-center justify-between text-white bg-[#453E9E]">
        <div className="w-[90%] max-w-[267px]">
          <div className="cm-heading h4 mb-2">Tahukah kamu?</div>
          <div className="text-small">
            Diabetes melitus terjadi saat kadar gula di dalam darah terlalu
            tinggi. Ini terjadi saat jumlah hormon insulin dalam tubuh tidak
            cukup untuk mengubah glukosa menjadi energi.
          </div>
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
    </Section>
  );
}
