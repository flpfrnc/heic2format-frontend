export default function Header() {
  return (
    <nav className="w-full flex">
      <ul className="w-full flex justify-between items-center px-12 sm:px-12 md:px-32 xl:px-48 h-[8rem]">
        <li className="rounded-xl overflow-hidden shadow-lg w-[50px] sm:w-[50px] md:w-[100px] hover:scale-110">
          <img src="/logo-md.png" alt="logo" width={100} />
        </li>
        <li>
          <button
            disabled
            title="coming soon"
            className="text-white text-lg italic bg-[#4267E3] hover:bg-[#4267E366] active:bg-[#2545ae] disabled:bg-gray-400 shadow-lg py-2 px-6 rounded-lg"
          >
            Visit my site
          </button>
        </li>
      </ul>
    </nav>
  );
}
