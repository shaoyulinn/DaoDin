import Image from "next/image";
import Link from "next/link";
import styles from "../styles/font.module.scss";

export default function Group({
  path,
  groupId,
  name,
  category,
  location,
  description,
  status
}) {
  return (
    <div className={`${styles.content} group mt-8`}>
      {path === "/profile" ? (
        <div className="px-8 py-4 flex justify-between items-center bg-backgroundColor rounded-[20px] group-hover:rounded-b-none">
          <h3 className="px-8 text-4xl font-bold">{name}</h3>
        </div>
      ) : (
        <div>
          <div className="px-8 py-4 flex justify-between items-center bg-backgroundColor rounded-[20px] group-hover:rounded-b-none">
            <h3 className="px-8 text-4xl font-bold">{name}</h3>
            <Image
              src="/menu.svg"
              alt="menu"
              className="w-12 h-12 transition-all duration-500 group-hover:rotate-180"
              width={48}
              height={48}
            />
          </div>
          <div className="px-8 py-6 hidden group-hover:flex justify-between gap-8 bg-[#FDE0E0] rounded-b-[20px]">
            <p className="p-3 bg-[#F5B8B8] rounded-[20px]">{description}</p>
            <Link
              href={`/joinGroup/${groupId}`}
              className="w-[10%] px-6 py-2 self-end bg-primaryColor text-center text-xl font-bold text-white rounded-[50px] shrink-0"
            >
              Join
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
