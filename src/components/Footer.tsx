import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const DONATION_URL = 'https://hcb.hackclub.com/donations/start/gear-up-foundation';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <img src="/gearup-rectangle-logo.png" alt="Gear Up Foundation Logo" className="h-14 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Gear Up Foundation powers hackathons, STEAM programs, robotics initiatives, and
              student-led technology projects that help young builders create real-world impact.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/gear.uprobotics/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li><a href="/#programs" className="hover:text-white">Programs</a></li>
              <li><a href="/#hackathon" className="hover:text-white">Hackathon</a></li>
              <li><a href="/#impact" className="hover:text-white">Impact</a></li>
              <li><Link to="/team" className="hover:text-white">Team</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Support</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li><a href={DONATION_URL} className="hover:text-white">Donate</a></li>
              <li><a href={DONATION_URL} className="hover:text-white">Donate via HCB</a></li>
              <li><a href="mailto:team@gear-up-foundation.org?subject=Sponsor%20a%20Gear%20Up%20Hackathon" className="hover:text-white">Sponsor a Hackathon</a></li>
              <li><a href="mailto:team@gear-up-foundation.org?subject=Partner%20With%20Gear%20Up" className="hover:text-white">Partner With Gear Up</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-cyan-300" />
                <span>Cary, North Carolina</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cyan-300" />
                <span>(984) 687-6529</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cyan-300" />
                <span>team@gear-up-foundation.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Gear Up Foundation. All rights reserved.</p>
          <p>Donations are processed through HCB.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
