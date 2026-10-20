import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    "aria-hidden": true,
    focusable: false,
    ...props,
  } as SVGProps<SVGSVGElement>;
}

/*
  Icons repeated across the page (WhatsApp ×30, stars, arrows…) live once in
  <IconSprite /> (rendered in the layout) and are drawn with <use>, so their
  paths are not repeated in the HTML and the RSC payload.
*/
const SPRITE: Record<string, string> = {
  "whatsapp": "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z",
  "phone": "M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z",
  "arrow-right": "M13.06 4.94a1.5 1.5 0 0 1 2.12 0l6 6a1.5 1.5 0 0 1 0 2.12l-6 6a1.5 1.5 0 0 1-2.12-2.12l3.44-3.44H4a1.5 1.5 0 0 1 0-3h12.5l-3.44-3.44a1.5 1.5 0 0 1 0-2.12Z",
  "arrow-up-right": "M8 5.5A1.5 1.5 0 0 1 9.5 4h9A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-3 0V9.12l-9.94 9.94a1.5 1.5 0 0 1-2.12-2.12L14.88 7H9.5A1.5 1.5 0 0 1 8 5.5Z",
  "star": "M12 2.5l2.94 6.1 6.56.75-4.87 4.53 1.3 6.62L12 17.2l-5.93 3.3 1.3-6.62L2.5 9.35l6.56-.75L12 2.5Z",
  "tiktok": "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.37-2.48V9.66a5.73 5.73 0 0 0-.77-.05A5.68 5.68 0 0 0 4.18 15.3 5.68 5.68 0 0 0 9.86 21a5.68 5.68 0 0 0 5.68-5.69V9.01a7.33 7.33 0 0 0 4.28 1.37V7.29a4.28 4.28 0 0 1-3.22-1.47Z",
  "facebook": "M13.5 21v-7.5h2.53l.38-2.94H13.5V8.68c0-.85.24-1.43 1.46-1.43h1.55V4.62a20.6 20.6 0 0 0-2.26-.12c-2.24 0-3.77 1.37-3.77 3.88v2.18H7.95v2.94h2.53V21h3.02Z",
};

export function IconSprite() {
  return (
    <svg aria-hidden width="0" height="0" focusable={false} style={{ position: "absolute" }}>
      {Object.entries(SPRITE).map(([id, d]) => (
        <symbol key={id} id={`i-${id}`} viewBox="0 0 24 24">
          <path d={d} />
        </symbol>
      ))}
    </svg>
  );
}

