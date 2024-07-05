import { useGetConversations } from '../../hooks/useGetConversations';
import { Conversation } from './Conversation';

export const ConversationsList = () => {
  const { conversations, loading } = useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} />
			))}
      {loading && <span className='loading loading-spinner mx-auto'/>}
		</div>
	);
};
