import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="py-5 px-5 sm:px-10">
      <div className="screen-max-width">
        <div>
          <p className="text-gray font-semibold text-xs">
            More ways to shop:
            <span className="text-blue underline"> Find an Apple Store </span>
            or
            <span className="text-blue underline"> other retailer </span>
            near you.
          </p>
          <p className="text-gray font-semibold text-xs">
            or Call 00800-856-5212
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <p className="text-gray font-semibold text-xs">
            Copyright @ 2024 Apple Inc. All rights reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={link} className="text-gray font-semibold text-xs">
                {link}{" "}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
