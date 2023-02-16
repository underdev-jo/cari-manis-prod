export default function ContentLoading() {
  return (
    <div className="bg-carman-blue-0 h-60 flex items-center justify-center rounded-3xl">
      <div className="text-4xl font-bold text-white flex items-center gap-2">
        <div className="animate-bounce !duration-200">.</div>
        <div className="animate-ping">.</div>
        <div className="animate-bounce">.</div>
        <div className="animate-ping">.</div>
        <div className="animate-bounce !duration-200">.</div>
      </div>
    </div>
  );
}