function SpriteIcon({ id, ...props }: IconProps & { id: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <use href={`#i-${id}`} />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return <SpriteIcon id="whatsapp" {...props} />;
}

export function PhoneIcon(props: IconProps) {
  return <SpriteIcon id="phone" {...props} />;
}

export function ArrowRightIcon(props: IconProps) {
  return <SpriteIcon id="arrow-right" {...props} />;
}

export function ArrowUpRightIcon(props: IconProps) {
  return <SpriteIcon id="arrow-up-right" {...props} />;
}

export function StarIcon(props: IconProps) {
  return <SpriteIcon id="star" {...props} />;
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5a1 1 0 1 0-2 0v5.5c0 .35.18.67.48.85l3.5 2.1a1 1 0 1 0 1.03-1.71L13 11.93V7Z" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3 5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h.18a3 3 0 0 0 5.64 0h6.36a3 3 0 0 0 5.64 0H22a1 1 0 0 0 1-1v-4.38a1 1 0 0 0-.2-.6l-2.7-3.62A1 1 0 0 0 19.3 8H16V7a2 2 0 0 0-2-2H3Zm13 5v3h5l-2.24-3H16ZM6 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

export function CashIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3Zm9 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5 9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Zm14 0a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Z" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...base(props)}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return <SpriteIcon id="tiktok" {...props} />;
}

export function FacebookIcon(props: IconProps) {
  return <SpriteIcon id="facebook" {...props} />;
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm4.2 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.25-3.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
    </svg>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(props)}>
      <path fill="#4285F4" d="M21.6 12.23c0-.68-.06-1.36-.18-2.02H12v3.83h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.33Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.43l-3.24-2.5c-.9.6-2.04.95-3.39.95-2.6 0-4.81-1.76-5.6-4.12H3.06v2.58A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC04" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.06a10 10 0 0 0 0 8.96L6.4 13.9Z" />
      <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.52L6.4 10.1C7.19 7.74 9.4 5.98 12 5.98Z" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path d="M12 2c.6 4.7 2.3 7.4 10 10-7.7 2.6-9.4 5.3-10 10-.6-4.7-2.3-7.4-10-10 7.7-2.6 9.4-5.3 10-10Z" />
    </svg>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path fillRule="evenodd" clipRule="evenodd" d="M7 3a1 1 0 0 0-1 1v1H4a1 1 0 0 0-1 1v1.5a4.5 4.5 0 0 0 3.6 4.41A6 6 0 0 0 11 15.92V19H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-3.08a6 6 0 0 0 4.4-4.01A4.5 4.5 0 0 0 21 7.5V6a1 1 0 0 0-1-1h-2V4a1 1 0 0 0-1-1H7ZM6 7v2.82A2.5 2.5 0 0 1 5 7.5V7h1Zm12 0h1v.5a2.5 2.5 0 0 1-1 2.32V7Z" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4 3a2 2 0 0 0-2 2v15.5a.5.5 0 0 0 .82.38L7.4 17H20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4Zm4 6a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Zm0 3.5a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H8Z" />
    </svg>
  );
}

export function BowlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path d="M9.5 3a1 1 0 0 1 1 1c0 .8-.3 1.3-.5 1.64-.17.29-.25.43-.25.86a1 1 0 1 1-2 0c0-.97.3-1.47.52-1.86.15-.25.23-.39.23-.64a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1c0 .8-.3 1.3-.5 1.64-.17.29-.25.43-.25.86a1 1 0 1 1-2 0c0-.97.3-1.47.52-1.86.15-.25.23-.39.23-.64a1 1 0 0 1 1-1ZM3 10a1 1 0 0 0-1 1 10 10 0 0 0 20 0 1 1 0 0 0-1-1H3Z" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.5 3a7.5 7.5 0 1 0 4.55 13.46l4.24 4.25a1 1 0 0 0 1.42-1.42l-4.25-4.24A7.5 7.5 0 0 0 10.5 3ZM5 10.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path d="M12 4a1.5 1.5 0 0 1 1.5 1.5v5h5a1.5 1.5 0 0 1 0 3h-5v5a1.5 1.5 0 0 1-3 0v-5h-5a1.5 1.5 0 0 1 0-3h5v-5A1.5 1.5 0 0 1 12 4Z" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path d="M4 12a1.5 1.5 0 0 1 1.5-1.5h13a1.5 1.5 0 0 1 0 3h-13A1.5 1.5 0 0 1 4 12Z" />
    </svg>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path d="M3.4 20.4 21.1 12.8a.9.9 0 0 0 0-1.6L3.4 3.6a.9.9 0 0 0-1.25 1.03L4 11l9 1-9 1-1.85 6.37a.9.9 0 0 0 1.25 1.03Z" />
    </svg>
  );
}

export function CheckDoubleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 12" fill="currentColor" {...base(props)}>
      <path d="M12.6.3a.9.9 0 0 1 .1 1.27l-6.2 7.3a.9.9 0 0 1-1.33.06L1.95 5.7a.9.9 0 1 1 1.27-1.27l2.52 2.52 5.6-6.56A.9.9 0 0 1 12.6.3Zm4.1 0a.9.9 0 0 1 .1 1.27l-6.2 7.3a.9.9 0 0 1-1.33.06l-.6-.6a.9.9 0 0 1 1.17-1.36l5.6-6.56A.9.9 0 0 1 16.7.3Z" />
    </svg>
  );
}
