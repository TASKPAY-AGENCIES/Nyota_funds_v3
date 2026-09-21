import React, { useState, useCallback } from 'react'
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle, Phone, Loader2, Star } from 'lucide-react'
import { COUNTIES, OCCUPATIONS, GRANT_TIERS } from '../data'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const STEPS = ['Personal Info', 'Grant Purpose', 'Select Tier', 'M-Pesa Payment', 'Confirmation']

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
      {STEPS.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${i < current ? 'bg-emerald-primary border-emerald-primary text-night-900' : i === current ? 'border-emerald-primary text-emerald-primary bg-emerald-glow' : 'border-night-600 text-gray-600 bg-night-800'}`}>
              {i < current ? <CheckCircle size={18} /> : i + 1}
            </div>
            <span className={`text-xs mt-1.5 hidden sm:block ${i === current ? 'text-emerald-primary' : 'text-gray-600'}`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 w-8 md:w-14 mx-1 transition-all duration-300 ${i < current ? 'bg-emerald-primary' : 'bg-night-600'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const InputField = ({ label, name, type = 'text', placeholder = '', value, onChange, error }) => (
  <div>
    <label className="text-sm text-gray-300 font-medium mb-1.5 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(name, e.target.value)}
      placeholder={placeholder}
      className={`input-field ${error ? 'border-red-500/60' : ''}`}
    />
    {error && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{error}</p>}
  </div>
)

const SelectField = ({ label, name, options, value, onChange, error }) => (
  <div className="relative">
    <label className="text-sm text-gray-300 font-medium mb-1.5 block">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(name, e.target.value)}
        className={`select-field pr-10 ${error ? 'border-red-500/60' : ''} ${!value ? 'text-gray-500' : 'text-white'}`}
      >
        <option value="" disabled>Select...</option>
        {options.map(o => <option key={o} value={o} className="bg-night-800 text-white">{o}</option>)}
      </select>
      <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 pointer-events-none" />
    </div>
    {error && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{error}</p>}
  </div>
)

function Step1({ data, onChange, onNext }) {
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!data.firstName?.trim()) e.firstName = 'First name is required'
    if (!data.lastName?.trim()) e.lastName = 'Last name is required'
    if (!data.sex) e.sex = 'Please select your sex'
    if (!data.maritalStatus) e.maritalStatus = 'Please select marital status'
    if (!data.phone?.trim()) e.phone = 'Phone number is required'
    if (!data.idNumber?.trim()) e.idNumber = 'ID number is required'
    if (!data.occupation) e.occupation = 'Please select your occupation'
    if (!data.county) e.county = 'Please select your county'
    if (!agreed) e.agreed = 'You must agree to the terms before continuing'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = useCallback((name, value) => {
    onChange(name, value)
    setErrors(p => ({ ...p, [name]: '' }))
  }, [onChange])

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-white mb-1">Personal Information</h2>
      <p className="text-gray-400 text-sm mb-8">Please fill in your details accurately to process your grant application.</p>
      <div className="grid md:grid-cols-2 gap-5">
        <InputField label="First Name *" name="firstName" placeholder="e.g. John" value={data.firstName || ''} onChange={handleChange} error={errors.firstName} />
        <InputField label="Middle Name (Optional)" name="middleName" placeholder="e.g. Kamau" value={data.middleName || ''} onChange={handleChange} error={errors.middleName} />
        <InputField label="Last Name *" name="lastName" placeholder="e.g. Otieno" value={data.lastName || ''} onChange={handleChange} error={errors.lastName} />
        <SelectField label="Sex *" name="sex" options={['Male','Female','Prefer not to say']} value={data.sex || ''} onChange={handleChange} error={errors.sex} />
        <SelectField label="Marital Status *" name="maritalStatus" options={['Single','Married','Divorced','Widowed','Separated']} value={data.maritalStatus || ''} onChange={handleChange} error={errors.maritalStatus} />
        <InputField label="Phone Number *" name="phone" type="tel" placeholder="e.g. 0712345678" value={data.phone || ''} onChange={handleChange} error={errors.phone} />
        <InputField label="National ID Number *" name="idNumber" placeholder="e.g. 12345678" value={data.idNumber || ''} onChange={handleChange} error={errors.idNumber} />
        <SelectField label="Occupation *" name="occupation" options={OCCUPATIONS} value={data.occupation || ''} onChange={handleChange} error={errors.occupation} />
        <SelectField label="County *" name="county" options={COUNTIES} value={data.county || ''} onChange={handleChange} error={errors.county} />
      </div>
      <div className={`mt-6 p-4 rounded-xl border ${errors.agreed ? 'border-red-500/50 bg-red-500/5' : 'border-night-600 bg-night-800'}`}>
        <label className="flex items-start gap-3 cursor-pointer">
          <div onClick={() => { setAgreed(!agreed); setErrors(p => ({ ...p, agreed: '' })) }}
            className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center cursor-pointer transition-all ${agreed ? 'bg-emerald-primary border-emerald-primary' : 'border-night-500 bg-night-700'}`}>
            {agreed && <CheckCircle size={14} className="text-night-900" />}
          </div>
          <span className="text-sm text-gray-300 leading-relaxed">
            I agree to the <span className="text-emerald-primary underline">Terms & Conditions</span> and <span className="text-emerald-primary underline">Privacy Policy</span> of Nyota Funds Kenya. I confirm all information is accurate.
          </span>
        </label>
        {errors.agreed && <p className="text-red-400 text-xs mt-2 flex items-center gap-1 ml-8"><AlertCircle size={12}/>{errors.agreed}</p>}
      </div>
      <div className="mt-8 flex justify-end">
        <button onClick={() => { if (validate()) onNext() }} className="btn-primary flex items-center gap-2 px-8 py-3">
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

