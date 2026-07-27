const ClassicTemplate = ({ data }) => {
  const { personalInfo = {}, education = [], experience = [], projects = [], skills = [], certifications = [] } = data;

  return (
    <div className="min-h-[1123px] w-[794px] bg-white p-14 font-body text-[13px] leading-relaxed text-ink500">
      <header className="mb-6 border-b-2 border-ink500 pb-5 text-center">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-ink500">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="mt-2 text-xs text-ink500/70">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </header>

      {personalInfo.summary && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold uppercase text-ink500">Professional Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold uppercase text-ink500">Experience</h2>
          <div className="flex flex-col gap-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold">{exp.role}, {exp.company}</p>
                  <p className="text-xs italic text-ink500/60">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                {exp.description && <p className="mt-1 whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold uppercase text-ink500">Education</h2>
          <div className="flex flex-col gap-3">
            {education.map((edu, i) => (
              <div key={i} className="flex items-baseline justify-between">
                <p className="font-semibold">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}, {edu.institution}</p>
                <p className="text-xs italic text-ink500/60">{edu.startYear} – {edu.endYear}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold uppercase text-ink500">Projects</h2>
          <div className="flex flex-col gap-3">
            {projects.map((proj, i) => (
              <div key={i}>
                <p className="font-semibold">
                  {proj.title}
                  {proj.techStack?.length > 0 && (
                    <span className="font-normal italic"> ({proj.techStack.join(", ")})</span>
                  )}
                </p>
                {proj.description && <p className="mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold uppercase text-ink500">Skills</h2>
          <p>{skills.join(", ")}</p>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-bold uppercase text-ink500">Certifications</h2>
          <p>{certifications.join(", ")}</p>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
