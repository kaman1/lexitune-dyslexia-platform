import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-zinc-50 py-16 border-t border-zinc-200">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-medium mb-4">Products</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <Link href="#" className="hover:text-black">
                  Customer Discovery
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black flex items-center gap-2"
                >
                  Interview Practice
                  <span className="text-[10px] bg-zinc-200 px-1.5 py-0.5 rounded-full text-zinc-600">
                    Coming soon
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Leadership Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Open Source</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <Link href="#" className="hover:text-black">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Non-Profit Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Government Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <Link href="#" className="hover:text-black">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* TechFW Partnership Section */}
        <div className="mt-12 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-lg border border-zinc-200 hover-lift transition-smooth group cursor-pointer">
            <div className="flex-shrink-0">
              <img
                src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/eumxmnokxdkarurcka6g"
                alt="TechFW Logo"
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium text-zinc-800 mb-1 transition-colors duration-300 group-hover:text-zinc-900">TechFW Partnership</h3>
              <p className="text-sm text-zinc-600 mb-2 transition-colors duration-300 group-hover:text-zinc-700">Proud member of the Technology Foundry Workforce initiative</p>
              <p className="text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-600">Building tomorrow's workforce through innovative technology solutions</p>
            </div>
          </div>
        </div>

        {/* SmartStar Section - Now below TechFW */}
        <div className="mt-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-zinc-800 mb-2">SmartStar</h3>
            <p className="text-sm text-zinc-600">Pioneering intelligent business solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <span className="text-white font-bold text-xl transition-transform duration-300 group-hover:scale-110">S</span>
              </div>
              <h4 className="font-medium text-zinc-800 mb-1 transition-colors duration-300 group-hover:text-zinc-900">Innovation</h4>
              <p className="text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-600">Smart technology solutions</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <span className="text-white font-bold text-xl transition-transform duration-300 group-hover:scale-110">★</span>
              </div>
              <h4 className="font-medium text-zinc-800 mb-1 transition-colors duration-300 group-hover:text-zinc-900">Excellence</h4>
              <p className="text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-600">Quality driven approach</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <span className="text-white font-bold text-xl transition-transform duration-300 group-hover:scale-110">★</span>
              </div>
              <h4 className="font-medium text-zinc-800 mb-1 transition-colors duration-300 group-hover:text-zinc-900">Growth</h4>
              <p className="text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-600">Scaling business forward</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-zinc-500 text-center md:text-left max-w-xl">
            <p className="mb-1">
              © {new Date().getFullYear()} Tekimax, Inc. All rights reserved.
            </p>
            <p>
              All trademarks, logos and brand names are the property of their
              respective owners.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/legal/privacy-policy" className="hover:text-black transition-colors duration-300 hover:scale-105 transform">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-of-service" className="hover:text-black transition-colors duration-300 hover:scale-105 transform">
              Terms of Service
            </Link>
            <Link href="/clear-storage" className="hover:text-black transition-colors duration-300 hover:scale-105 transform">
              Clear Storage
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
