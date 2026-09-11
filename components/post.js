import Image from "next/image";
import Link from "next/link";
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
    <article className="group flex items-start mb-8 sm:flex-col gap-4 rounded-xl transition-shadow duration-200">
      <Link
        href={link}
        className="w-[35%] flex-shrink-0 sm:w-full rounded-xl overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface flex items-center justify-center">
          <Image
            src={image}
            width={800}
            height={600}
            quality={85}
            unoptimized={true}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col sm:w-full min-w-0">
        <Link
          href={link}
          className="font-bold text-xl font-mon sm:mt-1 inline-block group-hover:text-blue-550 transition-colors duration-200 line-clamp-2"
        >
          {title}
        </Link>
        <p className="mt-1.5 mb-3 opacity-70 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="flex items-center gap-1 bg-surface rounded-full px-3 py-1 text-xs text-muted border border-border">
            <BiTimeFive />
            {time}
          </span>
          <span className="flex items-center gap-1 bg-surface rounded-full px-3 py-1 text-xs text-muted border border-border">
            <VscSymbolKeyword />
            {read_duration}
          </span>
        </div>
        <div className="flex gap-2 flex-wrap pt-2.5 border-t border-border">
          {tags.map((tag) => (
            <Tag tag={tag} link={`/tags/${tag}`} key={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
