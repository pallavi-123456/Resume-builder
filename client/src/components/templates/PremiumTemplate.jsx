import {
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Award,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Wrench,
} from "lucide-react";
const PremiumTemplate = ({ data }) => {
  const {
    personalInfo = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    achievements = [],
  } = data;


  return (
    <div className="bg-[#F8F3E8] min-h-[1123px] w-[794px] p-10 text-gray-800">

      {/* Header */}
      <div className="grid grid-cols-3 gap-8 pt-8">

        {/* Left */}
        <div>
          <h1 className="text-3xl uppercase tracking-[0.25em] leading-none font-extralight text-gray-800">
            {personalInfo.fullName||"YOUR NAME"}
         </h1>

          <p className="mt-6 text-sm leading-7 text-gray-600">
            {personalInfo.summary ||
              "Write a short professional summary about yourself here."}
          </p>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center mt-8">

         <div className="w-40 h-40 rounded-t-full overflow-hidden border-4 border-white shadow-lg bg-blue-100">

            {personalInfo.profileImage ? (
              <img
                src={personalInfo.profileImage}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Profile Photo
              </div>
            )}

          </div>

        <div className="relative mt-4">
        <div className="bottom-2 right-4 -top-12 left-20 rotate-12 border border-gray-500 rounded-full px-6 py-2">
        <p className="text-xs tracking-widest uppercase text-gray-700">
      {personalInfo.title || "Software Developer"}
    </p>
  </div>

  <h2 className="text-2xl tracking-[0.25em] uppercase">
    {personalInfo.fullName}
  </h2>
</div>

        </div>

        {/* Right */}
        <div>

          <h2 className="text-2xl font-semibold uppercase mb-6">
            Contact
          </h2>

          <div className="space-y-4 text-sm">

  <div className="flex items-center gap-3">
    <Phone size={16} className="text-blue-700" />
    <span>{personalInfo.phone}</span>
  </div>

  <div className="flex items-center gap-3">
    <Mail size={16} className="text-blue-700" />
    <span>{personalInfo.email}</span>
  </div>

  <div className="flex items-center gap-3">
    <MapPin size={16} className="text-blue-700" />
    <span>{personalInfo.location}</span>
  </div>

  <div className="flex items-center gap-3">
    <Linkedin size={16} className="text-blue-700" />
    <span>{personalInfo.linkedin}</span>
  </div>

  <div className="flex items-center gap-3">
    <Github size={16} className="text-blue-700" />
    <span>{personalInfo.github}</span>
  </div>

</div>

        </div>

      </div>

      <hr className="my-10 border-gray-400" />
            {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-8">

        {/* Left Column */}
        <div>

          {/* Awards */}
          <section className="mb-10">
           <div className="flex items-center gap-3 border-l-4 border-blue-700 pl-3 mb-5">
  <Award size={20} className="text-blue-700" />
  <h2 className="text-xl uppercase tracking-[0.2em] font-bold">
    Awards
  </h2>
</div>

            {achievements.length > 0 ? (
              achievements.map((award, index) => (
                <div key={index} className="mb-5">
                  <h3 className="font-semibold">{award.title}</h3>
                  <p className="text-sm text-gray-600">
                    {award.organization}
                  </p>
                  <p className="text-sm mt-1">
                    {award.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No awards added.
              </p>
            )}
          </section>

          {/* Skills */}
          <section className="mb-10">
            <div className="flex items-center gap-3 border-l-4 border-blue-700 pl-3 mb-5">
  <Wrench size={20} className="text-blue-700" />
  <h2 className="text-xl uppercase tracking-[0.2em] font-bold">
    Skills
  </h2>
</div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-white border border-blue-200 shadow-sm text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

        </div>

        {/* Right Side */}
        <div className="col-span-2">

          {/* Experience */}
          <section className="mb-10">

            <div className="flex items-center gap-3 border-l-4 border-blue-700 pl-3 mb-5">
  <Briefcase size={20} className="text-blue-700" />
  <h2 className="text-xl uppercase tracking-[0.2em] font-bold">
    Work Experience
  </h2>
</div>
             

            {experience.map((exp, index) => (
              <div className="flex gap-5 mb-8">

  <div className="w-24">
    <div className="bg-gray-200 text-center text-xs py-1 rounded">
      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
    </div>
  </div>

  <div className="flex-1 border-l-2 border-gray-300 pl-5">
    <h3 className="font-bold">{exp.role}</h3>

    <p className="italic text-gray-600">
      {exp.company}
    </p>

    <p className="mt-2 text-sm whitespace-pre-line">
      {exp.description}
    </p>
  </div>

</div>
            ))}
          </section>

          {/* Education */}
          <section>
<div className="flex items-center gap-3 border-l-4 border-blue-700 pl-3 mb-5">
  <GraduationCap size={20} className="text-blue-700" />
  <h2 className="text-xl uppercase tracking-[0.2em] font-bold">
    Education
  </h2>
</div>

            {education.map((edu, index) => (

              <div key={index} className="mb-6">

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {edu.degree}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {edu.startYear} - {edu.endYear}
                  </span>

                </div>

                <p className="italic">
                  {edu.institution}
                </p>

                <p className="text-sm text-gray-600">
                  CGPA: {edu.cgpa}
                </p>

              </div>

            ))}

          </section>

        </div>

      </div>
          </div>
  );
};

export default PremiumTemplate;