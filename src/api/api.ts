import { BASE_URL } from "../assets/constants";

	
export const getSearchParams = async (searchParams: string) => {
   const params = new URLSearchParams(searchParams);

   return await fetch(BASE_URL, {
			method: 'POST',
			body: params,
		}).then(response => response.json())
}
