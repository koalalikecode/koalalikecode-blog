import Image from "next/image";
import { BiTimeFive } from "react-icons/bi";
import { VscSymbolKeyword } from "react-icons/vsc";
import Tag from "./tag";

export default function Post({
  image,
  title,
  description,
  time,
  read_duration,
  tags,
  link,
}) {
  return (
    <div className="flex items-center mb-7 sm:flex-col gap-2">
      <a href={link} className="w-[35%] rounded-xl sm:w-full">
        <Image
          src={image}
          style={{
            width: "100%",
            height: "auto",
          }}
          width={800}
          height={600}
          quality={100}
          unoptimized={true}
          alt="name"
          className="rounded-xl ease-in duration-200 hover:opacity-70"
        />
      </a>
      <div className="w-[65%] sm:w-full">
        <a
          href={link}
          className="font-bold text-xl font-mon sm:mt-3 inline-block"
        >
          {title}
        </a>
        <p className="mt-1 mb-2 opacity-80 text-ellipsis overflow-y-hidden max-h-12">
          {description}
        </p>
        <div className="flex mb-2">
          <span className="flex items-center mr-4 opacity-80">
            <BiTimeFive className="mr-1" />
            {time}
          </span>
          <span className="flex items-center opacity-80">
            <VscSymbolKeyword className="mr-1" />
            {read_duration}
          </span>
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Tag tag={tag} link={`/tags/${tag}`} key={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
