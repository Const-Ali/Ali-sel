function Spinner() {
  return (
    <div className="flex items-center justify-center align-middle h-[100vh]">
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="w-4 h-4 rounded-full bg-zinc-900 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-zinc-900  animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-zinc-900  animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}

export default Spinner;
