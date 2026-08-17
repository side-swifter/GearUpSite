import { ChangeEvent, FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Award,
  Bot,
  CalendarClock,
  Code2,
  Cpu,
  MapPin,
  MonitorSmartphone,
  Palette,
  ShieldCheck,
  Smartphone,
  Trophy,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = 'team@gear-up-foundation.org';

type AwardItem = {
  title: string;
  group: string;
  icon: typeof Trophy;
  featured?: boolean;
};

type HackathonSignupData = {
  teamName: string;
  captainEmail: string;
  school: string;
  teamSize: string;
  track: string;
  message: string;
};

const awards: AwardItem[] = [
  { title: '1st place', group: 'Overall', icon: Trophy, featured: true },
  { title: '2nd place', group: 'Overall', icon: Trophy, featured: true },
  { title: '3rd place', group: 'Overall', icon: Trophy, featured: true },
  { title: '4th place', group: 'Overall', icon: Trophy, featured: true },
  { title: '5th place', group: 'Overall', icon: Trophy, featured: true },
  { title: 'Best AI/ML', group: 'Technical track', icon: Bot },
  { title: 'AI/ML runner-up', group: 'Technical track', icon: Bot },
  { title: 'Best cyber security', group: 'Security track', icon: ShieldCheck },
  { title: 'Cyber security runner-up', group: 'Security track', icon: ShieldCheck },
  { title: 'Best web app', group: 'Build track', icon: Code2 },
  { title: 'Web app runner-up', group: 'Build track', icon: Code2 },
  { title: 'Best phone app', group: 'Mobile track', icon: Smartphone },
  { title: 'Phone app runner-up', group: 'Mobile track', icon: Smartphone },
  { title: 'Best newcomer', group: 'Beginner track', icon: Users },
  { title: 'Best UI/UX design', group: 'Design track', icon: Palette },
];

const tbdItems = [
  { label: 'Date', value: 'TBD', icon: CalendarClock },
  { label: 'Location', value: 'TBD', icon: MapPin },
  { label: 'Registration', value: 'TBD', icon: Users },
  { label: 'Schedule', value: 'TBD', icon: Cpu },
];

const judgingNotes = [
  'Working demo or clear prototype',
  'Originality and problem choice',
  'Technical effort for the team level',
  'Presentation quality',
  'Design clarity and user experience',
];

const initialSignupData: HackathonSignupData = {
  teamName: '',
  captainEmail: '',
  school: '',
  teamSize: '',
  track: 'Not sure yet',
  message: '',
};

const PageSection = ({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) => (
  <section id={id} className={`relative scroll-mt-20 overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-28 ${className}`}>
    <div className="relative mx-auto max-w-7xl">{children}</div>
  </section>
);

const HeroVisual = () => (
  <div className="relative mx-auto min-h-[350px] w-full max-w-[620px] sm:min-h-[520px]">
    <div className="group absolute right-0 top-0 h-[250px] w-[84%] overflow-hidden bg-[#f4f0e7] shadow-[14px_14px_0_rgba(11,143,197,0.45)] sm:h-[410px] sm:shadow-[20px_20px_0_rgba(11,143,197,0.45)]">
      <img
        src="/kid-using-laptop.jpg"
        alt="Students working together on laptops during a technology program"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
    <div className="absolute bottom-7 left-0 z-10 w-[64%] border-[8px] border-[#14314a] bg-[#f4f0e7] p-4 text-[#14314a] shadow-[0_20px_42px_rgba(6,25,40,0.28)] sm:bottom-10 sm:border-[10px] sm:p-6">
      <MonitorSmartphone className="h-8 w-8 text-[#0b8fc5]" />
      <p className="mt-5 text-[clamp(1.5rem,4vw,2.6rem)] font-black leading-[0.98]">
        Apps, AI, design, and security in one student build day.
      </p>
    </div>
    <div className="absolute bottom-0 right-4 z-20 bg-[#f2643f] px-5 py-4 text-[#14314a] shadow-[10px_10px_0_rgba(6,25,40,0.25)]">
      <p className="text-sm font-black">Details TBD</p>
    </div>
  </div>
);

const AwardCard = ({ award, index }: { award: AwardItem; index: number }) => {
  const Icon = award.icon;
  return (
    <article
      className={`hackathon-award group flex min-h-[168px] flex-col justify-between border-2 border-[#14314a] p-5 transition hover:-translate-y-1 sm:min-h-[190px] sm:p-6 ${
        award.featured
          ? 'bg-[#14314a] text-white'
          : index % 3 === 0
            ? 'bg-[#d7edf5] text-[#14314a]'
            : index % 3 === 1
              ? 'bg-[#f4f0e7] text-[#14314a]'
              : 'bg-white text-[#14314a]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <Icon className={`h-7 w-7 ${award.featured ? 'text-[#8fd8ef]' : 'text-[#0b8fc5]'}`} />
        <span className={`text-xs font-black ${award.featured ? 'text-[#8fd8ef]' : 'text-[#0b8fc5]'}`}>
          {award.group}
        </span>
      </div>
      <h3 className="mt-8 text-[clamp(1.35rem,3vw,2.25rem)] font-black leading-[1]">{award.title}</h3>
    </article>
  );
};

const HackathonSignupForm = () => {
  const [formData, setFormData] = useState<HackathonSignupData>(initialSignupData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const inputClass =
    'mt-2 w-full border-2 border-[#14314a] bg-[#f4f0e7] px-3 py-3 text-base font-bold text-[#14314a] outline-none transition placeholder:text-[#557083] focus:border-[#0b8fc5] focus:ring-2 focus:ring-[#0b8fc5]';

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
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
          message: 'Your team intent is recorded. This is not final registration. We will send official registration details when they are ready.',
        });
        setFormData(initialSignupData);
      } else {
        setStatus({
          success: false,
          message: 'The intent form did not send. Please try again or email the team.',
        });
      }
    } catch (error) {
      console.error('Error sending hackathon team intent:', error);
      setStatus({
        success: false,
        message: 'The intent form did not send. Please try again or email the team.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      name="hackathon-team-intent"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/"
      onSubmit={handleSubmit}
      className="grid gap-5 border-2 border-[#14314a] bg-[#f4f0e7] p-5 text-[#14314a] shadow-[14px_14px_0_rgba(20,49,74,0.25)] sm:p-7 lg:p-8"
    >
      <input type="hidden" name="form-name" value="hackathon-team-intent" />
      <input type="text" name="bot-field" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="border-2 border-[#f2643f] bg-[#f2643f] px-4 py-3 text-sm font-black text-[#14314a]">
        This is an intent form, not official registration. Final rules, dates, and confirmed registration are TBD.
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-black">
          Team name *
          <input required name="teamName" value={formData.teamName} onChange={handleChange} className={inputClass} />
        </label>
        <label className="text-sm font-black">
          Captain email *
          <input required type="email" name="captainEmail" value={formData.captainEmail} onChange={handleChange} className={inputClass} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-black">
          School
          <input name="school" value={formData.school} onChange={handleChange} className={inputClass} />
        </label>
        <label className="text-sm font-black">
          Team size
          <input name="teamSize" value={formData.teamSize} onChange={handleChange} className={inputClass} placeholder="Example: 3 students" />
        </label>
      </div>
      <label className="text-sm font-black">
        Track *
        <select required name="track" value={formData.track} onChange={handleChange} className={inputClass}>
          <option>Not sure yet</option>
          <option>AI/ML</option>
          <option>Cyber security</option>
          <option>Web app</option>
          <option>Phone app</option>
          <option>UI/UX design</option>
          <option>Newcomer / first hackathon</option>
        </select>
      </label>
      <label className="text-sm font-black">
        Team notes
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Team members, rough project idea, track questions, or anything we should know."
          className={inputClass}
        />
      </label>
      {status && (
        <p className={`border-2 border-[#14314a] px-4 py-3 text-sm font-black ${status.success ? 'bg-[#d7edf5]' : 'bg-[#f2643f]'}`}>
          {status.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#14314a] bg-[#14314a] px-6 py-3 text-sm font-black text-white transition hover:bg-[#0b2236] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
      >
        {isSubmitting ? 'Sending...' : 'Register team intent'} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};

const Hackathon = () => {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scope = pageRef.current;
    if (!scope) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '.hackathon-award',
        { opacity: 0.7, y: 18, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.04,
          duration: 0.55,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.hackathon-awards-grid',
            start: 'top 78%',
          },
        }
      );
    }, scope);

    return () => context.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen overflow-x-hidden bg-[#14314a] text-[#14314a]">
      <section className="relative isolate overflow-hidden bg-[#f2643f] px-5 pb-14 pt-10 text-[#14314a] sm:px-8 sm:pb-20 lg:px-10 lg:pb-28 lg:pt-16">
        <div className="absolute inset-x-0 top-0 grid h-3 grid-cols-12" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} className={index % 2 === 0 ? 'bg-[#14314a]' : 'bg-[#f4f0e7]'} />
          ))}
        </div>
        <p className="pointer-events-none absolute -right-8 top-10 hidden text-[13vw] font-black leading-none text-[#14314a]/10 lg:block">
          HACKATHON
        </p>
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div>
            <p className="max-w-fit border-2 border-[#14314a] bg-[#14314a] px-3 py-2 text-xs font-black text-[#f4f0e7]">
              Team intent, not official registration
            </p>
            <h1 className="mt-6 max-w-6xl text-[clamp(3rem,7.4vw,6.35rem)] font-black leading-[0.92] tracking-normal text-[#14314a]">
              Gear Up Hackathon.
              Build, demo, compete.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg font-black leading-7 text-[#14314a] sm:text-2xl sm:leading-8">
              A student hackathon for web apps, phone apps, AI/ML, cyber security, design, and first-time builders.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#hackathon-team-intent"
                className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#14314a] bg-[#14314a] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b2236]"
              >
                Register team intent <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Sponsor%20Gear%20Up%20Hackathon%20Awards`}
                className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#14314a] bg-transparent px-6 py-3 text-sm font-black text-[#14314a] transition hover:-translate-y-0.5 hover:bg-[#14314a] hover:text-white"
              >
                Sponsors contact us
              </a>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <PageSection className="bg-[#14314a] text-white" id="hackathon-team-intent">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="max-w-fit border-2 border-[#f2643f] bg-[#f2643f] px-3 py-2 text-xs font-black text-[#14314a]">
              Team intent form
            </p>
            <h2 className="mt-5 max-w-2xl text-[clamp(2.35rem,5.7vw,5.5rem)] font-black leading-[0.94] text-[#f4f0e7]">
              Tell us your team and track.
            </h2>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-7 text-[#d7edf5]">
              This is not official registration. It helps us estimate teams, tracks, and demand before registration opens.
            </p>
            <div className="mt-7 border-2 border-[#f4f0e7] bg-[#0b2236] p-5 text-[#f4f0e7]">
              <p className="text-sm font-black text-[#8fd8ef]">Sponsors do not use this form.</p>
              <p className="mt-3 text-base font-semibold leading-6">
                Sponsorships, prizes, judges, mentors, and venue help should go through direct contact.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Sponsor%20Gear%20Up%20Hackathon`}
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 border-2 border-[#f2643f] bg-[#f2643f] px-5 py-2 text-sm font-black text-[#14314a] transition hover:bg-[#f4f0e7]"
              >
                Contact for sponsorship <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <HackathonSignupForm />
        </div>
      </PageSection>

      <PageSection className="bg-[#f4f0e7]">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Award className="h-10 w-10 text-[#0b8fc5]" />
            <h2 className="mt-5 max-w-xl text-[clamp(2.35rem,5.5vw,5.4rem)] font-black leading-[0.94]">
              Awards we are planning.
            </h2>
            <p className="mt-5 max-w-lg text-lg font-semibold leading-7 text-[#35546a]">
              The award list is set. Prize amounts, judges, sponsors, and exact rules are still TBD.
            </p>
          </div>

          <div className="hackathon-awards-grid grid grid-flow-dense gap-0 border-2 border-[#14314a] sm:grid-cols-2 xl:grid-cols-3">
            {awards.map((award, index) => (
              <AwardCard key={award.title} award={award} index={index} />
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection className="bg-[#d7edf5]">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <h2 className="max-w-3xl text-[clamp(2.25rem,5vw,5rem)] font-black leading-[0.96]">
              The structure is simple while the rest gets locked in.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-7 text-[#35546a]">
              Teams build a project, submit a demo, and present what they made. Final tracks and judging details will be published when registration opens.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {tbdItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="border-2 border-[#14314a] bg-[#14314a] p-5 text-white">
                  <Icon className="h-7 w-7 text-[#8fd8ef]" />
                  <p className="mt-6 text-sm font-black text-[#8fd8ef]">{item.label}</p>
                  <p className="mt-2 text-4xl font-black leading-none">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </PageSection>

      <PageSection className="bg-[#14314a] text-white">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="group overflow-hidden border-[8px] border-[#0b8fc5] bg-[#f4f0e7] shadow-[16px_16px_0_rgba(242,100,63,0.7)]">
            <img
              src="/kid-visual-programming.jpg"
              alt="Student using visual programming during a technology activity"
              className="aspect-[5/4] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div>
            <h2 className="max-w-3xl text-[clamp(2.35rem,5.8vw,5.5rem)] font-black leading-[0.94] text-[#f4f0e7]">
              Judging should reward real work, not just polish.
            </h2>
            <div className="mt-8 grid gap-3">
              {judgingNotes.map((note) => (
                <div key={note} className="flex items-center gap-4 border-2 border-[#0b8fc5] bg-[#0b2236] p-4">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-[#8fd8ef]" />
                  <p className="text-base font-black text-[#f4f0e7]">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection className="bg-[#f2643f]">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-[clamp(2.4rem,6vw,5.6rem)] font-black leading-[0.94] text-[#14314a]">
              Want to help shape the first Gear Up Hackathon?
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-7 text-[#14314a]">
              Teams can register intent here. Sponsors, judges, mentors, and local partners should contact us directly.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Gear%20Up%20Hackathon%20Interest`}
              className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#14314a] bg-[#14314a] px-6 py-3 text-sm font-black text-white transition hover:bg-[#0b2236]"
            >
              Contact the team <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center border-2 border-[#14314a] bg-transparent px-6 py-3 text-sm font-black text-[#14314a] transition hover:bg-[#14314a] hover:text-white"
            >
              Back to Gear Up
            </Link>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default Hackathon;
