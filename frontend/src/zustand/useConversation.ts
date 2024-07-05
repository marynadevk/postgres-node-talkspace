import { create } from 'zustand';
import { IConversationState } from '../interfaces/IConversationState';


export const useConversation = create<IConversationState>((set) => ({
	selectedConversation: null,
	setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
	messages: [],
	setMessages: (messages) => set({ messages: messages }),
}));
