export const fetcher = async <T>(query: string, variables: any): Promise<T> => {
  const apiUrl = process.env.NEXT_PUBLIC_HYGRAPH_API_URL as string;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  
  return data.data as T;
};