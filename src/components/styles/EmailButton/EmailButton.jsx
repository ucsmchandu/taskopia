import React from 'react';

const EmailButton = ({text}) => {
  return (
    <div
      className="mt-10 group cursor-pointer relative inline-flex items-center justify-center w-full h-10 lg:h-11 sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[260px] rounded-xl font-semibold text-white text-base leading-none -tracking-[0.02em] outline outline-white/10 hover:outline-white/20 transition-all duration-500 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-blue-400/50 max-w-[300px]"
    >
      {/* Background layers */}
      <span
        className="absolute -inset-px h-full w-full overflow-hidden rounded-xl"
        aria-hidden="true"
        style={{ opacity: 1 }}
      >
        <span
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(140deg, rgba(15,15,17,1) 0%, rgba(30,30,33,1) 35%, rgba(45,45,50,1) 70%, rgba(20,20,22,1) 100%)',
          }}
        ></span>

        <span className="absolute -top-[52px] right-1 size-20 rounded-full bg-blue-400 opacity-15 mix-blend-lighten blur-[35px]"></span>
        <span className="absolute top-0 right-1 h-[28px] w-20 rounded-full bg-blue-300 opacity-20 mix-blend-lighten blur-[25px]"></span>
        <span className="absolute -bottom-[42px] -left-[19px] size-20 rounded-full bg-purple-400 opacity-10 mix-blend-lighten blur-[40px]"></span>

        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/15 opacity-0 skew-x-12 blur-sm transition-all duration-700 group-hover:opacity-30 group-hover:translate-x-[220%]"></span>
        </span>

        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15"></span>
      </span>

      {/* Border blur layer */}
      <span className="absolute top-0 left-0 z-20 h-full w-full blur-[1px]" aria-hidden="true">
        <span
          className="absolute -top-px -left-px z-20 h-full w-full rounded-xl"
          style={{
            boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.12)',
          }}
        ></span>
      </span>

      {/* Text */}
      <span className="relative z-10 flex items-center gap-1.5 text-[16px] leading-none font-normal -tracking-[0.04em] lg:text-base text-white/95 px-4">
        {text}
      </span>

      {/* Hover ring effect */}
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-blue-400/0 transition-[ring,opacity] duration-500 group-hover:ring-4 group-hover:opacity-25"></span>
    </div>
  );
};

export default EmailButton;
