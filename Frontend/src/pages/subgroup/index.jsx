import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/font.module.scss";
import Topbar from "@/components/Topbar";
import Member from "@/components/Member";
import Message from "@/components/Message";
import groupMockdata from "@/data/groupMockdata";
import chatMockdata from "@/data/chatMockdata";
import { getServerCookie } from "@/utils/cookie";

export default function Subgroup({ token }) {
  const sortedChat = chatMockdata.chats
    .slice()
    .sort((a, b) => a.chat_id - b.chat_id);

  return (
    <>
      <Head>
        <title>Group Page</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Topbar token={token} />
      <div className="min-h-screen bg-backgroundColor p-8">
        <div className="flex justify-between w-[90%] max-w-5xl px-10 m-auto items-center">
          <div className={`${styles.content} text-[26px] font-bold`}>
            Group Name
          </div>
          <div className={`${styles.content} text-2xl font-normal underline`}>
            Leave
          </div>
        </div>
        <div className="flex justify-between w-[90%] max-w-5xl m-auto pt-5 items-start">
          <div className="w-1/4 rounded-[20px] text-center mr-12 shrink-0">
            <div
              className={`${styles.content} rounded-t-[20px] py-3 text-[26px] font-bold bg-secondaryColor`}
            >
              Members
            </div>
            <div className="px-10 pt-px pb-10 bg-white rounded-b-[20px]">
              {groupMockdata.users.map((user) => (
                <Member
                  key={user.user_id}
                  picture={user.picture}
                  nickname={user.nickname}
                />
              ))}
            </div>
          </div>
          <div className="w-full rounded-[20px] ">
            <div
              className={`${styles.content} rounded-t-[20px] p-3 text-[26px] font-bold text-center bg-secondaryColor`}
            >
              Chat
            </div>
            <div className="flex h-[900px] rounded-b-[20px] pb-8 bg-white relative justify-center ">
              <div className="w-[90%] h-[800px] pt-2 overflow-y-scroll">
                {sortedChat.map((chat) => (
                  <Message
                    key={chat.chat_id}
                    message={chat.message}
                    user_id={chat.user_id}
                    sent_at={chat.sent_at}
                    picture={chat.picture}
                    nickname={chat.nickname}
                  />
                ))}
              </div>
              <textarea
                className="w-[90%] h-12 rounded-[20px] bg-backgroundColor pl-6 pr-16 py-2 text-xl absolute bottom-8"
                placeholder="Leave a message"
              />
              <button type="button">
                <Image
                  src="/send-grey.svg"
                  alt="Send button"
                  className="absolute bottom-[42px] right-16"
                  width={28}
                  height={28}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
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
