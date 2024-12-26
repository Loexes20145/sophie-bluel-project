export const fetchJSON = async (url, options = {}) => {
  const headers = {'Conten-type': 'application/json', ...options}
  const response = await fetch (url, {...options, headers})
  if (response.ok) {
    return response.json()
  }
  throw new Error ('Erreur servuer: ', {cause: response})
}