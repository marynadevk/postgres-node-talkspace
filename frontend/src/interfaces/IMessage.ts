export interface IMessage {
	id: string;
	body: string;
	senderId: string;
	createdAt: string;
	shouldShake?: boolean;
}