const Footer = () => {
  return (
    <footer className="mt-auto">
      {/* Top Section - Light Grey Background */}
      <div className="bg-gray-600 pt-4 pb-1 border-amber-500 border-t-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quick Links */}
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-lg text-blue-500">Quick Links</h3>
              <a
                href="https://courses.aastu.edu.et/"
                className="text-white font-bold hover:text-yellow-400 transition-colors"
              >
                E-learning
              </a>
              <a
                href="https://www.aastu.edu.et/library/"
                className="text-white font-bold hover:text-yellow-400 transition-colors relative right-2"
              >
                E-library
              </a>
              <a
                href="http://studentinfo.aastu.edu.et/"
                className="text-white font-bold hover:text-yellow-400 transition-colors relative left-1"
              >
                Student Info
              </a>
              <a
                href="http://helpdesk.aastu.edu.et/"
                className="text-white font-bold hover:text-yellow-400 transition-colors relative right-2"
              >
                Helpdesk
              </a>
            </div>

            {/* Connect with us */}
            <div className="flex flex-col gap-0.5">
              <h3 className="text-blue-500 font-bold text-lg relative right-20">Connect with us</h3>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">f</span>
                </div>
                <a
                  href="https://www.facebook.com/aastu.edu.et/"
                  className="text-white font-bold hover:text-yellow-400 transition-colors"
                >
                  Facebook
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🐦</span>
                </div>
                <a
                  href="https://x.com/wpzoom"
                  className="text-white font-bold hover:text-yellow-400 transition-colors"
                >
                  Twitter
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">▶</span>
                </div>
                <a
                  href="https://www.youtube.com/channel/UCUpgXuqDCiLfgLPK_FxS-6g"
                  className="text-white font-bold hover:text-yellow-400 transition-colors"
                >
                  YouTube
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">in</span>
                </div>
                <a
                  href="https://www.linkedin.com/feed/"
                  className="text-white font-bold hover:text-yellow-400 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Site Statistics */}
            <div className="flex flex-col gap-2">
              <h3 className="text-blue-500 font-bold text-lg">Site Statistics</h3>
              <div className="text-white font-bold">Today's visitors: 179</div>
              <div className="text-white font-bold relative left-3.5">
                Today's page views: 221
              </div>
              <div className="text-white font-bold relative left-">Total visitors: 54,322</div>
              <div className="text-white font-bold relative left-4">
                Total page views: 66,401
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Dark Blue Background */}
      <div className="bg-blue-900 py-1.5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            {/* Copyright */}
            <div className="text-white font-bold">
              © {new Date().getFullYear()} AASTU | Addis Ababa Science and
              Technology University
            </div>

            {/* ISO Certification */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-blue-600">
                <span className="text-blue-600 font-bold text-sm">✓</span>
              </div>
              <div className="text-white font-bold text-sm">
                ISO 9001:2015 certified organization by ECAE CD
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
