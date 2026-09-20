import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Shield, Zap, Users, CheckCircle } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-night-900 pt-24 pb-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label">About Nyota Funds</div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Built for every<br />
            <span className="text-emerald-primary">Kenyan family</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-emerald-primary text-lg font-semibold leading-relaxed mb-6 uppercase tracking-wide">
              Nyota was designed to uplift all families to afford the modern life. Apply today and get the chance to transform your life tomorrow!
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              We believe financial barriers should never stop a determined Kenyan from achieving their dreams. Nyota Funds Kenya was created to bridge that gap — providing fast, accessible, and transparent grants to individuals who need a boost.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Heart, title: "Our Mission", text: "To empower Kenyan families by providing accessible financial grants that enable them to meet life's essential needs — from education and healthcare to business and housing." },
            { icon: Shield, title: "Our Values", text: "Transparency, dignity, and speed. Every applicant is treated with respect. Every decision is made fairly. Every approved grant is disbursed promptly." },
            { icon: Zap, title: "Why We're Fast", text: "We leverage M-Pesa's instant payment infrastructure and a streamlined review process to ensure approved applicants receive their funds within 24-48 hours." },
            { icon: Users, title: "Who We Serve", text: "Any Kenyan resident regardless of background, occupation, or location. Whether you are in Nairobi or Turkana, Nyota Funds is here for you." }
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card hover:border-emerald-border transition-colors duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-glow border border-emerald-border flex items-center justify-center mb-4">
                <Icon size={20} className="text-emerald-primary" />
              </div>
              <h3 className="text-white font-semibold mb-3">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className="card mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '847+', label: 'Grants Disbursed' },
              { value: 'KES 42M+', label: 'Total Granted' },
              { value: '47', label: 'Counties Reached' },
              { value: '98%', label: 'Success Rate' }
            ].map(s => (
              <div key={s.label}>
                <div className="font-playfair text-2xl font-bold text-emerald-primary">{s.value}</div>
                <div className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-16">
          <h2 className="font-playfair text-2xl font-bold text-white mb-6 text-center">Our commitments to you</h2>
          <div className="flex flex-col gap-4">
            {[
              "Your application is reviewed fairly and without discrimination.",
              "Your personal data is encrypted and never shared with third parties.",
              "You will receive clear communication at every step of your application.",
              "Approved grants are disbursed within 24-48 hours with no hidden delays.",
              "Our support team is available to assist you through the entire process."
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-3 p-4 card">
                <CheckCircle size={18} className="text-emerald-primary flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="inline-block bg-emerald-glow border border-emerald-border rounded-2xl p-10">
            <h2 className="font-playfair text-2xl font-bold text-white mb-3">Ready to transform your life?</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
              Join hundreds of Kenyans who have already taken the first step. Apply today — it takes less than 5 minutes.
            </p>
            <Link to="/apply" className="btn-primary px-10 py-4 text-base inline-block">Apply for a Grant</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
