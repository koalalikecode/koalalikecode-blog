import Image from "next/image";
import { BiTimeFive } from "react-icons/bi";
import { VscSymbolKeyword } from "react-icons/vsc";

export default function Post2({ image, title, time, read_duration, link }) {
  return (
    <div className="w-64 mr-4 flex-shrink-0">
      <a href={link} className="">
        <Image
          src={image}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={800}
          height={600}
          quality={100}
          alt="name"
          className=" ease-in duration-300"
        />
      </a>
      <div className="mt-4">
        <a href={link} className="font-bold text-lg font-mon inline-block mb-2">
          {title}
        </a>
        <div className="flex mb-2">
          <span className="flex items-center mr-3 opacity-70">
            <BiTimeFive className="mr-1" />
            {time}
          </span>
          <span className="flex items-center opacity-70">
            <VscSymbolKeyword className="mr-1" />
            {read_duration}
          </span>
        </div>
      </div>
    </div>
  );
}