function Step2({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({})
  const PURPOSES = ['Business Startup / Expansion','School Fees / Education','Medical Bills / Healthcare','Housing / Rent Arrears','Agriculture / Farming','Emergency / Hardship Relief','Debt Repayment','Other']

  const validate = () => {
    const e = {}
    if (!data.purpose) e.purpose = 'Please select a purpose'
    if (!data.description?.trim() || data.description.trim().length < 30) e.description = 'Please describe your need in at least 30 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-white mb-1">Grant Purpose</h2>
      <p className="text-gray-400 text-sm mb-8">Help us understand how this grant will make a difference in your life.</p>
      <div className="space-y-6">
        <div>
          <label className="text-sm text-gray-300 font-medium mb-3 block">What is this grant for? *</label>
          <div className="grid grid-cols-2 gap-3">
            {PURPOSES.map(p => (
              <button key={p} type="button"
                onClick={() => { onChange('purpose', p); setErrors(e => ({ ...e, purpose: '' })) }}
                className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${data.purpose === p ? 'border-emerald-primary bg-emerald-glow text-emerald-primary' : 'border-night-600 bg-night-800 text-gray-300 hover:border-night-500'}`}
              >{p}</button>
            ))}
          </div>
          {errors.purpose && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12}/>{errors.purpose}</p>}
        </div>
        <div>
          <label className="text-sm text-gray-300 font-medium mb-1.5 block">Describe your situation *</label>
          <textarea rows={5} value={data.description || ''}
            onChange={e => { onChange('description', e.target.value); setErrors(p => ({ ...p, description: '' })) }}
            placeholder="Tell us more about your situation and how this grant will help you and your family..."
            className={`input-field resize-none ${errors.description ? 'border-red-500/60' : ''}`}
          />
          <div className="flex items-center justify-between mt-1">
            {errors.description ? <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12}/>{errors.description}</p> : <span />}
            <span className="text-gray-600 text-xs">{(data.description || '').length} chars</span>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-outline flex items-center gap-2 px-6 py-3"><ChevronLeft size={18} /> Back</button>
        <button onClick={() => { if (validate()) onNext() }} className="btn-primary flex items-center gap-2 px-8 py-3">Continue <ChevronRight size={18} /></button>
      </div>
    </div>
  )
}

function Step3({ data, onChange, onNext, onBack }) {
  const [error, setError] = useState('')
  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-glow border border-emerald-border mb-4">
          <Star size={28} className="text-emerald-primary fill-emerald-primary" />
        </div>
        <h2 className="font-playfair text-2xl font-bold text-white mb-2">Congratulations, {data.firstName || 'Applicant'}! 🎉</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
          Based on your application, you qualify for the grant tiers below. Please select the amount that best suits your needs.
        </p>
      </div>
      {error && <p className="text-red-400 text-xs text-center mb-4 flex items-center justify-center gap-1"><AlertCircle size={12}/>{error}</p>}
      <div className="grid sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {GRANT_TIERS.map(tier => (
          <button key={tier.tier} type="button"
            onClick={() => { onChange('selectedTier', tier); setError('') }}
            className={`text-left p-4 rounded-xl border transition-all duration-200 relative ${data.selectedTier?.tier === tier.tier ? 'border-emerald-primary bg-emerald-glow' : 'border-night-600 bg-night-800 hover:border-night-500'}`}
          >
            {tier.popular && <span className="absolute top-2 right-2 text-xs bg-emerald-primary text-night-900 font-bold px-2 py-0.5 rounded-full">Popular</span>}
            <div className="text-gray-400 text-xs mb-1">Tier {tier.tier} — {tier.label}</div>
            <div className="font-playfair text-xl font-bold text-white">KES {tier.amount.toLocaleString()}</div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-500 text-xs">Application fee</span>
              <span className="text-emerald-primary font-semibold text-sm">KES {tier.fee.toLocaleString()}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-outline flex items-center gap-2 px-6 py-3"><ChevronLeft size={18} /> Back</button>
        <button onClick={() => { if (!data.selectedTier) { setError('Please select a grant tier to continue'); return } onNext() }} className="btn-primary flex items-center gap-2 px-8 py-3">Continue <ChevronRight size={18} /></button>
      </div>
    </div>
  )
}

function Step4({ data, onChange, onNext, onBack }) {
  const [mpesa, setMpesa] = useState(data.phone || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formatPhone = (raw) => {
    const cleaned = raw.replace(/\D/g, '')
    if (cleaned.startsWith('0')) return '254' + cleaned.slice(1)
    if (cleaned.startsWith('254')) return cleaned
    return '254' + cleaned
  }

  const handlePay = async () => {
    if (!mpesa.trim()) { setError('Please enter your M-Pesa number'); return }
    setError(''); setLoading(true)
    try {
      const formatted = formatPhone(mpesa)
      const res = await axios.post(`${API}/api/pay`, {
        phone: formatted,
        amount: data.selectedTier.fee,
        reference: `NYOTA-${data.idNumber}`,
        description: `Nyota Funds Tier ${data.selectedTier.tier} Application Fee`
      })
      if (res.data.success) {
        onChange('mpesaPhone', formatted)
        toast.success('STK Push sent! Check your phone.')
        onNext()
      } else {
        setError(res.data.message || 'Payment initiation failed. Please try again.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-white mb-1">M-Pesa Payment</h2>
      <p className="text-gray-400 text-sm mb-8">Review your selected grant and confirm your M-Pesa number to receive the payment prompt.</p>
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-night-600">
          <div>
            <div className="text-gray-400 text-xs mb-1">Selected Grant</div>
            <div className="font-playfair text-2xl font-bold text-white">KES {data.selectedTier?.amount.toLocaleString()}</div>
            <div className="text-emerald-primary text-xs mt-0.5">Tier {data.selectedTier?.tier} — {data.selectedTier?.label}</div>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-xs mb-1">Application Fee</div>
            <div className="font-playfair text-2xl font-bold text-emerald-primary">KES {data.selectedTier?.fee.toLocaleString()}</div>
            <div className="text-gray-500 text-xs mt-0.5">To be paid now</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <CheckCircle size={14} className="text-emerald-primary flex-shrink-0" />
          <span>Grant disbursed to your M-Pesa within 24-48 hours of approval</span>
        </div>
      </div>
      <div className="card border-emerald-border bg-emerald-glow/30">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-emerald-primary/20 border border-emerald-border flex items-center justify-center">
            <Phone size={18} className="text-emerald-primary" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">M-Pesa Payment</div>
            <div className="text-gray-400 text-xs">Enter the number to receive the STK Push prompt</div>
          </div>
        </div>
        <label className="text-sm text-gray-300 font-medium mb-1.5 block">
          M-Pesa Number <span className="text-emerald-primary text-xs ml-1">(You may edit this)</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">+254</span>
          <input type="tel" value={mpesa} onChange={e => { setMpesa(e.target.value); setError('') }}
            placeholder="0712 345 678"
            className={`input-field pl-16 ${error ? 'border-red-500/60' : ''}`}
          />
        </div>
        {error && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12}/>{error}</p>}
        <div className="mt-4 p-3 rounded-lg bg-night-800 border border-night-600">
          <p className="text-gray-400 text-xs leading-relaxed">
            <span className="text-emerald-primary font-medium">How it works: </span>
            After clicking Send Payment Request, you will receive an M-Pesa STK Push prompt. Kindly enter your PIN to complete payment of <strong className="text-white">KES {data.selectedTier?.fee.toLocaleString()}</strong>.
          </p>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <button onClick={onBack} disabled={loading} className="btn-outline flex items-center gap-2 px-6 py-3"><ChevronLeft size={18} /> Back</button>
        <button onClick={handlePay} disabled={loading} className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-60">
          {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Phone size={18} /> Send Payment Request</>}
        </button>
      </div>
    </div>
  )
}

function Step5({ data }) {
  return (
    <div className="text-center py-8">
      <div className="w-24 h-24 rounded-full bg-emerald-glow border-2 border-emerald-primary flex items-center justify-center pulse-green mx-auto mb-6">
        <CheckCircle size={44} className="text-emerald-primary" />
      </div>
      <h2 className="font-playfair text-3xl font-bold text-white mb-3">You are all set, {data.firstName}!</h2>
      <p className="text-emerald-primary font-medium mb-6">Application successfully submitted</p>
      <div className="max-w-md mx-auto space-y-4 mb-8">
        <div className="card text-left">
          <div className="text-gray-400 text-xs mb-1">Application Reference</div>
          <div className="text-white font-mono font-semibold">NYOTA-{data.idNumber}</div>
        </div>
        <div className="card text-left">
          <div className="text-gray-400 text-xs mb-1">Grant Applied For</div>
          <div className="font-playfair text-2xl font-bold text-white">KES {data.selectedTier?.amount.toLocaleString()}</div>
          <div className="text-emerald-primary text-xs mt-0.5">Tier {data.selectedTier?.tier} — {data.selectedTier?.label}</div>
        </div>
      </div>
      <div className="max-w-md mx-auto bg-night-800 border border-night-600 rounded-xl p-6 text-left mb-8">
        <h3 className="text-white font-semibold mb-4">What happens next?</h3>
        <div className="space-y-3">
          {[
            "Our dedicated team will carefully review your application within the next few hours.",
            "You will receive a confirmation SMS once your application has been approved.",
            `Upon approval, your grant of KES ${data.selectedTier?.amount.toLocaleString()} will be disbursed directly to your M-Pesa with no delays.`,
            "The entire process typically takes between 24 to 48 hours from the time of payment."
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-glow border border-emerald-border text-emerald-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">{i+1}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
        Thank you for choosing Nyota Funds Kenya. We are truly honored to be part of your journey toward a better tomorrow. 💚
      </p>
    </div>
  )
}

export default function Apply() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const update = useCallback((key, value) => setFormData(p => ({ ...p, [key]: value })), [])
  const next = () => setStep(s => Math.min(s + 1, 4))
  const back = () => setStep(s => Math.max(s - 1, 0))
  return (
    <div className="min-h-screen bg-night-900 pt-24 pb-16 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="section-label">Grant Application</div>
          <h1 className="font-playfair text-3xl font-bold text-white">Apply for a Nyota Grant</h1>
          <p className="text-gray-400 text-sm mt-2">Complete the steps below to submit your application.</p>
        </div>
        <StepIndicator current={step} />
        <div className="card">
          {step === 0 && <Step1 data={formData} onChange={update} onNext={next} />}
          {step === 1 && <Step2 data={formData} onChange={update} onNext={next} onBack={back} />}
          {step === 2 && <Step3 data={formData} onChange={update} onNext={next} onBack={back} />}
          {step === 3 && <Step4 data={formData} onChange={update} onNext={next} onBack={back} />}
          {step === 4 && <Step5 data={formData} />}
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {['256-bit SSL Encrypted','M-Pesa Secured','Data Protected'].map(t => (
            <div key={t} className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle size={12} className="text-emerald-primary" />{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
