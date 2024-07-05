import { LogOut } from 'lucide-react';
import { useLogout } from '../../hooks/useLogout';

export const LogoutButton = () => {
  const { logout } = useLogout();
  
	return (
		<div className='mt-auto'>
			<LogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
		</div>
	);
};
