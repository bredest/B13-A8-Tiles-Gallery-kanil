export default function MarqueeText({ items }) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="marquee-outer bg-primary/10 border-y border-primary/20 py-3 select-none">
      <div className="flex animate-marquee gap-0 w-max">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-6 pr-6">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase whitespace-nowrap">
              {item}
            </span>
            <span className="text-primary/40 text-lg">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
