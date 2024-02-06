import { BASE_URL } from "../assets/constants";

	
export const getSearchParams = async (searchParams: string) => {
   const params = new URLSearchParams(searchParams);

   const response = await fetch(BASE_URL, {
			method: 'POST',
			body: params,
   })
   
   return await response.json()
}
