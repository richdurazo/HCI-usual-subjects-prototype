import { useState } from 'react'
import { Button } from './ui/button'
import { Upload, Bookmark } from 'lucide-react'

export function LandingView({ onAnalyzeResume }) {
  const [resumeFile, setResumeFile] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      setResumeFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }



  const handleAnalyzeClick = () => {
    onAnalyzeResume()
  }

  return (
    <main className="flex-1 overflow-y-auto bg-gray-900">
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column - Job Posting */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Software Engineer, Web Platform</h2>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C5.24 0 3 2.24 3 5C3 8.5 8 16 8 16S13 8.5 13 5C13 2.24 10.76 0 8 0ZM8 6.5C7.17 6.5 6.5 5.83 6.5 5C6.5 4.17 7.17 3.5 8 3.5C8.83 3.5 9.5 4.17 9.5 5C9.5 5.83 8.83 6.5 8 6.5Z" fill="currentColor"/>
                </svg>
                Acme Corp
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C5.24 0 3 2.24 3 5C3 8.5 8 16 8 16S13 8.5 13 5C13 2.24 10.76 0 8 0ZM8 6.5C7.17 6.5 6.5 5.83 6.5 5C6.5 4.17 7.17 3.5 8 3.5C8.83 3.5 9.5 4.17 9.5 5C9.5 5.83 8.83 6.5 8 6.5Z" fill="currentColor"/>
                </svg>
                San Francisco, CA
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C5.24 0 3 2.24 3 5C3 8.5 8 16 8 16S13 8.5 13 5C13 2.24 10.76 0 8 0ZM8 6.5C7.17 6.5 6.5 5.83 6.5 5C6.5 4.17 7.17 3.5 8 3.5C8.83 3.5 9.5 4.17 9.5 5C9.5 5.83 8.83 6.5 8 6.5Z" fill="currentColor"/>
                </svg>
                Remote OK
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white">
              Apply Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Bookmark className="w-4 h-4" />
              Save Job
            </Button>
          </div>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">About the Role</h3>
            <p className="text-gray-300 leading-relaxed">
              We're looking for a Software Engineer to join our Web Platform team and help build modern, 
              scalable web applications using cutting-edge technologies like React, TypeScript, and GraphQL. 
              You'll work on products that impact millions of users and have the opportunity to shape the 
              future of our platform's quality and user experience.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Responsibilities</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span>Design and maintain React + TypeScript dashboards and data visualization tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span>Build and optimize GraphQL APIs and REST endpoints</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span>Collaborate cross-functionally to deliver features</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span>Develop Python scripts for data analysis, automation, and workflow optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span>Implement responsive, accessible UI components</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span>Participate in code reviews, technical design discussions, and sprint planning</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Required Skills</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#10B981"/>
                </svg>
                <span>Experience with React and modern JavaScript frameworks</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#10B981"/>
                </svg>
                <span>Strong understanding of TypeScript and type-safe development</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#10B981"/>
                </svg>
                <span>Experience with GraphQL and REST API integration</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#10B981"/>
                </svg>
                <span>Proficiency in Python for data analysis and automation</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#10B981"/>
                </svg>
                <span>Experience with data visualization and dashboard design</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#10B981"/>
                </svg>
                <span>Track record of delivering measurable business impact</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#10B981"/>
                </svg>
                <span>Demonstrated cross-functional collaboration skills</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Preferred Skills</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <circle cx="10" cy="10" r="9" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                </svg>
                <span>Experience with Next.js, Remix, or other modern React frameworks</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <circle cx="10" cy="10" r="9" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                </svg>
                <span>Familiarity with Tailwind CSS or CSS-in-JS solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <circle cx="10" cy="10" r="9" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                </svg>
                <span>Understanding of web performance optimization and accessibility standards</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <circle cx="10" cy="10" r="9" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                </svg>
                <span>Experience with testing frameworks (Jest, React Testing Library, Playwright)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                  <circle cx="10" cy="10" r="9" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                </svg>
                <span>Knowledge of CI/CD pipelines and DevOps practices</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Right Column - Resume Optimization */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">Optimize Your Resume</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Upload your resume to see how well it matches this job posting and get personalized 
              tailoring suggestions.
            </p>
            
            <div 
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-950/5 relative"
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label htmlFor="resume-upload" className="flex flex-col items-center gap-3 cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400" />
                <span className="text-base font-semibold text-white">Upload Resume</span>
                <span className="text-sm text-gray-400">PDF, DOC, or DOCX (max 5MB)</span>
              </label>
              {resumeFile && (
                <div className="mt-4 p-3 bg-green-950/20 border border-green-800 rounded text-sm text-green-400">
                  ✓ {resumeFile.name}
                </div>
              )}

            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
              onClick={handleAnalyzeClick}
            >
              Analyze Resume
            </Button>

            <p className="text-xs text-gray-500 text-center">This is a sample job posting for prototyping.</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">About This Tool</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our AI-powered assistant analyzes your resume against the job requirements and provides 
              actionable suggestions to improve your match score and highlight relevant experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
