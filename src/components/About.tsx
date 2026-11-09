import Image from "next/image";
import { site } from "@/content/site";

const portraitBlur =
  "data:image/webp;base64,UklGRlABAABXRUJQVlA4WAoAAAAQAAAADwAAFAAAQUxQSKMAAAABgCPbtirl/fbIos4ah1G45ZC655C7Zx6REncxCwZgolsE2vu9dw527y+GEBETYP43OXO02hGm54mkvUgq8VuKV8oY5WZKmlCYk/JNZUmKOmVFMkXpLa8UHoVDo08KlyHWBe4E0riXeD0UGJM+rjHkQzD7CaoAWKTuHbx3z39gSTaa3rn6GknAgyxV69bXewWQLDetQzVtqTasA8rmhpA8AJQAAFZQOCCGAAAAcAQAnQEqEAAVAD7tYqlNqaWjojAIATAdiWMArCDYoLsYkLu3sAQGJ8G+uAAA/uv7d25GzO5sZNVTBvV46dm1egzxe2frbHv7rmLWtHjDL4zkTkAxrJKD6YWoW60r3tPf4UPv1vdWT9tgwXxe8BCvg5P+TYJj1A2ooNsneOxK7nD20K3odAA=";

export function About() {
  return (
    <section className="section" id="about">
      <div className="section-inner about-grid">
        <div className="pcol">
          <figure className="efig">
            <div className="halo" aria-hidden="true" />
            <Image
              className="about-portrait"
              src="/media/hassan-portrait.webp"
              alt="Portrait of Hassan Jamshaid"
              width={864}
              height={1152}
              sizes="(max-width: 980px) 90vw, 480px"
              quality={78}
              placeholder="blur"
              blurDataURL={portraitBlur}
            />
            <div className="shade" />
            <figcaption className="cap">
              <div>
                <b>Hassan Jamshaid</b>
                <div className="mono">Software Engineer | Full-Stack</div>
              </div>
              <div className="live">
                <span className="dot" />
                Available
              </div>
            </figcaption>
          </figure>
          <div className="fignote">
            <span className="mono">Fig. 01 — Portrait</span>
            <span className="mono">Lahore · Remote</span>
          </div>
        </div>
        <div className="about-copy" data-reveal>
          <div className="mono" data-scramble data-text={site.about.eyebrow}>
            {site.about.eyebrow}
          </div>
          <h3>
            Software engineer.
            <br />
            Products people use.
          </h3>
          {site.about.paragraphs.map((paragraph) => (
            <p className="body-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <div className="hl">
            {site.about.highlights.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
