'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
const SearchInput = ({ onSearch }) => {
  const inputRef = useRef();
  const router = useRouter();
  const handleSearch = (event) => {
    const keyword = inputRef.current.value.trim();
    onSearch(keyword);
  };
  return (
    <div>
      <input placeholder="Filter nama pasien..." className=" mb-4 border-2 border-gray-200 active:border-gray-700 2xl:w-[440px] xl:w-[420px] p-2 px-4 rounded-xl" ref={inputRef} onKeyDown={handleSearch} />
    </div>
  );
};
export default SearchInput;
