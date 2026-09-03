import Link from "next/link";
import Image from "next/image";
import { Globe, Heart, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={"/"}>
              <Image
                src="/company-logo.svg"
                alt="Product"
                width={100}
                height={100}
                className="object-cover"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Discover quality products designed to make your everyday life
              better. Shop confidently with fast delivery and easy returns.
            </p>

            {/* Social-style icons */}
            <div className="mt-6 flex items-center gap-2">
              {[Globe, Heart, Mail, Phone].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="rounded-full border p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">Social link</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold">Shop</h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="hover:text-foreground">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:text-foreground">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold">Customer Service</h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-foreground">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-foreground">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-xl border bg-muted/40 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="font-semibold">Stay in the loop</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Get updates about new products and exclusive deals.
            </p>
          </div>

          <div className="mt-4 flex w-full max-w-md md:mt-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-10 min-w-0 flex-1 rounded-l-md border border-r-0 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
            />

            <button className="flex h-10 items-center gap-2 rounded-r-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SPAZIO. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>

            <Link href="/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
