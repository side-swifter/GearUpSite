import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  ArrowRight,
  Bot,
  Building2,
  CheckSquare,
  ChevronRight,
  CircleDollarSign,
  Code2,
  Cpu,
  Flame,
  Handshake,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Megaphone,
  NotebookPen,
  Rocket,
  School,
  ShieldCheck,
  Trophy,
  Users,
  Utensils,
  Wrench,
} from 'lucide-react';
import { teamMembers } from '../config/teamData';
import { emailjsConfig, getAdminNotificationTemplate, getUserConfirmationTemplate } from '../config/emailjs';

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
  <section id={id} className={`relative scroll-mt-20 overflow-hidden px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
    <div className="relative mx-auto max-w-7xl">{children}</div>
  </section>
);

const SectionHeader = ({
  title,
  description,
  align = 'center',
}: {
  title: string;
  description: string;
  align?: 'center' | 'left';
}) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={align === 'center' ? 'mx-auto mb-10 max-w-3xl text-center' : 'mb-10 max-w-3xl'}
  >
    <h2 className="text-3xl font-bold tracking-normal text-slate-50 sm:text-4xl">{title}</h2>
    <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">{description}</p>
  </motion.div>
);

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
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  className?: string;
}) => {
  const styles = {
    primary: 'bg-blue-600 text-white shadow-sm hover:bg-blue-500',
    secondary: 'border border-slate-600 bg-slate-800 text-slate-200 hover:border-slate-500 hover:bg-slate-700',
    dark: 'bg-slate-800 text-white shadow-sm hover:bg-slate-700',
    ghost: 'text-slate-400 hover:bg-slate-800 hover:text-white',
  };
  const base =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

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

const BlueprintGrid = () => (
  <div className="pointer-events-none absolute inset-0 opacity-70">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.12)_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:8px_8px]" />
  </div>
);

const GearMark = ({ className = '' }: { className?: string }) => (
  <div className={`inline-flex items-center justify-center rounded-full border-2 border-blue-500 bg-slate-900 text-blue-400 ${className}`}>
    <Flame className="h-5 w-5 fill-orange-950 text-orange-400" />
  </div>
);

const BuilderBoard = () => {
  const boardItems = [
    {
      title: 'Hackathon planning',
      note: 'Venue, mentors, judges, beginner track',
      icon: Trophy,
      color: 'bg-sky-950/60',
    },
    {
      title: 'Robotics workshops',
      note: 'Build days, code, CAD, competition prep',
      icon: Bot,
      color: 'bg-amber-950/60',
    },
    {
      title: 'Student projects',
      note: 'Ideas to prototypes to community impact',
      icon: Lightbulb,
      color: 'bg-lime-950/60',
    },
    {
      title: 'Sponsor support',
      note: 'Food, prizes, hardware, outreach',
      icon: Handshake,
      color: 'bg-blue-950/60',
    },
    {
      title: 'HCB donation pipeline',
      note: 'Transparent funds, real student programs',
      icon: CircleDollarSign,
      color: 'bg-violet-950/60',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 1, y: 0, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="relative"
    >
      <div className="w-full rounded-xl border border-slate-700 bg-slate-900 shadow-[0_18px_55px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-3 border-b border-slate-700 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <GearMark className="h-10 w-10" />
            <p className="min-w-0 font-mono text-sm font-bold uppercase tracking-[0.1em] text-slate-100">
              Gear Up Builder Board
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
            <MapPin className="h-4 w-4" />
            North Carolina
          </div>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
          {boardItems.map(({ title, note, icon: Icon, color }, index) => (
            <div
              key={title}
              className={`rounded-lg border border-slate-700 bg-slate-800 p-3 ${index === 4 ? 'sm:col-span-2 xl:col-span-1' : ''}`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-sm font-black uppercase leading-5 text-slate-100">{title}</h3>
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
              </div>
              <div className={`${color} min-h-[96px] rounded-md border border-slate-600 p-4 shadow-sm`}>
                <p className="font-mono text-[13px] leading-6 text-slate-300 sm:text-sm">{note}</p>
              </div>
              <div className="mt-3 h-9 rounded-md border border-dashed border-slate-600 bg-slate-700/40" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const MissionPillar = ({ title, description, icon: Icon }: CardData) => (
  <motion.article
    variants={fadeInUp}
    className="border-l-4 border-blue-500 bg-slate-800 py-4 pl-5 pr-4"
  >
    <Icon className="mb-4 h-6 w-6 text-blue-400" />
    <h3 className="text-lg font-bold text-slate-50">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
  </motion.article>
);

const ProgramRow = ({ title, description, icon: Icon }: CardData) => (
  <motion.article
    variants={fadeInUp}
    className="group flex gap-4 border-t border-slate-700 py-6"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-blue-900/60 bg-blue-950/50 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h3 className="font-bold text-slate-50">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  </motion.article>
);

const ProgramCard = ({ title, description, icon: Icon }: CardData) => (
  <motion.article
    variants={fadeInUp}
    className="group rounded-lg border border-slate-700 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-950/30"
  >
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-blue-900/60 bg-blue-950/50 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-black text-slate-50">{title}</h3>
    <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const subject = `Gear Up Hackathon Interest: ${roleLabels[formData.role]}`;
    const message = [
      `Role: ${roleLabels[formData.role]}`,
      `Organization / school: ${formData.organization || 'Not provided'}`,
      '',
      formData.message || 'No additional message provided.',
    ].join('\n');

    try {
      const adminTemplate = getAdminNotificationTemplate({
        from_name: formData.name,
        from_email: formData.email,
        subject,
        message,
      });

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        adminTemplate,
        emailjsConfig.privateKey
      );

      const userTemplate = getUserConfirmationTemplate({
        from_name: formData.name,
        from_email: formData.email,
        subject,
        message,
      });

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        userTemplate,
        emailjsConfig.privateKey
      );

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

  const inputClass = 'mt-2 w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-900';

  return (
    <div id="hackathon-interest" className="mt-8 rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-sm sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-blue-400">
            Hackathon interest
          </p>
          <h3 className="mt-3 text-2xl font-black text-slate-50">Interested in Gear Up Hackathon?</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Tell us how you want to be involved, and we&apos;ll follow up with the right next step.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold text-slate-300">
              Name *
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-bold text-slate-300">
              Email *
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold text-slate-300">
              School / company
              <input
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-bold text-slate-300">
              I am a *
              <select
                required
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="mentor">Mentor / Volunteer</option>
                <option value="sponsor">Sponsor / Partner</option>
                <option value="school">School / Organization</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <label className="text-sm font-bold text-slate-300">
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
            <p className={`rounded-md px-4 py-3 text-sm font-bold ${status.success ? 'bg-green-950/50 text-green-400' : 'bg-red-950/50 text-red-400'}`}>
              {status.message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
          >
            {isSubmitting ? 'Sending...' : 'Send interest'}
          </button>
        </form>
      </div>
    </div>
  );
};

const FundingItem = ({ title, description, icon: Icon }: CardData) => (
  <motion.article
    variants={fadeInUp}
    className="rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-sm"
  >
    <Icon className="mb-5 h-6 w-6 text-blue-400" />
    <h3 className="font-bold text-slate-50">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
  </motion.article>
);

const Hero = () => (
  <section className="relative isolate overflow-hidden bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
    <BlueprintGrid />
    <div className="absolute left-0 top-0 h-full w-24 border-r border-blue-900/30 bg-slate-950/70" />
    <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 pt-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <div className="mb-6 flex items-center gap-3 text-sm font-bold text-blue-400">
          <MapPin className="h-4 w-4" />
          Founded by student builders in North Carolina
        </div>
        <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-slate-50 sm:text-6xl xl:text-7xl">
          Students don&apos;t need permission to build big things.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
          Gear Up Foundation helps young builders launch hackathons, robotics programs, STEAM
          workshops, and student-led technology projects with the support, tools, and funding to
          make them real.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={DONATION_URL}>
            Donate via HCB <HeartHandshake className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="#hackathon" variant="secondary">
            Sponsor the Hackathon <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="#programs" variant="ghost">
            See What We&apos;re Building
          </ButtonLink>
        </div>
      </motion.div>

      <BuilderBoard />
    </div>
  </section>
);

const missionPillars: CardData[] = [
  {
    title: 'Build in the open',
    description: 'Students make real apps, robots, event systems, and community tools instead of staying in theory.',
    icon: Wrench,
  },
  {
    title: 'Learn by leading',
    description: 'Student organizers practice teaching, recruiting, budgeting, outreach, and running technical programs.',
    icon: Users,
  },
  {
    title: 'Make it local',
    description: 'Programs are built around schools, families, sponsors, and young builders across North Carolina.',
    icon: MapPin,
  },
];

const programs: CardData[] = [
  {
    title: 'Hackathon Operations',
    description: 'Venues, judging, tracks, beginner support, and event logistics.',
    icon: Rocket,
  },
  {
    title: 'Robotics Workshops',
    description: 'Build days, CAD, hardware, competition prep, and hands-on engineering.',
    icon: Bot,
  },
  {
    title: 'STEAM Programs',
    description: 'Practical workshops in coding, design, science, engineering, and math.',
    icon: Flame,
  },
  {
    title: 'Student Projects',
    description: 'Support for student-led apps, tools, prototypes, and community projects.',
    icon: Lightbulb,
  },
  {
    title: 'Sponsor-Funded Resources',
    description: 'Food, prizes, hardware, supplies, and student project grants.',
    icon: CircleDollarSign,
  },
  {
    title: 'Shared Infrastructure',
    description: 'Communications, outreach, scheduling, and systems that help programs scale.',
    icon: Wrench,
  },
];

const fundingItems: CardData[] = [
  {
    title: 'Venue',
    description: 'Rooms, tables, power, Wi-Fi, signage, and day-of event logistics.',
    icon: Building2,
  },
  {
    title: 'Food',
    description: 'Meals, snacks, and water so students can focus through long build sessions.',
    icon: Utensils,
  },
  {
    title: 'Prizes',
    description: 'Awards that recognize technical work, social good, beginners, and creative engineering.',
    icon: Trophy,
  },
  {
    title: 'Hardware',
    description: 'Robotics parts, electronics kits, sensors, tools, and prototyping supplies.',
    icon: Cpu,
  },
  {
    title: 'Workshops',
    description: 'Materials and mentor support for AI, web apps, robotics, design, and beginner tracks.',
    icon: School,
  },
  {
    title: 'Student project support',
    description: 'Small grants and infrastructure that help promising projects continue after events.',
    icon: Rocket,
  },
  {
    title: 'Operations and outreach',
    description: 'Registration systems, communications, printing, volunteer coordination, and school outreach.',
    icon: Megaphone,
  },
];

const initiativeCards: CardData[] = [
  {
    title: 'Gear Up Labs',
    description: 'Hands-on experiments, build days, and student-run technical sessions.',
    icon: NotebookPen,
  },
  {
    title: 'Community tech days',
    description: 'Bringing practical technology education and resources to local communities.',
    icon: Users,
  },
  {
    title: 'Open source projects',
    description: 'Student-built tools and internal systems that can improve how programs run.',
    icon: Code2,
  },
  {
    title: 'Tech for good',
    description: 'Projects focused on real problems in education, access, outreach, and local service.',
    icon: HeartHandshake,
  },
];

const eventSnapshot = [
  ['Status', 'Coming soon'],
  ['Location', 'Triangle Area, NC'],
  ['Audience', 'Middle + high school students'],
  ['Tracks', 'AI, Web Apps, Robotics, Social Good, Beginner Track'],
  ['Support needed', 'Venue, food, prizes, mentors, hardware'],
];

const involvementOptions = [
  {
    role: 'student',
    title: 'Students',
    description: 'Join a team, build a project, and learn by making something real.',
    action: 'Student interest',
    icon: Rocket,
  },
  {
    role: 'mentor',
    title: 'Mentors',
    description: 'Help students with ideas, technical questions, demos, and project direction.',
    action: 'Mentor interest',
    icon: Users,
  },
  {
    role: 'sponsor',
    title: 'Sponsors',
    description: 'Support the event through funding, food, prizes, hardware, or local partnerships.',
    action: 'Sponsor interest',
    icon: Handshake,
  },
] satisfies Array<{
  role: HackathonRole;
  title: string;
  description: string;
  action: string;
  icon: IconComponent;
}>;

const Home = () => {
  const [selectedHackathonRole, setSelectedHackathonRole] = useState<HackathonRole>('student');
  const founderIds = ['akshayraj', 'shresh', 'noah-lee'];
  const founders = founderIds
    .map((id) => {
      const member = teamMembers.find((teamMember) => teamMember.id === id);
      return member || null;
    })
    .filter(Boolean);

  const openHackathonInquiry = (role: HackathonRole) => {
    setSelectedHackathonRole(role);
    window.setTimeout(() => {
      document.getElementById('hackathon-interest')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Hero />

      {/* Mission section */}
      <Section className="border-y border-slate-800 bg-slate-900">
        <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <GearMark className="h-20 w-20" />
            <h2 className="mt-6 text-3xl font-black tracking-normal text-slate-50 sm:text-4xl">
              A nonprofit workshop for young builders.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Gear Up exists to help students design, build, teach, and operate programs that make
              practical technology education easier to access.
            </p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-5 md:grid-cols-3"
          >
            {missionPillars.map((pillar) => (
              <MissionPillar key={pillar.title} {...pillar} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Hackathon section */}
      <Section id="hackathon" className="bg-slate-950">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-blue-400">
              FIRST UP: A STUDENT-BUILT HACKATHON
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-slate-50 sm:text-5xl">
              Gear Up Hackathon
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Our flagship campaign is a student-run hackathon for middle and high school students
              in the Triangle Area. Builders will create apps, AI tools, robotics concepts,
              hardware prototypes, and social-good projects in a beginner-friendly environment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openHackathonInquiry('student')}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Register Interest
              </button>
              <button
                type="button"
                onClick={() => openHackathonInquiry('sponsor')}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-600 bg-slate-800 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
              >
                Sponsor the Event
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg shadow-black/30">
            <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <GearMark className="h-14 w-14 border-white bg-white/10 text-blue-200" />
                <p className="rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em]">
                  Coming Soon
                </p>
              </div>
              <h3 className="mt-8 text-3xl font-black">Gear Up Hackathon</h3>
              <p className="mt-2 text-sm font-semibold text-blue-100">Triangle Area, NC</p>
            </div>
            <div className="p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {eventSnapshot.slice(2, 4).map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-400">{label}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-slate-200">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-slate-700 bg-slate-800 p-4">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-400">Support needed</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-200">Venue, food, prizes, mentors, hardware</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-black text-slate-50">Get involved</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {involvementOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.title}
                  className="rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-800 hover:shadow-lg hover:shadow-blue-950/20"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-blue-950/50 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-black text-slate-50">{option.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{option.description}</p>
                  <button
                    type="button"
                    onClick={() => openHackathonInquiry(option.role)}
                    className="mt-4 text-sm font-bold text-blue-400 underline decoration-blue-900 underline-offset-4 transition hover:text-blue-200"
                  >
                    {option.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <HackathonInquiryForm
          key={selectedHackathonRole}
          selectedRole={selectedHackathonRole}
          onRoleChange={setSelectedHackathonRole}
        />
      </Section>

      {/* Programs section */}
      <Section id="programs" className="bg-slate-900">
        <SectionHeader
          title="Programs with workshop energy."
          description="Gear Up supports the systems students need to run events, teach workshops, build robotics projects, and keep youth-led technology work moving."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
        </motion.div>
      </Section>

      {/* Sponsor section */}
      <Section id="sponsor" className="bg-slate-950">
        <div className="mb-12 grid gap-8 border-b border-slate-800 pb-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-blue-400">Sponsor support</p>
            <h2 className="mt-4 text-3xl font-black text-slate-50 sm:text-4xl">Partners fund the parts students can&apos;t fake.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-slate-300">
              Sponsorship turns student ambition into a real event budget: a place to meet, supplies
              to build with, mentors to learn from, and enough operational support to run the day well.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#hackathon">
                Sponsor the Hackathon
              </ButtonLink>
              <ButtonLink href={DONATION_URL} variant="secondary">
                Donate via HCB
              </ButtonLink>
            </div>
          </div>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {fundingItems.map((item) => (
            <FundingItem key={item.title} {...item} />
          ))}
        </motion.div>
      </Section>

      {/* HCB donation trust section */}
      <Section className="border-y border-slate-800 bg-slate-900">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-blue-400">HCB donation trust</p>
            <h2 className="mt-4 text-3xl font-black text-slate-50 sm:text-4xl">Transparent, accountable, student-led.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Donations are processed through HCB, Hack Club&apos;s fiscal sponsorship platform.
            </p>
            <ButtonLink href={DONATION_URL} className="mt-7">
              Donate via HCB <HeartHandshake className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              ['Donations received', CircleDollarSign],
              ['Managed by HCB', ShieldCheck],
              ['Allocated to programs', CheckSquare],
              ['Builders get support', Rocket],
            ].map(([label, Icon], index) => (
              <div key={label as string} className="relative rounded-lg border border-slate-700 bg-slate-800 p-5 text-center shadow-sm">
                {index < 3 && <ChevronRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-blue-700 sm:block" />}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-950/50 text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-bold text-slate-200">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Initiatives section */}
      <Section className="bg-slate-950">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <SectionHeader
              align="left"
              title="Student-led initiatives with real operating systems."
              description="The foundation is not just a homepage. It is a structure for students to coordinate events, teach workshops, support projects, and communicate responsibly with families, schools, mentors, and sponsors."
            />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {initiativeCards.map((initiative) => (
                <ProgramRow key={initiative.title} {...initiative} />
              ))}
            </motion.div>
          </div>
          <div className="relative rounded-lg border border-slate-700 bg-slate-900 p-6 shadow-sm">
            <div className="absolute -right-8 -top-8 hidden h-28 w-28 rounded-full border-[18px] border-blue-900/40 lg:block" />
            <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-blue-400">Builder notebook</p>
            <div className="mt-8 space-y-5 font-mono text-2xl font-bold leading-relaxed text-slate-100">
              <p>Big ideas.</p>
              <p>Real impact.</p>
              <p>Built by students.</p>
            </div>
            <div className="mt-10 rounded-md border border-dashed border-slate-700 bg-slate-800 p-4 text-sm leading-6 text-slate-400">
              Notes, checklists, build plans, sponsor emails, workshop outlines, and project launches
              all belong in the same student-run system.
            </div>
          </div>
        </div>
      </Section>

      {/* Impact section */}
      <Section id="impact" className="bg-slate-900">
        <SectionHeader
          title="Impact we can stand behind."
          description="Gear Up is building sponsor-ready reporting around real programs, clear budgets, student leadership, and practical outcomes. No inflated numbers."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['Flagship event', 'Hackathon campaign in development for middle and high school students.'],
            ['Local focus', 'Programming centered on North Carolina students, families, schools, and sponsors.'],
            ['Responsible reporting', 'Impact updates will follow official program activity instead of invented metrics.'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
              <h3 className="text-xl font-black text-slate-50">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Team section */}
      <Section id="team" className="bg-slate-950">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-blue-400">
              About the founders
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-slate-50 sm:text-5xl">
              Founded by student builders.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Gear Up Foundation was started by students in North Carolina who wanted to make
              hands-on technology programs more practical, accessible, and real.
            </p>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Akshayraj Sanjai, Shresh Panda, and Noah Lee founded Gear Up Foundation to create
              student-led infrastructure for hackathons, robotics programs, STEAM workshops,
              sponsor-supported resources, and youth-led technology projects.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >
            <div className="grid gap-6 sm:grid-cols-3">
              {founders.map((founder) => (
                founder && (
                  <div key={founder.id}>
                    <div className="aspect-[3/4] overflow-hidden rounded-md bg-slate-800">
                      <img
                        src={founder.image}
                        alt={founder.alt || founder.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-black text-slate-50">{founder.name}</h3>
                    <p className="mt-1 text-sm font-bold text-blue-400">Co-Founder</p>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA section */}
      <Section className="bg-slate-900">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-blue-400">Back the build</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-slate-50 sm:text-5xl">
              Help students turn plans into programs.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Fund the venues, tools, meals, workshops, hardware, and operating support behind a
              serious student-led innovation nonprofit.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href={DONATION_URL}>
              Donate via HCB
            </ButtonLink>
            <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Sponsor%20a%20Gear%20Up%20Hackathon`} variant="secondary">
              Sponsor a Hackathon
            </ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              Join the Community
            </ButtonLink>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
