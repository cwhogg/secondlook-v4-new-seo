'use client'

import { useState } from 'react'
import JsonLd from '@/components/content/JsonLd'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSubmitStatus('success')
        setEmail('')
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const organizationSchema = {
    '@type': 'Organization',
    name: 'SecondLook',
    description: 'AI-powered guidance for complex medical mysteries',
    url: 'https://secondlook.ai'
  }

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What to do if doctors can\'t diagnose you?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SecondLook provides AI-powered analysis of complex symptoms and medical records to help identify overlooked patterns and guide your next steps in the diagnostic process.'
        }
      },
      {
        '@type': 'Question', 
        name: 'Where to go when no one can diagnose you?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Consider specialized diagnostic centers, seek second opinions from experts in rare diseases, and use tools like SecondLook to organize your medical history and prepare compelling cases for specialists.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the hardest medical condition to diagnose?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rare diseases and complex multi-system conditions are often the most challenging to diagnose. SecondLook specializes in helping patients navigate these diagnostic odysseys with AI-powered pattern recognition.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can AI help with complex medical cases?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI can analyze patterns across vast amounts of medical data, identify rare disease pathways, and help organize symptoms in ways that reveal diagnostic clues that might be missed in traditional approaches.'
        }
      }
    ]
  }

  return (
    <>
      <JsonLd schema="Organization" data={organizationSchema} />
      <JsonLd schema="FAQPage" data={faqSchema} />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="badge animate-fade-in-up">Early Access</span>
              </div>
              
              <h1 className="text-hero text-primary mb-6 animate-fade-in-up animate-delay-100">
                When 5 doctors can't diagnose you, AI can help find the missing pieces
              </h1>
              
              <p className="text-body-lg text-secondary max-w-3xl mx-auto mb-8 animate-fade-in-up animate-delay-200">
                Professional-grade diagnostic analysis for patients with complex conditions who've hit dead ends. 
                Organize your medical history, identify overlooked patterns, and prepare for your next specialist appointment.
              </p>
              
              <div className="max-w-md mx-auto animate-fade-in-up animate-delay-300">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="input"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Joining...' : 'Join Early Access Waitlist'}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <p className="text-accent text-body-sm text-center">
                      ✓ You're on the list! We'll be in touch soon.
                    </p>
                  )}
                  
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-body-sm text-center">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="section bg-background-elevated">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-xl-heading text-primary mb-4">
                Your diagnostic journey deserves sophisticated analysis
              </h2>
              <p className="text-body text-secondary max-w-2xl mx-auto">
                Complex symptoms require sophisticated analysis—not generic symptom checkers built for common conditions.
              </p>
            </div>
            
            <div className="grid-auto-fit">
              <div className="card animate-fade-in-up">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg-heading text-primary mb-3">Medical Record Intelligence</h3>
                </div>
                <p className="text-body text-secondary">
                  Transform scattered test results and specialist notes into coherent diagnostic narratives that reveal overlooked patterns and guide next steps.
                </p>
              </div>
              
              <div className="card animate-fade-in-up animate-delay-100">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg-heading text-primary mb-3">Rare Disease Pathway Navigation</h3>
                </div>
                <p className="text-body text-secondary">
                  Specialized diagnostic trees trained on complex presentations, genetic testing sequences, and research trial eligibility for conditions others miss.
                </p>
              </div>
              
              <div className="card animate-fade-in-up animate-delay-200">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg-heading text-primary mb-3">Physician Communication Tools</h3>
                </div>
                <p className="text-body text-secondary">
                  Prepare compelling appointment scripts, translate symptoms into medical terminology, and document your case with clinical precision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl-heading text-primary text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <details className="card">
                  <summary className="text-lg-heading text-primary cursor-pointer mb-3">
                    What to do if doctors can't diagnose you?
                  </summary>
                  <p className="text-body text-secondary">
                    When traditional diagnostic pathways fail, methodical investigation often reveals patterns that were missed. 
                    SecondLook provides AI-powered analysis to help organize your symptoms, medical history, and test results 
                    in ways that can reveal diagnostic clues and guide your next steps.
                  </p>
                </details>
                
                <details className="card">
                  <summary className="text-lg-heading text-primary cursor-pointer mb-3">
                    Where to go when no one can diagnose you?
                  </summary>
                  <p className="text-body text-secondary">
                    Consider specialized diagnostic centers like Mayo Clinic, seek second opinions from experts in rare diseases, 
                    and prepare compelling cases with tools like SecondLook. Many patients find success by becoming more systematic 
                    in documenting their symptoms and preparing for specialist appointments.
                  </p>
                </details>
                
                <details className="card">
                  <summary className="text-lg-heading text-primary cursor-pointer mb-3">
                    What is the hardest medical condition to diagnose?
                  </summary>
                  <p className="text-body text-secondary">
                    Rare diseases and complex multi-system conditions are often the most challenging to diagnose because they 
                    don't fit typical patterns that physicians are trained to recognize. These "zebra" conditions require 
                    sophisticated analysis and often benefit from AI-assisted pattern recognition.
                  </p>
                </details>
                
                <details className="card">
                  <summary className="text-lg-heading text-primary cursor-pointer mb-3">
                    How can AI help with complex medical cases?
                  </summary>
                  <p className="text-body text-secondary">
                    AI can analyze patterns across vast amounts of medical literature and patient data, identify rare disease pathways, 
                    and help organize symptoms in ways that reveal diagnostic clues. Unlike generic symptom checkers, 
                    SecondLook is designed specifically for complex cases that have stumped traditional approaches.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-background-elevated">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-xl-heading text-primary mb-4">
                Ready to take control of your diagnostic journey?
              </h2>
              <p className="text-body text-secondary mb-8">
                Join the community of patients who refuse to accept "we don't know" as a final answer.
              </p>
              
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="input"
                    required
                    disabled={isSubmitting}
                  />
                  
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Joining...' : 'Get Early Access'}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <p className="text-accent text-body-sm text-center">
                      ✓ You're on the list! We'll be in touch soon.
                    </p>
                  )}
                  
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-body-sm text-center">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}