import { useSocketContext } from '../../context/SocketContext';
import { useConversation } from '../../zustand/useConversation';

export const Conversation = ({ conversation }: { conversation: any }) => {
  const { setSelectedConversation, selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isSelected = conversation.id === selectedConversation?.id;
  const isOnline = onlineUsers.includes(conversation.id);
  
  return (
		<>
			<div
      className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-green-500' : 'bg-stone-800'}`}
      onClick={() => setSelectedConversation(conversation)}
      >
				<div className={`avatar ${isOnline && 'online'}`}>
					<div className='w-8 md:w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200 text-sm md:text-md'>{conversation.fullName}</p>
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
