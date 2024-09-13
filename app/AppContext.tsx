import { createContext } from "react";

export interface AppContextType {
	amount: number;
	setAmount: React.Dispatch<React.SetStateAction<number>>;
	cardNumber?: string;
	setCardNumber: React.Dispatch<React.SetStateAction<string | undefined>>;
	expiry?: string;
	setExpiry: React.Dispatch<React.SetStateAction<string | undefined>>;
	cvv?: string;
	setCvv: React.Dispatch<React.SetStateAction<string | undefined>>;
	name?: string;
	setName: React.Dispatch<React.SetStateAction<string | undefined>>;
	zip?: string;
	setZip: React.Dispatch<React.SetStateAction<string | undefined>>;
	editing: boolean;
	setEditing: React.Dispatch<React.SetStateAction<boolean>>;
	error: {};
	setError: React.Dispatch<React.SetStateAction<{}>>;
}

const defaultContextValue: AppContextType = {
	amount: 600.0,
	setAmount: () => {},
	cardNumber: undefined,
	setCardNumber: () => {},
	expiry: undefined,
	setExpiry: () => {},
	cvv: undefined,
	setCvv: () => {},
	name: undefined,
	setName: () => {},
	zip: undefined,
	setZip: () => {},
	editing: false,
	setEditing: () => {},
	error: {},
	setError: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export default AppContext;
