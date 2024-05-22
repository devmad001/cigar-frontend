export const fetchData = async function(url, payload, token) {
  if (payload?.params) url = url + '?' + payload?.params;
  const response = await fetch(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        'Content-Encoding': 'gzip',
        'Session-Token': token
      },
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(responseData.errors || 'Loading is Failed. Please try again');
    throw error;
  }

  return responseData;  
}
