import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface SingleNavLink {
    href: string;
    name: string;
}

interface NavLinks {
    links: Array<SingleNavLink>;
}

export default function Navbar({links}: NavLinks) {
    const [expanded,setExpanded] = useState(false);
    const router = useRouter();

    const linkDesktopClass = (href: string) => (
      (router.asPath === href) ?
      "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" :
      "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    );

    const linkMobileClass = (href: string) => (
      (router.asPath === href) ?
      "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" :
      "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
    );

    return <nav className="bg-gray-800 fixed top-0 w-full">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button type="button" onClick={() => {setExpanded(!expanded)}} className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img className="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            <img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {/*<a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Meals</a>*/}
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkDesktopClass(link.href)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className={`sm:hidden${expanded ? '' : ' hidden'}`} id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {links.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                className={linkMobileClass(link.href)}
                onClick={() => {setExpanded(!expanded)}}
                /*className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"*/
                /*aria-current="page"*/
            >
                {link.name}
            </Link>
        ))}
      </div>
    </div>
  </nav>;
}