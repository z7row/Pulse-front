import { nature } from '@/lib/fonts'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className="border-t border-cornsilk/10">
            <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between gap-10">
                <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-4">
                        <Image
                            src="/photos/logo/logo.png"
                            alt="Pulse"
                            width={32}
                            priority
                            height={32}
                            className="rounded-full"
                        />
                        <span className={`${nature.className} text-xl`}>Pulse</span>
                    </div>
                    <p className="text-cornsilk/60 text-sm leading-relaxed">
                        A quiet corner of the internet for people who'd rather read
                        slowly than scroll fast.
                    </p>
                </div>

                <div className="flex flex-wrap gap-12">
                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-cornsilk/90">Explore</h4>
                        <ul className="space-y-2 text-sm text-cornsilk/60">
                            <li><Link href="/" className="hover:text-cornsilk transition-all">Home</Link></li>
                            <li><Link href="/blog" className="hover:text-cornsilk transition-all">Blogs</Link></li>
                            <li><Link href="/download" className="hover:text-cornsilk transition-all">Download</Link></li>
                            <li><Link href="/about" className="hover:text-cornsilk transition-all">About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-cornsilk/90">Follow</h4>
                        <div className="flex gap-4">
                            <a href="google.com" aria-label="Instagram" className="text-cornsilk/60 hover:text-cornsilk transition-all">
                                google
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61590957732130" aria-label="Zap" className="text-cornsilk/60 hover:text-cornsilk transition-all">
                                facebook
                            </a>
                            <a href="https://prex-sand.vercel.app/ar" aria-label="MonitorPlay" className="text-cornsilk/60 hover:text-cornsilk transition-all">
                                PREX
                            </a>
                        </div>
                    </div>
                </div>
            </div>
<p className="mt-4 text-center text-xs text-cornsilk/40 my-4">
  By signing in, you agree to our{" "}
  <Link href="/terms" className="underline hover:text-foreground transition-colors">
    Terms of Service
  </Link>{" "}
  and{" "}
  <Link href="/privacy" className="underline hover:text-foreground transition-colors">
    Privacy Policy
  </Link>
  .
</p>
            <div className="text-center text-xs text-cornsilk/40 pb-1">
                © {new Date().getFullYear()} Pulse All rights reserved
            </div>
            <div className="text-center text-sm text-cornsilk/80 pb-8 font-bold">
                Powared By <a href="https://prex-sand.vercel.app/ar" aria-label="MonitorPlay" className="text-cornsilk hover:underline hover:text-cornsilk transition-all font-black">
                                PREX
                            </a>
            </div>
        </div>
    )
}

export default Footer  
