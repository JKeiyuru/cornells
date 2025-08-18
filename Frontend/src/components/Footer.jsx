import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black border-t border-amber-500/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='60' height='60'/%3E%3Crect x='60' y='60' width='60' height='60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-thin text-white tracking-wider">
                JOIN THE <span className="text-amber-400">CORNELLS EXPERIENCE</span>
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                Be the first to discover new luxury fragrances, exclusive collections, and receive insider access to our premium beauty world.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-medium tracking-widest uppercase transition-all duration-300 transform hover:scale-105 rounded-lg whitespace-nowrap"
              >
                {isSubscribed ? "WELCOME!" : "SUBSCRIBE"}
              </button>
            </form>

            {isSubscribed && (
              <div className="text-amber-400 text-sm font-light animate-pulse">
                ✨ Welcome to the Cornells family! Check your email for exclusive offers.
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <div className="text-4xl font-thin text-white mb-2 tracking-[0.2em]">CORNELLS</div>
                <div className="text-sm text-amber-400 font-light tracking-[0.3em] opacity-80">BY STERLING PARFUMS</div>
                <div className="h-px bg-gradient-to-r from-amber-400 via-amber-400 to-transparent mt-2 w-48 mx-auto lg:mx-0"></div>
              </div>
              <p className="text-white/60 font-light leading-relaxed text-center lg:text-left max-w-md">
                Crafting extraordinary fragrances that tell your unique story. Experience the pinnacle of luxury with our exclusive collection of premium beauty essentials.
              </p>
            </div>

            {/* Premium Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {["CRUELTY-FREE", "SUSTAINABLE", "PREMIUM QUALITY"].map((label) => (
                <div key={label} className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-white/80 text-xs tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white text-lg font-light tracking-wider mb-6">EXPLORE</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Collections", href: "/collections" },
                { name: "New Arrivals", href: "/new" },
                { name: "Best Sellers", href: "/bestsellers" },
                { name: "Gift Sets", href: "/gifts" },
                { name: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-amber-400 transition-colors duration-300 font-light tracking-wide text-sm block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h4 className="text-white text-lg font-light tracking-wider mb-6">CONNECT</h4>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-white/60 text-sm font-light">
                    <div>Sterling Parfums Headquarters</div>
                    <div>Beverly Hills, CA 90210</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-white/60 text-sm font-light">+1 (555) 123-LUXURY</span>
                </div>

                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white/60 text-sm font-light">support@cornellsbeauty.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center border-t border-white/10 pt-6 text-white/30 text-xs font-light tracking-wider">
          &copy; {new Date().getFullYear()} Cornells by Sterling Parfums. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
