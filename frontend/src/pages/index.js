// pages/index.js

import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [resumeInfo, setResumeInfo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8787/resume_info')
      .then(response => {
        console.log(response.data);
        setResumeInfo(response.data || []);
      })
      .catch(error => {
        console.error('Failed to fetch resume info:', error);
      });
  }, []);

  const resumeLength = resumeInfo.resumeLength || 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-2">Welcome to the Home Page</h1>
        <p className="text-2xl text-center">This is the main page of our application</p>
      </header>

      <main className="flex flex-col items-center gap-4">
        {resumeLength > 0 ? (
          Array.from({ length: resumeLength }, (_, index) => (
            <Link key={index} href={`/resume?resumeID=${index + 1}`}>
              <button class="inline-flex h-12 items-center justify-center rounded-md bg-neutral-600 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95">
                Resume {index + 1}
              </button>
            </Link>
          ))
        ) : (
          <p>Loading resumes...</p>
        )}
      </main>
    </div>
  );
}
