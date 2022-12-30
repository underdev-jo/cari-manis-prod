export default function AddToCalculator({ cookies }) {
  // const data = cookies && JSON.parse(cookies);
  const { calculated } = cookies;
  console.log({ cookies });
  const data = calculated ? JSON.parse(calculated) : [];
  const counter = data.length;

  return (
    <div className="fixed left-0 right-0 bottom-0 py-4">
      <div className="bg-primary w-full flex items-center justify-between mx-auto max-w-xs  rounded-[40px] overflow-hidden">
        <button className="btn btn-ghost block rounded-none">
          <span className="badge badge-md badge-primary text-white">
            {counter}
          </span>
        </button>
        <button className="btn btn-primary flex-1 block rounded-none bg-carman-black-1 normal-case">
          Tambah ke Kalkulator
        </button>
      </div>
    </div>
  );
}
