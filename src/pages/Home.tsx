import { ChangeEvent, FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Bot,
  Building2,
  CheckSquare,
  CircleDollarSign,
  Cpu,
  Flame,
  Handshake,
  Lightbulb,
  Megaphone,
  Rocket,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DONATION_URL = 'https://hcb.hackclub.com/donations/start/gear-up-foundation';
const CONTACT_EMAIL = 'team@gear-up-foundation.org';

type IconComponent = typeof Rocket;

type CardData = {
  title: string;
  description: string;
  icon: IconComponent;
};

type HackathonRole = 'student' | 'parent' | 'mentor' | 'sponsor' | 'school' | 'other';

type HackathonFormData = {
  name: string;
  email: string;
  organization: string;
  role: HackathonRole;
  message: string;
};

const fadeInUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const Section = ({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) => (
  <section id={id} className={`relative scroll-mt-20 overflow-hidden px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24 ${className}`}>
    <div className="relative mx-auto max-w-7xl">{children}</div>
  </section>
);

const useGsapReveal = () => {
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 767px)').matches;
    if (reduceMotion || isSmallScreen) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '.gsap-image-reveal',
        { opacity: 0.72, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: scope,
            start: 'top 82%',
            end: 'bottom 45%',
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        '.gsap-word',
        { opacity: 0.28 },
        {
          opacity: 1,
          stagger: 0.035,
          ease: 'none',
          scrollTrigger: {
            trigger: scope,
            start: 'top 72%',
            end: 'bottom 55%',
            scrub: 0.7,
          },
        }
      );
    }, scope);

    return () => context.revert();
  }, []);

  return scopeRef;
};

