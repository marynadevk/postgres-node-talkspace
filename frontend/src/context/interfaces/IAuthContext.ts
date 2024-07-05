import { Dispatch, SetStateAction } from "react";
import { IAuthUser } from "./IAuthUser";

export interface IAuthContext {
  authUser: IAuthUser | null;
	setAuthUser: Dispatch<SetStateAction<IAuthUser | null>>;
	isLoading: boolean;
}
