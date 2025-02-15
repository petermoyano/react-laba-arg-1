import Head from 'next/head';
import styles from '../src/styles/styles.module.css';
import RefreshButton from '../src/components/RefreshButton/RefreshButton';
import AvatarTile from '../src/components/AvatarTile/AvatarTile';
import AddButton from '../src/components/AddButton/AddButton';
import { useState } from 'react';

const URL = `https://tinyfac.es/api/data?limit=1&quality=0`;

export const getStaticProps = async () => {
  const res = await fetch('https://tinyfac.es/api/data?limit=5&quality=0');
  let data = await res.json();
  data = data.map((avatar) => avatar.url);
  return {
    props: { initialAvatars: data },
    revalidate: 60,
  };
};

export default function Home({ initialAvatars }) {
  const [avatars, setAvatars] = useState(initialAvatars);
  const [isRefreshing, setIsRefreshing] = useState(Array(initialAvatars.length).fill(false));

  async function getImage() {
    return fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('image could not be fecthed');
        }
      })
      .then((data) => {
        return data[0].url;
      })
      .catch((e) => {
        return '/error.jpg';
      });
  }

  async function addAvatar() {
    let newAvatars = [...avatars];
    let newAvatar = await getImage();
    newAvatars.push(newAvatar);
    setAvatars(newAvatars);
    setIsRefreshing([...isRefreshing, false]);
  }

  async function refreshAvatar(index) {
    let refreshingState = [...isRefreshing];
    refreshingState[index] = true;
    setIsRefreshing(refreshingState);
    let modifiedAvatars = [...avatars];
    let modifiedAvatar = await getImage();
    modifiedAvatars[index] = modifiedAvatar;
    refreshingState[index] = false;
    setIsRefreshing(refreshingState);
    setAvatars(modifiedAvatars);
  }

  async function refreshAll() {
    let onLoadAvatar = [...isRefreshing];
    onLoadAvatar.fill(true);
    setIsRefreshing(onLoadAvatar);

    let newAvatarImages = await Promise.all(
      avatars.map((avatarImage, index) => {
        return getImage();
      }),
    );

    onLoadAvatar.fill(false);
    setIsRefreshing(onLoadAvatar);
    setAvatars(newAvatarImages);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title> 21-csr-ssr-ssg-nextjs </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.App}>
        <div className={styles.avatarContainer}>
          {avatars.map((avatar, index) => {
            return (
              <AvatarTile
                key={index}
                avatarURL={avatar}
                isRefreshing={isRefreshing[index]}
                onClick={() => {
                  refreshAvatar(index);
                }}
              />
            );
          })}
          <AddButton onClick={addAvatar} />
        </div>

        <RefreshButton onClick={refreshAll} />
      </main>
    </div>
  );
}
