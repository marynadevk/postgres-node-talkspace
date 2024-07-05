import { DUMMY_CONVERSATIONS } from '../../dummy_data/dummy';
import { Conversation } from './Conversation';

export const ConversationsList = () => {
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{DUMMY_CONVERSATIONS.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} />
			))}
		</div>
	);
};
