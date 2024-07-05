import { useState } from 'react';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';
import { useGetConversations } from '../../hooks/useGetConversations';
import { useConversation } from '../../zustand/useConversation';
import { IConversation } from '../../interfaces/IConversation';

export const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 2) {
      return toast.error('Search term must be at least 2 characters long');
    }

    const conversation = conversations.find((c: IConversation) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else toast.error('No such user found!');
  };
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Search…'
        className='input-sm md:input input-bordered rounded-full sm:rounded-full w-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type='submit'
        className='btn md:btn-md btn-sm btn-circle bg-green-500 text-white hover:bg-stone-900 '
      >
        <Search className='w-4 h-4 md:w-6 md:h-6 outline-none' />
      </button>
    </form>
  );
};
