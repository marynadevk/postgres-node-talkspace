import { LogOut } from "lucide-react";

export const LogoutButton = () => {
	const logout = () => {
		alert("You are logged out");
	};

	return (
		<div className='mt-auto'>
			<LogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
		</div>
	);
};
