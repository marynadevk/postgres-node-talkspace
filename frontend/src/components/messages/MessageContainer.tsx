import { MessageInput } from './MessageInput';
import { Messages } from './Messages';

export const MessageContainer = () => {
	return (
		<div className='w-full flex flex-col'>
			<>
				<div className='bg-stone-900 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-base-200 font-bold'>John doe</span>
				</div>

				<Messages />
				<MessageInput />
			</>
		</div>
	);
};
