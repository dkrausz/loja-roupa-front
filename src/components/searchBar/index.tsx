import { IoSearch } from "react-icons/io5";

export function SearchBar() {
  return (
    <div className="border-solid border-2 border-neutral-500 flex items-center gap-1 rounded-2xl focus-within:border-neutral-900">
      <IoSearch className="mx-1" size={20} />
      <input type="text" className="border-none focus-visible:border-none outline-none m-1 w-72 mx-2 bg-neutral-100" placeholder="Digite sua busca" />
    </div>
  );
}
