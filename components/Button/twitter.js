import Link from "next/link";
import TwitterLogo from "public/icons/twitter-logo";

export const TwitterButton = ({ username }) => {
  return (
    <div className="text-small text-white font-medium inline-block">
      <Link href={`https://twitter.com/${username}`} passHref>
        <a
          target="_blank"
          className="mt-2 py-1 px-2 rounded-xl bg-primary inline-block"
        >
          <div className="flex items-center text-left [&>svg]:w-4 [&>svg]:h-4">
            <TwitterLogo />
            <span className="ml-2">{username}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};
