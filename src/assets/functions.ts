import { Apartment } from "../types/Apartment";

export const isApartmentDuplicate = (array: Apartment[], character: Apartment) => {
	return array.some(el => el.id === character.id);
};


	export const formattedDate = (date: string) => {
		const dateTime = new Date(+date * 1000);
		const hours = dateTime.getHours().toString().padStart(2, '0');
		const minutes = dateTime.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
};
   

export const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
		isActive
			? 'bg-[#454545] rounded-[6px] text-[#fff] p-1 flex text-[#454545] items-center justify-center w-1/2 rounded-[6px] uppercase '
			: 'p-1 flex text-[#454545] items-center justify-center w-1/2 rounded-[6px] uppercase ';
