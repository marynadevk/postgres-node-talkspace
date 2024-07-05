import { Dispatch, SetStateAction } from "react";
import { IAuthUserData } from "./IAuthUserData";

export interface IAuthContext {
  authUser: IAuthUserData | null;
	setAuthUser: Dispatch<SetStateAction<IAuthUserData | null>>;
	isLoading: boolean;
}
