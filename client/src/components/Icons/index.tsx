import Test, {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Mastodon,
  Threads,
  Instagram,
  Question,
  Account,
  About,
  Community,
  Course,
  App,
  CloseBox,
  Tick,
  QuestionNoBox,
  Exit,
  Heart,
  HeartFill,
} from "./icons";

const componentsSocialIcons = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
};

//add the new icon which is defined in ./icons
const components = {
  question: Question,
  account: Account,
  about: About,
  community: Community,
  course: Course,
  exam: Test,
  app: App,
  closebox: CloseBox,
  tick: Tick,
  questionnobox: QuestionNoBox,
  exit: Exit,
  heart: Heart,
  heartfill: HeartFill,
};

type SocialIconProps = {
  kind: keyof typeof componentsSocialIcons;
  href: string | undefined;
  size?: number;
};

type Icons = {
  kind: keyof typeof components;
  href?: string | undefined;
  size?: number;
  color?: string;
};

export const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === "mail" &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null;

  const SocialSvg = componentsSocialIcons[kind];

  return (
    <a
      className="text-sm transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current hover:text-primary-500 h-${size} w-${size}`}
      />
    </a>
  );
};

export const Icon = ({ kind, href, size = 12, color }: Icons) => {
  const IconSvg = components[kind];
  return (
    <IconSvg
      className={`fill-current`}
      height={size}
      width={size}
      color={color}
    />
  );
};
