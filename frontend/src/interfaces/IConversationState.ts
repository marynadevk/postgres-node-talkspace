import { IConversation } from './IConversation';
import { IMessage } from './IMessage';

export interface IConversationState {
	selectedConversation: IConversation | null;
	messages: IMessage[];
	setSelectedConversation: (conversation: IConversation | null) => void;
	setMessages: (messages: IMessage[]) => void;
}