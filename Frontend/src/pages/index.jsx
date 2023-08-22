import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Topbar from "@/components/Topbar";
import Group from "@/components/Group";
import styles from "../styles/font.module.scss";
import { getServerCookie } from "../utils/cookie";
import MultiFilter from "@/components/MultiFilter";

const apiUrl = process.env.API_URL;

export default function Home({ token, userId }) {
  const [allGroups, setAllGroups] = useState([]);
  const [filterGroups, setFilterGroups] = useState([]);
  const router = useRouter();
  const path = router.pathname;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeLocations, setActiveLocations] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  const playHoverSound = () => {
    const audio = new Audio("hedgehogSound.mp3");
    audio.play();
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const [cursor, setCursor] = useState("");
  const getGroups = async () => {
    await axios
      .get(`${apiUrl}/group/search`, config)
      .then((res) => {
        console.log(res);
        setAllGroups(res.data.groups);
        setCursor(res.data.next_cursor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGroups();
  }, []);

  const getGroupsByCursor = async () => {
    await axios
      .get(`${apiUrl}/group/search?cursor=${cursor}`, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (cursor) {
      getGroupsByCursor();
    }
  }, [cursor]);

  return (
    <>
      <Head>
        <title>DaoDin</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Topbar token={token} />
      <main
        className={`${styles.content} min-h-screen pt-8 bg-backgroundColor`}
      >
        <div className="w-[90%] max-w-5xl m-auto">
          <div className="h-[100px] bg-secondaryColor rounded-[20px] mb-6 flex items-center justify-center ">
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHoverSound}
              className="hover:animate-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHoverSound}
              className="hover:animate-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHoverSound}
              className="hover:animate-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHoverSound}
              className="hover:animate-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHoverSound}
              className="hover:animate-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHoverSound}
              className="hover:animate-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHoverSound}
              className="hover:animate-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHoverSound}
              className="hover:animate-ping"
            />
          </div>
          <div className="mb-6 flex gap-5">
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="w-32 bg-primaryColor text-[26px] font-bold text-white rounded-[50px]"
            >
              Filter
            </button>
            <button
              type="button"
              className="w-32 px-6 py-1 bg-primaryColor text-[26px] font-bold text-white rounded-[50px]"
            >
              Sortby
            </button>
          </div>
          {isFilterOpen && (
            <MultiFilter
              token={token}
              setIsFilterOpen={setIsFilterOpen}
              setFilterGroups={setFilterGroups}
              activeLocations={activeLocations}
              setActiveLocations={setActiveLocations}
              activeCategories={activeCategories}
              setActiveCategories={setActiveCategories}
            />
          )}

          {filterGroups.length === 0 ? (
            <div className=" px-12 pt-2 pb-8 bg-white rounded-[20px]">
              {allGroups?.map((group) => (
                <Group
                  path={path}
                  key={group.group_id}
                  groupId={group.group_id}
                  creatorId={group.creator_id}
                  userId={userId}
                  name={group.name}
                  category={group.category}
                  location={group.location}
                  description={group.description}
                  status={group.status}
                  picture={group.picture}
                  area={group.area}
                />
              ))}
            </div>
          ) : (
            <div className=" px-12 pt-2 pb-8 bg-white rounded-[20px]">
              {filterGroups.map((group) => (
                <Group
                  path={path}
                  key={group.group_id}
                  groupId={group.group_id}
                  creatorId={group.creator_id}
                  userId={userId}
                  name={group.name}
                  category={group.category}
                  location={group.location}
                  description={group.description}
                  status={group.status}
                  picture={group.picture}
                  area={group.area}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = getServerCookie("userInfo", "token", context.req);
  const userId = getServerCookie("userInfo", "user_id", context.req);
  const name = getServerCookie("userInfo", "name", context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token, userId, name },
  };
}
