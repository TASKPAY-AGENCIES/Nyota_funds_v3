import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Shield, Zap, Users, TrendingUp, CheckCircle, Star } from 'lucide-react'
import { GRANT_TIERS, TESTIMONIALS } from '../data'

function StatCard({ value, label, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let current = 0
        const step = Math.ceil(value / 60)
        const timer = setInterval(() => {
          current = Math.min(current + step, value)
          setCount(current)
          if (current >= value) clearInterval(timer)
        }, 25)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])
  return (
    <div ref={ref} className="text-center py-6 px-4">
      <div className="font-playfair text-4xl font-bold text-emerald-primary">{count.toLocaleString()}{suffix}</div>
      <div className="text-xs text-gray-500 uppercase tracking-widest mt-2">{label}</div>
    </div>
  )
}

function TestimonialScroll() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <div className="overflow-hidden h-[480px] relative">
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-night-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-night-900 to-transparent z-10 pointer-events-none" />
      <div className="auto-scroll flex flex-col gap-4 px-1">
        {doubled.map((t, i) => (
          <div key={i} className="card flex-shrink-0">
            <p className="text-sm text-gray-300 leading-relaxed italic mb-4">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-glow border border-emerald-border flex items-center justify-center text-emerald-primary text-xs font-bold">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.location} · {t.amount}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(null)
  const faqs = [
    { q: "Who can apply for a Nyota Fund grant?", a: "Any Kenyan resident with a valid national ID and M-Pesa registered phone number can apply. No collateral or guarantor is required." },
    { q: "How long does approval take?", a: "Most applications are reviewed within 24 hours. Funds are disbursed to your M-Pesa within 24-48 hours of approval." },
    { q: "Is the application fee refundable?", a: "The application fee is a one-time processing and verification fee. It is non-refundable once submitted." },
    { q: "Can I apply for multiple grant tiers?", a: "You may apply for one grant at a time. After successful completion, you are eligible to apply again for a higher tier." },
    { q: "Is my personal information safe?", a: "Absolutely. We use bank-grade encryption and never share your data with third parties. Your privacy is our priority." }
  ]
  return (
    <div className="min-h-screen bg-night-900">
      <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-5 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <div className="inline-flex items-center gap-2 bg-emerald-glow border border-emerald-border text-emerald-primary text-xs px-4 py-2 rounded-full mb-6 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-primary pulse-green" />
                Verified Grant Platform · Kenya
              </div>
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Grants that<br /><span className="text-emerald-primary">transform lives</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                Nyota Funds Kenya connects deserving individuals with financial support — fast, transparent, and fully M-Pesa powered. From KES 18,000 to KES 250,000.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/apply" className="btn-primary text-base px-8 py-4">Apply for a Grant</Link>
                <Link to="/about" className="btn-outline text-base px-8 py-4">Learn More</Link>
              </div>
              <div className="flex items-center gap-6">
                {[{ icon: Shield, text: "Secure & Verified" }, { icon: Zap, text: "Fast Disbursement" }, { icon: Users, text: "600+ Helped" }].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                    <Icon size={14} className="text-emerald-primary" /><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative fade-in-up">
              <div className="relative rounded-2xl overflow-hidden border border-night-600 bg-night-800 aspect-[4/3] flex flex-col items-center justify-center gap-3">
                <img src="https://i.postimg.cc/NMTXqPp1/IMG-20260830-WA0008-(1).jpg" alt="Nyota Funds Kenya" className="w-full h-full object-cover absolute inset-0" />
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-emerald-primary/40 rounded-tl" />
                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-emerald-primary/40 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-emerald-primary/40 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-emerald-primary/40 rounded-br" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-night-800 border border-night-600 rounded-xl p-4 shadow-xl">
                <div className="text-emerald-primary text-xs font-medium mb-1">Latest Disbursement</div>
                <div className="text-white font-playfair text-xl font-bold">KES 70,000</div>
                <div className="text-gray-500 text-xs mt-1">To James K. · Kisumu</div>
              </div>
            </div>
          </div>
        </div>
        <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 animate-bounce">
          <ChevronDown size={24} />
        </a>
      </section>
      <section id="stats" className="border-y border-night-600 bg-night-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-night-600">
          <StatCard value={847} label="Grants Given" suffix="+" />
          <StatCard value={623} label="Members Helped" suffix="+" />
          <StatCard value={98} label="Success Rate" suffix="%" />
          <StatCard value={12} label="Grant Tiers" />
        </div>
      </section>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label">Process</div>
            <h2 className="section-title">How Nyota Funds works</h2>
            <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm leading-relaxed">Apply in minutes and receive your grant directly to M-Pesa.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Fill your details", desc: "Enter your personal information, occupation, and county. Takes less than 3 minutes." },
              { step: "02", title: "State your purpose", desc: "Tell us what you need the grant for. We support business, education, medical, and more." },
              { step: "03", title: "Choose your tier", desc: "Select the grant amount that best fits your need — from KES 18,000 up to KES 250,000." },
              { step: "04", title: "Pay & receive", desc: "Pay a small processing fee via M-Pesa STK Push and receive your grant within 48 hours." }
            ].map(({ step, title, desc }) => (
              <div key={step} className="card relative group hover:border-emerald-border transition-colors duration-300">
                <div className="text-5xl font-playfair font-bold text-night-600 group-hover:text-emerald-primary/20 transition-colors mb-4">{step}</div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/apply" className="btn-primary px-10 py-4 text-base">Start Your Application</Link>
          </div>
        </div>
      </section>
      <section className="py-20 px-5 bg-night-800 border-y border-night-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label">Grant Tiers</div>
            <h2 className="section-title">Choose your amount</h2>
            <p className="text-gray-400 mt-3 text-sm">12 tiers available — from starter to platinum.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GRANT_TIERS.map((tier) => (
              <div key={tier.tier} className={`card relative flex items-center justify-between transition-all duration-200 hover:border-emerald-border group ${tier.popular ? 'border-emerald-primary/50 bg-emerald-glow/40' : ''}`}>
                {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-primary text-night-900 text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
                <div>
                  <div className="text-gray-500 text-xs mb-1">Tier {tier.tier} — {tier.label}</div>
                  <div className="font-playfair text-2xl font-bold text-white">KES {tier.amount.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-primary font-semibold text-sm">KES {tier.fee.toLocaleString()}</div>
                  <div className="text-gray-600 text-xs mt-0.5">Fee</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/apply" className="btn-primary px-10 py-4 text-base">Apply for a Grant Now</Link>
          </div>
        </div>
      </section>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <div className="section-label">Testimonials</div>
              <h2 className="section-title mb-4">Real stories from real people</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">Hundreds of Kenyan families have transformed their lives through Nyota Funds.</p>
              <div className="flex items-center gap-3">
                {[...Array(5)].map((_, i) => (<Star key={i} size={18} className="text-emerald-primary fill-emerald-primary" />))}
                <span className="text-gray-400 text-sm ml-2">4.9/5 from 600+ members</span>
              </div>
            </div>
            <TestimonialScroll />
          </div>
        </div>
      </section>
      <section className="py-20 px-5 bg-night-800 border-y border-night-600">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Common questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white font-medium text-sm">{faq.q}</span>
                  <ChevronDown size={18} className={`text-emerald-primary flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === i && <p className="text-gray-400 text-sm leading-relaxed mt-4 pt-4 border-t border-night-600">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-emerald-border bg-emerald-glow p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-primary/5 to-transparent pointer-events-none" />
            <div className="relative">
              <CheckCircle size={48} className="text-emerald-primary mx-auto mb-6" />
              <h2 className="font-playfair text-4xl font-bold text-white mb-4 leading-tight">Your next chapter starts here</h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg mx-auto">Thousands of Kenyans have already taken the first step. Apply today and receive your grant within 48 hours.</p>
              <Link to="/apply" className="btn-primary text-base px-12 py-4 inline-block">Apply for a Grant Today</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
