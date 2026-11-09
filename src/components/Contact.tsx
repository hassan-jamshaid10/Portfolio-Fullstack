"use client";

import Image from "next/image";
import { showToast } from "@/components/portfolio/Shell";
import { Magnetic } from "@/components/portfolio/Magnetic";
import { site } from "@/content/site";
import { copyText } from "@/lib/motion";

const words = site.contact.title.split(" ");

async function onEmailClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const ok = await copyText(site.email);
  showToast(ok ? "Email copied" : site.email);
}

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="mono" data-scramble data-text="/ Contact">
        / Contact
      </div>
      <h2>
        {words.map((word, index) => (
          <span className="word" key={`${word}-${index}`}>
            <span>
              {word}
              {index < words.length - 1 ? "\u00a0" : ""}
            </span>
          </span>
        ))}
      </h2>
      <p className="intro">{site.contact.body}</p>
      <a className="mail" href={`mailto:${site.email}`} onClick={onEmailClick}>
        {site.email} ↗
      </a>
      <div>
        <a className="phone-line" href={site.phoneHref}>
          {site.phone}
        </a>
      </div>
      <div className="row2">
        <Magnetic>
          <a className="btn ghost" href={site.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </Magnetic>
        <Magnetic>
          <a className="btn ghost" href={site.social.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </Magnetic>
        <Magnetic>
          <a className="btn solid" href={site.resumeUrl} download>
            Resume ↓
          </a>
        </Magnetic>
      </div>
      <Image
        className="cameo"
        src="/media/hassan-figure.webp"
        alt=""
        width={864}
        height={1152}
        sizes="280px"
        aria-hidden
      />
    </section>
  );
}
