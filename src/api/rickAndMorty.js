import axios from 'axios';

const client = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
});

export async function fetchCharacters({ page = 1, name = '', status = '', species = '' } = {}) {
  const { data } = await client.get('/character', {
    params: { page, name: name || undefined, status: status || undefined, species: species || undefined },
  });
  return data; // { info: {...}, results: [...] }
}

export async function fetchCharacterById(id) {
  const { data } = await client.get(`/character/${id}`);
  return data;
}

export async function fetchLocationById(url) {
  if (!url) return null;
  const { data } = await axios.get(url);
  return data;
}

export async function fetchEpisodesByUrls(urls) {
  if (!urls || urls.length === 0) return [];
  const ids = urls.map((u) => u.split('/').pop()).join(',');
  const { data } = await client.get(`/episode/${ids}`);
  return Array.isArray(data) ? data : [data];
}
