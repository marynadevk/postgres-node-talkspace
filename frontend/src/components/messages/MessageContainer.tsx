import { MessageCircle } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { useConversation } from '../../zustand/useConversation';
import { MessageInput } from './MessageInput';
import { Messages } from './MessagesList.tsx';

export const MessageContainer = () => {
  const { selectedConversation } = useConversation();
	return (
		<div className='w-full flex flex-col'>
			{selectedConversation ? (
        <>
				<div className='bg-stone-900 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-base-200 font-bold'>{selectedConversation.fullName}</span>
				</div>

				<Messages />
				<MessageInput />
			</>
      ) : (
        <NoChatSelected />
      )}
		</div>
	);
};


const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser?.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<MessageCircle className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};