
const Section = ({ title, children }) =>
  children ? (
    <div className="mb-5">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-navy-600">{title}</h2>
      <div className="h-px w-full bg-ink-800/10" />
      <div className="mt-3">{children}</div>
    </div>
  ) : null;

const MinimalTemplate = ({ data }) => {
  const { personalInfo = {}, education = [], experience = [], projects = [], skills = [], certifications = [] } = data;

  return (
    <div className="min-h-[1123px] w-[794px] bg-white p-14 font-body text-[13px] leading-relaxed text-ink500">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink500">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="mt-2 text-xs text-ink500/60">
          {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-1 text-xs text-ink500/60">
          {[personalInfo.linkedin, personalInfo.github, personalInfo.portfolio].filter(Boolean).join(" · ")}
        </p>
      </header>

      {personalInfo.summary && (
        <Section title="Summary">
          <p>{personalInfo.summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          <div className="flex flex-col gap-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <p className="font-medium">{exp.role} · {exp.company}</p>
                  <p className="text-xs text-ink500/50">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                {exp.description && <p className="mt-1 whitespace-pre-line text-ink500/80">{exp.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          <div className="flex flex-col gap-4">
            {projects.map((proj, i) => (
              <div key={i}>
                <p className="font-medium">
                  {proj.title}
                  {proj.techStack?.length > 0 && (
                    <span className="font-normal text-ink500/50"> — {proj.techStack.join(", ")}</span>
                  )}
                </p>
                {proj.description && <p className="mt-1 text-ink500/80">{proj.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          <div className="flex flex-col gap-3">
            {education.map((edu, i) => (
              <div key={i} className="flex items-baseline justify-between">
                <div>
                  <p className="font-medium">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}</p>
                  <p className="text-ink500/60">{edu.institution}</p>
                </div>
                <p className="text-xs text-ink500/50">{edu.startYear} – {edu.endYear}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <p className="text-ink500/80">{skills.join(" · ")}</p>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          <p className="text-ink500/80">{certifications.join(" · ")}</p>
        </Section>
      )}
    </div>
  );
};

export default MinimalTemplate;
