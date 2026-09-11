import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "./tag";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "./ui/Input";
import Button from "./ui/Button";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
} from "react-icons/ai";

export default function SideBar({ tags }) {
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(emailInput)) {
      setIsLoading(true);
      fetch(process.env.FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email_address=${emailInput}`,
      })
        .then(() => {
          toast.success("🚀 Thank You for Subscribing", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Something went wrong!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setIsLoading(false);
        });
    } else {
      toast.error("Invalid email address!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="sticky top-20 lg:static pt-4">
      {/* Profile card */}
      <div className="ui-card p-5 mb-5 text-center">
        <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-3 shadow-md ring-2 ring-blue-500/30">
          <Image
            src="/koalalikecode.png"
            width={64}
            height={64}
            alt="koalalikecode avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-bold font-mon text-sm">koalalikecode</p>
        <p className="text-xs text-muted mt-1 leading-relaxed">
          IT student at HUST · Web Dev &amp; AI enthusiast
        </p>
        <div className="flex justify-center gap-3 mt-3">
          <a
            href="https://github.com/koalalikecode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl"
            aria-label="GitHub"
          >
            <AiFillGithub className="fill-slate-400 hover:fill-slate-800 dark:hover:fill-white transition-colors duration-200" />
          </a>
          <a
            href="https://www.linkedin.com/in/duy-nguyen-97845a217/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl"
            aria-label="LinkedIn"
          >
            <AiFillLinkedin className="fill-slate-400 hover:fill-sky-600 transition-colors duration-200" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100041242865819"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl"
            aria-label="Facebook"
          >
            <AiFillFacebook className="fill-slate-400 hover:fill-blue-550 transition-colors duration-200" />
          </a>
        </div>
      </div>

      {/* Subscribe card */}
      <div className="ui-card overflow-hidden mb-5">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-violet-500" />
        <div className="p-4">
          <h3 className="font-semibold font-mon mb-3 text-sm">Stay Updated</h3>
          <form id="subscribe-form" onSubmit={handleSubmitForm}>
            <div className="group relative mb-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-5 h-full absolute inset-y-0 left-3 text-slate-400 pointer-events-none group-focus-within:text-blue-550"
              >
                <path d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z"></path>
                <path d="m6 7 6 5 6-5"></path>
              </svg>
              <Input
                name="email_address"
                type="text"
                required
                aria-label="Email address"
                className="appearance-none pl-10 pr-3 ring-1 ring-slate-900/5 leading-5 text-sm"
                placeholder="Your email address"
                onChange={(e) => setEmailInput(e.target.value)}
                value={emailInput}
              />
            </div>
            <Button type="submit" className="w-full">
              {!isLoading && "Subscribe"}
              {isLoading && (
                <div role="status" className="flex justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Tags section */}
      {tags.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-violet-500 flex-shrink-0" />
            <h2 className="text-base font-semibold font-mon">Tags</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag tag={tag} link={`/tags/${tag}`} key={tag} />
            ))}
          </div>
        </div>
      )}

      {/* Categories section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-violet-500 flex-shrink-0" />
          <h2 className="text-base font-semibold font-mon">Categories</h2>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href="/categories/code"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors text-sm group"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
              Coding Posts
            </span>
            <span className="text-muted text-xs group-hover:text-blue-550 transition-colors">
              →
            </span>
          </Link>
          <Link
            href="/categories/life"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border hover:border-violet-500/40 hover:bg-violet-50 dark:hover:bg-slate-800 transition-colors text-sm group"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
              Life Stories
            </span>
            <span className="text-muted text-xs group-hover:text-violet-500 transition-colors">
              →
            </span>
          </Link>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
