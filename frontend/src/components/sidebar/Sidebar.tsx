import { ConversationsList } from './ConversationsList';
import { LogoutButton } from './LogoutButton';
import { SearchInput } from './SearchInput';

export const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2'>
			<SearchInput />
			<div className='divider px-3' />
			<ConversationsList />
			<LogoutButton />
		</div>
	);
};
