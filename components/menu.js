import Link from "next/link";

function MenuLinkItem({ href, activeText, content, isActive, onNavigate }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`md:px-6 md:py-4 relative after:rounded after:absolute after:w-0 after:-bottom-5 after:h-0.5 hover:after:bg-gradient-to-r from-blue-500 to-violet-500 after:left-0 after:transition-width hover:after:w-full after:duration-300 hover:text-purple-500 md:after:h-full md:after:top-0 cursor-pointer md:hover:after:w-1 ${
        isActive == activeText
          ? "after:w-full md:after:w-1 md:after:bg-gradient-to-b after:bg-gradient-to-r from-blue-500 to-violet-500 text-purple-500 font-semibold"
          : ""
      }`}
    >
      {content}
    </Link>
  );
}

function Menu({ menu, active, onNavigate }) {
  return (
    <nav
      id="menu"
      className={`md:absolute md:top-14 flex md:flex-col md:gap-0 gap-4 md:inset-x-0 md:shadow-md md:shadow-black/10 ${
        menu ? "md:animate-fade-down" : "md:hidden"
      }`}
    >
      <MenuLinkItem
        activeText={"home"}
        content={"Home"}
        isActive={active}
        href="/"
        onNavigate={onNavigate}
      />
      <MenuLinkItem
        activeText={"code"}
        content={"Coding Posts"}
        isActive={active}
        href="/categories/code"
        onNavigate={onNavigate}
      />
      <MenuLinkItem
        activeText={"life"}
        content={"Life Stories"}
        isActive={active}
        href="/categories/life"
        onNavigate={onNavigate}
      />
      <MenuLinkItem
        activeText={"search"}
        content={"Search"}
        isActive={active}
        href="/search"
        onNavigate={onNavigate}
      />
    </nav>
  );
}

export default Menu;
