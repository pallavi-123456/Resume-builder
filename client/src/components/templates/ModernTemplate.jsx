const ModernTemplate = ({ data }) => {
  const { personalInfo = {}, education = [], experience = [], projects = [], skills = [], certifications = [] } = data;

  return (
    <div className="flex min-h-[1123px] w-[794px] bg-white font-body text-[13px] leading-relaxed text-ink500">
      <aside className="w-[260px] bg-navy-700 p-8 text-white">
        <h1 className="font-display text-2xl font-semibold leading-tight">
          {personalInfo.fullName || "Your Name"}
        </h1>

        <div className="mt-6 flex flex-col gap-1.5 text-xs text-white/70">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.linkedin && <p className="truncate">{personalInfo.linkedin}</p>}
          {personalInfo.github && <p className="truncate">{personalInfo.github}</p>}
          {personalInfo.portfolio && <p className="truncate">{personalInfo.portfolio}</p>}
        </div>

        {skills.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-300">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span key={i} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-300">Education</h2>
            <div className="flex flex-col gap-3">
              {education.map((edu, i) => (
                <div key={i}>
                  <p className="text-xs font-medium">{edu.degree}</p>
                  <p className="text-[11px] text-white/60">{edu.institution}</p>
                  <p className="text-[11px] text-white/50">{edu.startYear} – {edu.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-300">Certifications</h2>
            <div className="flex flex-col gap-1.5 text-[11px] text-white/70">
              {certifications.map((cert, i) => (
                <p key={i}>{cert}</p>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 p-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-navy-600">Summary</h2>
            <p className="text-ink500/80">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-navy-600">Experience</h2>
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
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-navy-600">Projects</h2>
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
          </div>
        )}
      </main>
    </div>
  );
};

export default ModernTemplate;
