import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Resume = () => {
  const router = useRouter();
  const { resumeID } = router.query;

  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      if (resumeID) {
        try {
          const response = await fetch(`http://localhost:8787/resume?resumeID=${resumeID}`);
          if (!response.ok) return (console.error("Failed to fetch resume:", response.statusText));
          const data = await response.json();
          setResume(data);
        } catch (error) {
          console.error("Error fetching resume:", error);
        }
      }
    };

    fetchResume();
  }, [resumeID]);

  if (!resume) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400 text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl mx-auto bg-[#424242] shadow-md rounded-lg p-8 border border-gray-600">
        
        <div className="text-center border-b border-gray-600 pb-6 mb-8">
          <h1 className="text-4xl font-bold">{resume.name}</h1>
          <p className="mt-4 text-gray-400">{resume.summary}</p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <div className="space-y-2 text-gray-400">
            {resume.contact?.email && <p><span className="font-semibold text-[var(--foreground)]">Email:</span> {resume.contact.email}</p>}
            {resume.contact?.phone && <p><span className="font-semibold text-[var(--foreground)]">Phone:</span> {resume.contact.phone}</p>}
            {resume.contact?.address && <p><span className="font-semibold text-[var(--foreground)]">Address:</span> {resume.contact.address}</p>}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills?.map((skill, index) => (
              <span key={index} className="bg-gray-600 text-gray-200 px-3 py-1 rounded-full text-sm">{skill}</span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-6">
            {resume.experience?.map((exp, index) => (
              <div key={index} className="border-l-4 border-gray-500 pl-4">
                <h3 className="text-xl font-semibold">{exp.job_title}</h3>
                <p className="text-gray-400">{exp.company}</p>
                <p className="text-gray-500 text-sm mb-2">{exp.start_date} - {exp.end_date}</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <div className="space-y-6">
            {resume.education?.map((ed, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold">{ed.degree}</h3>
                <p className="text-gray-400">{ed.institution}</p>
                <p className="text-gray-400 text-sm">Graduated: {ed.graduation_year}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Resume;