const ButtonLink = ({
  children,
  href,
  to,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode;
  href?: string;
  to?: string;
  variant?: 'primary' | 'outline' | 'dark' | 'light';
  className?: string;
}) => {
  const styles = {
    primary: 'border-[#0b8fc5] bg-[#0b8fc5] text-white hover:bg-[#0879a7]',
    outline: 'border-current bg-transparent text-current hover:bg-current/10',
    dark: 'border-[#14314a] bg-[#14314a] text-white hover:bg-[#0b2236]',
    light: 'border-[#f4f0e7] bg-[#f4f0e7] text-[#14314a] hover:bg-white',
  };
  const base =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-none border-2 px-6 py-3 text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b8fc5] focus-visible:ring-offset-2';

  if (to) {
    return (
      <Link to={to} className={`${base} ${styles[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </a>
  );
};

const GearMark = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    <img src="/gear-logo.png" alt="" className="h-full w-full object-contain" />
  </span>
);

const HeroPhotoStack = () => (
  <div className="relative mx-auto min-h-[330px] w-full max-w-[610px] sm:min-h-[520px]">
    <div className="group absolute right-0 top-0 h-[245px] w-[82%] overflow-hidden bg-[#f4f0e7] shadow-[12px_12px_0_rgba(11,143,197,0.45)] sm:h-[420px] sm:shadow-[18px_18px_0_rgba(11,143,197,0.45)]">
      <img src="/kid-using-laptop.jpg" alt="Student working on a laptop during an online coding lesson" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
    </div>

    <div className="group absolute bottom-8 left-0 z-10 h-[142px] w-[56%] overflow-hidden border-[7px] border-[#14314a] bg-[#f4f0e7] shadow-[0_18px_38px_rgba(6,25,40,0.3)] sm:h-[250px] sm:border-[10px] sm:shadow-[0_24px_55px_rgba(6,25,40,0.3)]">
      <img src="/kid-visual-programming.jpg" alt="Student using visual programming with robotics pieces" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
    </div>

    <div className="absolute bottom-0 right-4 z-20 max-w-[210px] bg-[#f2643f] p-4 text-[#14314a] shadow-[10px_10px_0_rgba(6,25,40,0.25)] sm:max-w-[230px] sm:p-5 sm:shadow-[12px_12px_0_rgba(6,25,40,0.25)]">
      <p className="text-xl font-black leading-[0.95] sm:text-2xl">Coding, robotics, and build days.</p>
    </div>

    <div className="absolute left-8 top-8 z-20 hidden items-center gap-3 bg-[#f4f0e7] px-4 py-3 text-sm font-black text-[#14314a] shadow-[8px_8px_0_rgba(6,25,40,0.25)] sm:flex">
      <GearMark className="h-8 w-8" />
      Triangle Area Hackathon
    </div>
  </div>
);

const Hero = () => (
  <section className="relative isolate overflow-hidden bg-[#14314a] px-5 pb-12 pt-9 text-[#f4f0e7] sm:px-8 sm:pb-20 lg:px-10 lg:pb-28 lg:pt-16">
    <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
      <div>
        <h1 className="max-w-5xl text-[clamp(2.95rem,7.2vw,6.6rem)] font-black leading-[0.92] tracking-normal text-[#f4f0e7]">
          Gear Up Foundation
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-[clamp(1.15rem,2.3vw,2.1rem)] font-bold leading-[1.18] text-[#d7edf5] sm:mt-8">
          Hands-on technology programs for students who want to build, compete, and lead.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <ButtonLink href="#hackathon">
            Join the hackathon <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={DONATION_URL} variant="outline" className="text-[#f4f0e7]">
            Donate via HCB
          </ButtonLink>
        </div>
      </div>

      <HeroPhotoStack />
    </div>
  </section>
);

const MissionStatement = () => (
  <section className="bg-[#f4f0e7] px-5 py-11 text-[#14314a] sm:px-8 sm:py-14 lg:px-10 lg:py-20">
    <div className="mx-auto grid max-w-7xl gap-6 sm:gap-10 lg:grid-cols-[0.28fr_1fr] lg:items-start">
      <div className="flex items-center gap-4">
        <GearMark className="h-12 w-12 rounded-full border-2 border-[#0b8fc5] bg-white p-2 sm:h-16 sm:w-16" />
      </div>
      <p className="text-[clamp(1.65rem,4.8vw,5.2rem)] font-black leading-[1.02] sm:leading-[0.98]">
        We help students run real programs: hackathons, robotics workshops,
        <span
          className="mx-1 inline-block h-[0.72em] w-[1.28em] translate-y-[0.08em] overflow-hidden rounded-full bg-cover bg-center align-middle sm:mx-2 sm:h-[0.78em] sm:w-[1.45em]"
          style={{ backgroundImage: 'url(/kid-visual-programming.jpg)' }}
          aria-hidden="true"
        />
        STEAM sessions, and the project support around them.
      </p>
    </div>
  </section>
);

const ProgramPanel = ({
  title,
  description,
  action,
  icon: Icon,
  tone,
  onClick,
}: {
  title: string;
  description: string;
  action: string;
  icon: IconComponent;
  tone: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`${tone} group flex min-h-[190px] flex-col justify-between p-5 text-left transition hover:-translate-y-2 sm:min-h-[270px] sm:p-8`}
  >
    <div className="flex items-start justify-between gap-4">
      <Icon className="h-9 w-9" />
      <span className="text-5xl font-black leading-none transition group-hover:rotate-90">+</span>
    </div>
    <div>
      <h3 className="text-[clamp(1.65rem,4vw,3.2rem)] font-black leading-[0.98]">{title}</h3>
      <p className="mt-4 max-w-md text-base font-semibold leading-6 sm:mt-5 sm:text-lg sm:leading-7">{description}</p>
      <p className="mt-5 inline-flex items-center gap-2 border-b-2 border-current text-sm font-black sm:mt-6">
        {action} <ArrowRight className="h-4 w-4" />
      </p>
    </div>
  </button>
);

const ProgramCard = ({ title, description, icon: Icon }: CardData) => (
  <motion.article variants={fadeInUp} className="group border-2 border-[#14314a] bg-[#f4f0e7] p-6 text-[#14314a] transition hover:-translate-y-1 hover:bg-[#d7edf5]">
    <Icon className="mb-6 h-8 w-8 text-[#0b8fc5]" />
    <h3 className="text-2xl font-black leading-tight">{title}</h3>
    <p className="mt-4 text-base font-semibold leading-7">{description}</p>
  </motion.article>
);

const SupportItem = ({ title, description, icon: Icon }: CardData) => (
  <motion.article variants={fadeInUp} className="bg-[#f4f0e7] p-5 text-[#14314a]">
    <Icon className="mb-5 h-7 w-7 text-[#f2643f]" />
    <h3 className="text-xl font-black">{title}</h3>
    <p className="mt-3 text-sm font-semibold leading-6">{description}</p>
  </motion.article>
);

const HackathonInquiryForm = ({
  selectedRole,
  onRoleChange,
}: {
  selectedRole: HackathonRole;
  onRoleChange: (role: HackathonRole) => void;
}) => {
  const [formData, setFormData] = useState<HackathonFormData>({
    name: '',
    email: '',
    organization: '',
    role: selectedRole,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const roleLabels: Record<HackathonRole, string> = {
    student: 'Student',
    parent: 'Parent',
    mentor: 'Mentor / Volunteer',
    sponsor: 'Sponsor / Partner',
    school: 'School / Organization',
    other: 'Other',
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'role') {
      onRoleChange(value as HackathonRole);
    }
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const form = event.currentTarget;
      const response = await fetch(form.getAttribute('action') || '/', {
        method: 'POST',
        body: new FormData(form),
      });

      if (response.ok) {
        setStatus({
          success: true,
          message: 'Thanks. We received your hackathon interest form and will follow up soon.',
        });
        setFormData({
          name: '',
          email: '',
          organization: '',
          role: formData.role,
          message: '',
        });
      } else {
        setStatus({
          success: false,
          message: 'Something went wrong while sending the form. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error sending hackathon inquiry:', error);
      setStatus({
        success: false,
        message: 'Something went wrong while sending the form. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'mt-2 w-full border-2 border-[#14314a] bg-[#f4f0e7] px-3 py-2.5 text-base font-bold text-[#14314a] outline-none transition placeholder:text-[#657585] focus:border-[#0b8fc5] focus:ring-2 focus:ring-[#0b8fc5] sm:px-4 sm:py-3';

  return (
    <div id="hackathon-interest" className="mt-10 border-2 border-[#14314a] bg-[#d7edf5] p-4 text-[#14314a] sm:mt-12 sm:p-8">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="text-sm font-black">Hackathon interest</p>
          <h3 className="mt-2 text-3xl font-black leading-none sm:mt-3 sm:text-4xl">Tell us where you fit.</h3>
          <p className="mt-4 text-base font-semibold leading-6 sm:mt-5 sm:text-lg sm:leading-7">
            Share your role and we&apos;ll follow up with the right next step.
          </p>
        </div>

        <form
          name="hackathon-interest"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/"
          onSubmit={handleSubmit}
          className="grid gap-4"
        >
          <input type="hidden" name="form-name" value="hackathon-interest" />
          <input type="hidden" name="roleLabel" value={roleLabels[formData.role]} />
          <input type="text" name="bot-field" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-black">
              Name *
              <input required name="name" value={formData.name} onChange={handleChange} className={inputClass} />
            </label>
            <label className="text-sm font-black">
              Email *
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-black">
              School / company
              <input name="organization" value={formData.organization} onChange={handleChange} className={inputClass} />
            </label>
            <label className="text-sm font-black">
              I am a *
              <select required name="role" value={formData.role} onChange={handleChange} className={inputClass}>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="mentor">Mentor / Volunteer</option>
                <option value="sponsor">Sponsor / Partner</option>
                <option value="school">School / Organization</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <label className="text-sm font-black">
            Notes
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={
                formData.role === 'sponsor'
                  ? 'Tell us what kind of sponsorship or partnership you are interested in.'
                  : formData.role === 'mentor'
                    ? 'Tell us how you want to help students during the event.'
                    : 'Tell us who wants to participate, grade level, or what track sounds interesting.'
              }
              className={inputClass}
            />
          </label>
          {status && (
            <p className={`border-2 border-[#14314a] px-4 py-3 text-sm font-black ${status.success ? 'bg-[#f4f0e7] text-[#14314a]' : 'bg-[#f2643f] text-[#14314a]'}`}>
              {status.message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center border-2 border-[#14314a] bg-[#14314a] px-6 py-3 text-sm font-black text-white transition hover:bg-[#0b2236] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
          >
            {isSubmitting ? 'Sending...' : 'Send interest'}
          </button>
        </form>
      </div>
    </div>
  );
};

const programs: CardData[] = [
  {
    title: 'Hackathon',
    description: 'A beginner-friendly event for apps, AI tools, robotics concepts, hardware prototypes, and social-good projects.',
    icon: Rocket,
  },
  {
    title: 'Robotics',
    description: 'Build days, CAD, hardware, competition prep, and hands-on engineering support.',
    icon: Bot,
  },
  {
    title: 'STEAM workshops',
    description: 'Practical sessions in coding, design, science, engineering, and math.',
    icon: Flame,
  },
  {
    title: 'Student projects',
    description: 'Lightweight support for promising ideas that should continue after an event.',
    icon: Lightbulb,
  },
];

const supportItems: CardData[] = [
  {
    title: 'Venue',
    description: 'Rooms, tables, power, Wi-Fi, signage, and day-of logistics.',
    icon: Building2,
  },
  {
    title: 'Prizes',
    description: 'Awards for technical work, beginners, creative engineering, and community impact.',
    icon: Trophy,
  },
  {
    title: 'Hardware',
    description: 'Robotics parts, electronics kits, sensors, tools, and prototyping supplies.',
    icon: Cpu,
  },
  {
    title: 'Operations',
    description: 'Registration, communications, printing, volunteer coordination, and outreach.',
    icon: Megaphone,
  },
];

const BuildProof = () => {
  const scopeRef = useGsapReveal();
  const sentence = 'Students need a room, a mentor, working hardware, and enough time to turn ideas into demos.';

  return (
    <Section className="bg-[#14314a] text-white">
      <div ref={scopeRef} className="grid gap-8 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="gsap-image-reveal grid grid-cols-2 items-end gap-3 sm:gap-4">
          <div className="group overflow-hidden border-[7px] border-[#0b8fc5] bg-[#f4f0e7] sm:border-[10px]">
            <img src="/kid-visual-programming.jpg" alt="Student arranging block-based code on a tablet beside robotics pieces" className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
          <div className="group overflow-hidden bg-[#f4f0e7] shadow-[10px_10px_0_rgba(242,100,63,0.72)] sm:shadow-[18px_18px_0_rgba(242,100,63,0.72)]">
            <img src="/kid-using-laptop.jpg" alt="Student following an online coding lesson on a laptop" className="aspect-[5/4] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
        </div>
        <div>
          <h2 className="max-w-3xl text-[clamp(1.85rem,5.5vw,5.2rem)] font-black leading-[1.02] sm:leading-[0.96]">
            {sentence.split(' ').map((word, index) => (
              <span key={`${word}-${index}`} className="gsap-word mr-[0.22em] inline-block">
                {word}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#d7edf5] sm:mt-7 sm:text-xl sm:leading-8">
            Gear Up is building the practical layer around student ambition: workshops, events, materials, and sponsor support.
          </p>
        </div>
      </div>
    </Section>
  );
};

const eventSnapshot = [
  ['Audience', 'Middle + high school students'],
  ['Tracks', 'AI, Web Apps, Robotics, Social Good, Beginner Track'],
  ['Support needed', 'Venue, food, prizes, mentors, hardware'],
];

const Home = () => {
  const [selectedHackathonRole, setSelectedHackathonRole] = useState<HackathonRole>('student');

  const openHackathonInquiry = (role: HackathonRole) => {
    setSelectedHackathonRole(role);
    window.setTimeout(() => {
      document.getElementById('hackathon-interest')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#14314a] text-[#14314a]">
      <Hero />
      <MissionStatement />
      <BuildProof />

      <Section id="hackathon" className="bg-[#f2643f] text-[#14314a]">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <h2 className="text-[clamp(2.45rem,7vw,6.2rem)] font-black leading-[0.94] sm:leading-[0.9]">
              Gear Up Hackathon
            </h2>
            <p className="mt-5 text-base font-semibold leading-7 sm:mt-7 sm:text-xl sm:leading-8">
              Our first flagship event is being built for students in the Triangle Area. The goal is simple: give beginners and experienced builders a real place to make, demo, and keep going.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => openHackathonInquiry('student')} className="inline-flex min-h-12 items-center justify-center border-2 border-[#14314a] bg-[#14314a] px-6 py-3 text-sm font-black text-white transition hover:bg-[#0b2236]">
                Register interest
              </button>
              <button type="button" onClick={() => openHackathonInquiry('sponsor')} className="inline-flex min-h-12 items-center justify-center border-2 border-[#14314a] bg-transparent px-6 py-3 text-sm font-black text-[#14314a] transition hover:bg-[#14314a] hover:text-white">
                Sponsor the event
              </button>
            </div>
          </div>

          <div className="bg-[#14314a] p-5 text-[#d7edf5] shadow-[12px_12px_0_rgba(20,49,74,0.22)] sm:p-6 sm:shadow-[18px_18px_0_rgba(20,49,74,0.22)]">
            <div className="flex items-start justify-between gap-4">
              <GearMark className="h-12 w-12 rounded-full bg-[#f4f0e7] p-2 sm:h-16 sm:w-16" />
              <p className="border-2 border-[#0b8fc5] px-3 py-1 text-xs font-black">Coming Soon</p>
            </div>
            <h3 className="mt-7 text-3xl font-black leading-none text-white sm:mt-10 sm:text-4xl">Triangle Area, NC</h3>
            <div className="mt-6 grid gap-3 sm:mt-8">
              {eventSnapshot.map(([label, value]) => (
                <div key={label} className="border-2 border-[#0b8fc5] p-4">
                  <p className="text-xs font-black text-[#8fd8ef]">{label}</p>
                  <p className="mt-2 text-base font-bold leading-6 text-[#f4f0e7]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-5">
          <ProgramPanel
            title="Students"
            description="Join a team, build a project, and learn by making something real."
            action="Student interest"
            icon={Rocket}
            tone="bg-[#d7edf5] text-[#14314a]"
            onClick={() => openHackathonInquiry('student')}
          />
          <ProgramPanel
            title="Mentors"
            description="Help with ideas, debugging, demos, and project direction."
            action="Mentor interest"
            icon={Users}
            tone="bg-[#f4f0e7] text-[#14314a]"
            onClick={() => openHackathonInquiry('mentor')}
          />
          <ProgramPanel
            title="Sponsors"
            description="Support funding, food, prizes, hardware, or a local venue."
            action="Sponsor interest"
            icon={Handshake}
            tone="bg-[#14314a] text-white"
            onClick={() => openHackathonInquiry('sponsor')}
          />
        </div>

        <HackathonInquiryForm key={selectedHackathonRole} selectedRole={selectedHackathonRole} onRoleChange={setSelectedHackathonRole} />
      </Section>

      <Section id="programs" className="bg-[#f4f0e7]">
        <div className="mb-8 grid gap-4 sm:mb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <h2 className="text-[clamp(2.45rem,7vw,6rem)] font-black leading-[0.94] sm:leading-[0.9]">Programs</h2>
          <p className="max-w-3xl text-base font-semibold leading-7 sm:text-xl sm:leading-8">
            A focused set of ways students can get hands-on with technology.
          </p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="grid grid-flow-dense gap-0 border-2 border-[#14314a] md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
        </motion.div>
      </Section>

      <Section id="sponsor" className="bg-[#14314a] text-white">
        <div className="mb-8 grid gap-5 sm:mb-12 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-[clamp(2.45rem,7vw,5.8rem)] font-black leading-[0.94] sm:leading-[0.9]">What support funds</h2>
          <div>
            <p className="text-base font-semibold leading-7 text-[#d7edf5] sm:text-xl sm:leading-8">
              Donations run through HCB and go toward the practical pieces students cannot fake: space, materials, food, prizes, and operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={DONATION_URL}>Donate via HCB</ButtonLink>
              <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Sponsor%20a%20Gear%20Up%20Hackathon`} variant="outline" className="text-white">
                Sponsor a hackathon
              </ButtonLink>
            </div>
          </div>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supportItems.map((item) => (
            <SupportItem key={item.title} {...item} />
          ))}
        </motion.div>
      </Section>

      <Section id="impact" className="bg-[#d7edf5] text-[#14314a]">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-[clamp(2.4rem,7vw,5.8rem)] font-black leading-[0.94] sm:leading-[0.9]">Clear reporting, no inflated numbers.</h2>
            <p className="mt-5 text-base font-semibold leading-7 sm:mt-7 sm:text-xl sm:leading-8">
              Gear Up will report real program activity, real budgets, and real outcomes as events launch.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {[
              ['HCB processed', ShieldCheck],
              ['Program allocated', CheckSquare],
              ['Student supported', CircleDollarSign],
            ].map(([label, Icon]) => (
              <div key={label as string} className="border-2 border-[#14314a] bg-[#f4f0e7] p-4 text-center sm:p-5">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#14314a] text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-base font-black">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="team" className="bg-[#f4f0e7] text-[#14314a]">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <h2 className="text-[clamp(2.45rem,7vw,5.8rem)] font-black leading-[0.94] sm:leading-[0.9]">
              Student-led, program-first.
            </h2>
            <p className="mt-5 text-base font-semibold leading-7 sm:mt-7 sm:text-xl sm:leading-8">
              The work is the focus: event planning, mentor coordination, workshop design, sponsor outreach, and budget tracking.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/contact" variant="dark">
                Contact the team
              </ButtonLink>
              <ButtonLink href={DONATION_URL} variant="outline" className="text-[#14314a]">
                Donate
              </ButtonLink>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {[
                ['Event buildout', 'Venue outreach, registration, judging structure, demo flow, and day-of logistics.'],
                ['Mentor network', 'Technical mentors for project ideas, debugging, robotics, presentations, and beginner support.'],
                ['Workshop materials', 'Reusable lesson outlines, hardware lists, starter projects, and student project prompts.'],
                ['Sponsor reporting', 'HCB donation tracking, program budgets, sponsor asks, and public updates after events.'],
              ].map(([title, description]) => (
                <div key={title} className="border-2 border-[#14314a] bg-white p-4 sm:p-5">
                  <h3 className="text-xl font-black leading-tight sm:text-2xl">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 sm:mt-4 sm:text-base sm:leading-7">{description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
