async function getNewImage(limit = 1) {
  const res = await fetch(`https://tinyfac.es/api/data?limit=${limit}&quality=0`);
  if (!res.ok) {
    throw new Error('Error on get images');
  }
  const data = await res.json();
  return data.map((picture) => picture.url);
}

async function updatePhotos(amount) {
  return await getNewImage(amount);
}

export { getNewImage, updatePhotos };
