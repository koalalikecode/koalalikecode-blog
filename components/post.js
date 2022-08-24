import Image from "next/image";
import { BiTimeFive, BiCommentDetail } from "react-icons/bi";
import { VscSymbolKeyword } from "react-icons/vsc"

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
    <div className="flex items-center mb-7 sm:flex-col">
      <a href={link} className="w-1/3 rounded-xl sm:w-full">
        <Image
          src={image}
          layout="responsive"
          width={144}
          height={110}
          alt="name"
          className="rounded-xl ease-in duration-300"
        />
      </a>
      <div className="ml-4 w-2/3 sm:w-full">
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
        <div>
          {tags.map((tag) => (
            <a
              key={tag}
              href="#"
              className="rounded-2xl px-3 py-1 mr-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
