export const fetcher = async (query: string, variables: any) => {
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
  
  return data;
};