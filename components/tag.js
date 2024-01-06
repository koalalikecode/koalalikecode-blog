import Link from "next/link";
import { hashToBgColor, hashToTextColor } from "../utils/tag-color";

function Tag({ tag, link }) {
  return (
    <Link href={link}>
      <a
        className={`rounded-md px-2 py-1 ${hashToTextColor(
          tag
        )} ${hashToBgColor(tag)} hover:opacity-70 ease-in duration-300`}
      >
        {tag}
      </a>
    </Link>
  );
}

export default Tag;
