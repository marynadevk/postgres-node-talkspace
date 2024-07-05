import { DUMMY_MESSAGES } from "../../dummy_data/dummy";
import { Message } from "./Message";

export const Messages = () => {
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{DUMMY_MESSAGES.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
};
