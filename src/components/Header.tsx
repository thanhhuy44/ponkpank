import Link from "next/link";

const navs: Array<{
  link: string;
  text: string;
}> = [
  {
    link: "/",
    text: "Bóng đá Việt Nam",
  },
  {
    link: "/",
    text: "Bóng đá quốc tế",
  },
  {
    link: "/",
    text: "Bảng xếp hạng",
  },
];

function Header() {
  return (
    <header className="border-b">
      <div className="container grid grid-cols-4 items-center">
        <div>
          <Link href="/" className="font-black">
            PONKPANK
          </Link>
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-center gap-x-4 py-6">
            {navs.map((nav, index) => (
              <Link key={index} href={nav.link}>
                <span className="font-semibold hover:text-primary-500 duration-300">
                  {nav.text}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </header>
  );
}

export default Header;
