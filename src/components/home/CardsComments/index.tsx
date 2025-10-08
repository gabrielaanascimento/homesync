/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "../../ui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Alice",
    username: "@alice",
    body: "Absolutely stunning work!",
    img: "https://a.storyblok.com/f/191576/1176x882/9bdc5d8400/round_profile_picture_hero_before.webp",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "Can't get enough of this!",
    img: "https://avatar.vercel.sh/bob",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => (
  <figure
    className={cn(
      "relative h-auto min-h-[150px] w-65 sm:w-70  cursor-pointer overflow-hidden rounded-xl border p-4",
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt="" src={img} />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium dark:text-white/40">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm">{body}</blockquote>
  </figure>
);

export function Marquee3D() {
  // Cria 5 colunas distribuindo os reviews
  const columns = Array.from({ length: 5 }, (_, i) =>
    reviews.map((_, index) => reviews[(index + i) % reviews.length])
  );

  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-between overflow-hidden [perspective:300px] gap-2">
      {columns.map((col, index) => (
        <Marquee
          key={index}
          pauseOnHover
          reverse={index % 2 === 0}
          className="flex w-full"
          vertical
          style={{ "--duration": "20s" } as React.CSSProperties}
        >
          {col.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      ))}

      {/* Gradientes nas bordas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
