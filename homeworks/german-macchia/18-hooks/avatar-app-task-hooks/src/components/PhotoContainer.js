import React, { useState, useEffect } from "react";
import fetchPhotos from "../fetchPhotos";

export const PhotoContainer = React.memo(({ url, name, id }) => {
  const [photo, setPhoto] = useState({ url: url, name: name, id: id });
  const [error, setError] = useState({ error: false, errorMessage: "" });

  // reload new data for this single container
  const reload = async () => {
    const cant = 1;
    const response = await fetchPhotos(cant);
    if (response.status !== 200) {
      setError(() => ({
        error: true,
        errorMessage: `STATUS ${response.status}, ${response.statusText}`,
      }));
    } else {
      const [photo] = await response.json();
      setPhoto(() => ({
        id: photo.first_name + photo.id,
        url: photo.url,
        name: `${photo.first_name} ${photo.last_name}`,
      }));
    }
  };

  //throw new Error if occurs
  useEffect(() => {
    if (error.error) {
      throw new Error(error.errorMessage);
    }
  }, [error]);

  return (
    <div className="container" onClick={() => reload()} key={photo.id}>
      <img
        className="container__profile_image"
        src={photo.url}
        alt={photo.name}
      />
      <div className="container__image_box" />
    </div>
  );
});
