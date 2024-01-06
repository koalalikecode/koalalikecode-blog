import { hashToBgColor, hashToTextColor } from "../utils/tag-color";
import Tag from "./tag";

export default function SideBar({ tags }) {
  return (
    <div className="sticky top-20 lg:static">
      <div className="flex flex-wrap -mx-2 mb-6">
        <div className="px-2 grow-[9999] basis-64 mt-3">
          <div className="group relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="w-6 h-full absolute inset-y-0 left-3 text-slate-400 pointer-events-none group-focus-within:text-blue-550 dark:group-focus-within:text-slate-400"
            >
              <path d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z"></path>
              <path d="m6 7 6 5 6-5"></path>
            </svg>
            <input
              name="email_address"
              type="email"
              required=""
              autoComplete="email"
              aria-label="Email address"
              className="appearance-none shadow rounded-md ring-1 ring-slate-900/5 leading-5 sm:text-sm border border-transparent py-2 placeholder:text-slate-400 pl-12 pr-3 block w-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-550 bg-white dark:bg-slate-700/20 dark:ring-slate-200/20 dark:focus:ring-blue-550 dark:text-white duration-300"
              placeholder="Subscribe via email"
            />
          </div>
        </div>
        <div className="px-2 grow flex mt-3">
          <button
            type="submit"
            className="bg-blue-550 flex-auto shadow text-white rounded-md text-sm border-y border-transparent py-2 font-semibold px-3 hover:bg-blue-600 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 dark:focus:ring-offset-slate-900 dark:focus:ring-blue-700 duration-300"
          >
            Subscribe
          </button>
        </div>
      </div>
      <h2 className="text-xl font-mon font-semibold opacity-80 mb-5">Tags</h2>
      <div className="flex flex-wrap mb-8 gap-2">
        {tags.map((tag) => (
          <Tag tag={tag} link={`/tags/${tag}`} key={tag} />
        ))}
      </div>
    </div>
  );
}
