import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'

// --- Imports ---
import { timeAgo, timeUntil } from '@chinawatdc/tiny-time-ago'
import { validateThaiID } from '@chinawatdc/thai-id-validator'
import { validateEnv, types } from '@chinawatdc/env-type-checker'
import { ThaiBahtText } from '@chinawatdc/thai-baht-text-esm'
import { parseLLMOutput } from '@chinawatdc/unified-llm-parser'
import { PromptManager } from '@chinawatdc/ai-prompt-manager'
import { suggestProvince, searchAddress, searchByZipcode } from '@chinawatdc/thai-address-suggest'
import { cleanThaiText, isThai } from '@chinawatdc/thai-nlp-utils'
import { tinyFetch } from '@chinawatdc/tiny-fetch-wrapper'

import { formatThaiPhone, isValidThaiPhone } from '@chinawatdc/thai-phone-formatter'
import { getBankInfo, getAllBanks } from '@chinawatdc/thai-bank-utils'
import { generatePayload, generatePromptPaySVG } from '@chinawatdc/tiny-promptpay-qr'
import { estimateCost } from '@chinawatdc/llm-cost-estimator'
import { useClickOutside } from '@chinawatdc/use-click-outside-esm'
import { decodeJwt } from '@chinawatdc/tiny-jwt-decoder'

function Navigation() {
  const location = useLocation();
  const links = [
    { path: '/', label: 'Home' },
    // Batch 1
    { path: '/tiny-time-ago', label: 'tiny-time-ago' },
    { path: '/thai-id-validator', label: 'thai-id-validator' },
    { path: '/thai-baht-text-esm', label: 'thai-baht-text-esm' },
    { path: '/env-type-checker', label: 'env-type-checker' },
    { path: '/unified-llm-parser', label: 'unified-llm-parser' },
    { path: '/ai-prompt-manager', label: 'ai-prompt-manager' },
    { path: '/thai-address-suggest', label: 'thai-address-suggest' },
    { path: '/thai-nlp-utils', label: 'thai-nlp-utils' },
    { path: '/tiny-fetch-wrapper', label: 'tiny-fetch-wrapper' },
    { path: '/create-custom-stack', label: 'create-custom-stack' },
    // Batch 2
    { path: '/thai-phone-formatter', label: 'thai-phone-formatter' },
    { path: '/thai-bank-utils', label: 'thai-bank-utils' },
    { path: '/tiny-promptpay-qr', label: 'tiny-promptpay-qr' },
    { path: '/llm-cost-estimator', label: 'llm-cost-estimator' },
    { path: '/ai-stream-reader', label: 'ai-stream-reader' },
    { path: '/use-click-outside-esm', label: 'use-click-outside-esm' },
    { path: '/tiny-jwt-decoder', label: 'tiny-jwt-decoder' }
  ];

  return (
    <nav className="bg-white shadow mb-6 p-4 rounded-xl flex flex-wrap gap-2 text-sm">
      {links.map((link) => (
        <Link 
          key={link.path} 
          to={link.path}
          className={'px-3 py-1 rounded-md transition-colors ' + (location.pathname === link.path ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function Home() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">@chinawatdc Packages Playground</h1>
      <p className="text-gray-600">Please select any of the 17 packages from the menu above to test its functionality.</p>
    </div>
  )
}

// --- BATCH 1 COMPONENTS ---

function TinyTimeAgo() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  const pastDate = new Date(now.getTime() - 5 * 60 * 1000)
  const futureDate = new Date(now.getTime() + 10 * 60 * 1000)

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">tiny-time-ago</h2>
      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg mb-2">
        <span>5 minutes ago:</span>
        <span className="font-mono text-blue-600 font-bold">{timeAgo(pastDate)}</span>
      </div>
      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
        <span>in 10 minutes:</span>
        <span className="font-mono text-blue-600 font-bold">{timeUntil(futureDate)}</span>
      </div>
    </div>
  )
}

function ThaiIdValidator() {
  const [thaiIdInput, setThaiIdInput] = useState('1101400000000')
  const thaiIdResult = validateThaiID(thaiIdInput)

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">thai-id-validator</h2>
      <input className="border p-2 w-full rounded mb-2" value={thaiIdInput} onChange={e => setThaiIdInput(e.target.value)} maxLength={13} />
      <div className="p-4 bg-gray-50 rounded-lg font-bold">
        {thaiIdResult.isValid ? <span className="text-green-600">Valid ✓</span> : <span className="text-red-600">Invalid ✗ - {thaiIdResult.errorMessage}</span>}
      </div>
    </div>
  )
}

function ThaiBahtTextDemo() {
  const [bahtInput, setBahtInput] = useState('1234.56')
  const bahtResult = ThaiBahtText(Number(bahtInput) || 0)
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">thai-baht-text-esm</h2>
      <input type="number" className="border p-2 w-full rounded mb-2" value={bahtInput} onChange={e => setBahtInput(e.target.value)} />
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-lg text-center font-bold">{bahtResult}</div>
    </div>
  )
}

function EnvTypeChecker() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">env-type-checker</h2>
      <p>This package validates `process.env` on server startup. (No visual UI logic needed).</p>
    </div>
  )
}

function UnifiedLlmParser() {
  const [llmInput, setLlmInput] = useState('Here is the data:\n```json\n{\n  "name": "Chinawat",\n  "skills": ["React", "TypeScript",\n```\n(AI stopped generating here...)')
  
  let llmResult = null;
  let errorMsg = '';
  try { 
    llmResult = parseLLMOutput(llmInput) 
  } catch (e: any) { 
    errorMsg = e.message 
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">unified-llm-parser <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">Auto-Healing</span></h2>
      <p className="text-sm text-gray-500 mb-4">ลองป้อน JSON แบบพังๆ (ลืมปิดวงเล็บ, มี markdown ติดมา, ลูกน้ำเกิน) ดูครับ ระบบจะซ่อมให้เอง!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">AI Output (Broken JSON)</label>
          <textarea 
            className="border-2 border-gray-300 focus:border-blue-500 outline-none p-3 w-full h-48 rounded-lg font-mono text-sm shadow-sm" 
            value={llmInput} 
            onChange={e => setLlmInput(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Parsed & Healed Result</label>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto h-48 font-mono text-sm shadow-inner relative">
            {llmResult ? (
              <pre>{JSON.stringify(llmResult, null, 2)}</pre>
            ) : (
              <div className="text-red-400 whitespace-pre-wrap">{errorMsg}</div>
            )}
            {llmResult && <div className="absolute top-2 right-2 text-xs bg-green-900 text-green-300 px-2 py-1 rounded opacity-70">Valid JSON</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

function AiPromptManager() {
  const manager = new PromptManager()
  manager.register('greeting', 'Hello {{name}}! Welcome to {{place}}.')
  const [name, setName] = useState('Dev')
  const [place, setPlace] = useState('Thailand')
  
  let output = ''
  try { output = manager.get('greeting', { name, place }) } catch (e: any) { output = e.message }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">ai-prompt-manager</h2>
      <p className="mb-2">Template: <strong>Hello {'{{name}}'}! Welcome to {'{{place}}'}.</strong></p>
      <div className="flex gap-4 mb-4">
        <input className="border p-2 w-full rounded" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input className="border p-2 w-full rounded" value={place} onChange={e => setPlace(e.target.value)} placeholder="Place" />
      </div>
      <div className="p-4 bg-teal-50 text-teal-900 rounded-lg">{output}</div>
    </div>
  )
}



function ThaiAddressSuggest() {
  const [keyword, setKeyword] = useState('')
  const [selected, setSelected] = useState<any>(null)
  
  const suggestions = searchAddress(keyword)

  const handleSelect = (item: any) => {
    setSelected(item)
    setKeyword('') // clear input after selection
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">thai-address-suggest <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">Ultimate</span></h2>
      <p className="text-sm text-gray-500 mb-4">ลองพิมพ์ "10110", "10250", "คลองเตย" หรือ "เชียงใหม่"</p>
      
      {/* Checkout Form Simulation */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">ตำบล / แขวง (District)</label>
          <input readOnly className="border p-2 w-full rounded bg-gray-50" value={selected?.district || ''} placeholder="-" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">อำเภอ / เขต (Amphoe)</label>
          <input readOnly className="border p-2 w-full rounded bg-gray-50" value={selected?.amphoe || ''} placeholder="-" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">จังหวัด (Province)</label>
          <input readOnly className="border p-2 w-full rounded bg-gray-50" value={selected?.province || ''} placeholder="-" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">รหัสไปรษณีย์ (Zipcode)</label>
          <input readOnly className="border p-2 w-full rounded bg-gray-50 font-bold text-blue-600" value={selected?.zipcode || ''} placeholder="-" />
        </div>
      </div>

      <div className="relative">
        <input 
          className="border-2 border-blue-400 focus:border-blue-600 outline-none p-3 w-full rounded-lg shadow-sm" 
          value={keyword} 
          onChange={e => setKeyword(e.target.value)} 
          placeholder="🔍 ค้นหาที่อยู่ หรือ รหัสไปรษณีย์..." 
        />
        {keyword && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 border rounded-lg shadow-xl bg-white max-h-48 overflow-y-auto">
            {suggestions.map((item, i) => (
              <li 
                key={i} 
                onClick={() => handleSelect(item)}
                className="p-3 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
              >
                <span>ต.{item.district} อ.{item.amphoe} จ.{item.province}</span>
                <span className="font-bold text-blue-600">{item.zipcode}</span>
              </li>
            ))}
          </ul>
        )}
        {keyword && suggestions.length === 0 && (
          <div className="absolute z-10 w-full mt-1 border rounded-lg shadow-xl bg-white p-3 text-gray-500 text-center">
            ไม่พบข้อมูล (ระบบ Demo มีข้อมูลเฉพาะบางพื้นที่)
          </div>
        )}
      </div>
    </div>
  )
}

function ThaiNlpUtils() {
  const [text, setText] = useState('Hello สวัสดีครับ 1234 !!@#')
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">thai-nlp-utils</h2>
      <input className="border p-2 w-full rounded mb-4" value={text} onChange={e => setText(e.target.value)} />
      <div className="bg-pink-50 p-4 rounded-lg mb-2"><strong>isThai:</strong> {isThai(text) ? 'ใช่' : 'ไม่ใช่'}</div>
      <div className="bg-pink-50 p-4 rounded-lg"><strong>cleanThaiText:</strong> {cleanThaiText(text)}</div>
    </div>
  )
}

function TinyFetchWrapper() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1')
  const [result, setResult] = useState<any>(null)
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">tiny-fetch-wrapper</h2>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 w-full rounded flex-1" value={url} onChange={e => setUrl(e.target.value)} />
        <button onClick={() => tinyFetch(url).then(setResult).catch(setResult)} className="bg-cyan-600 text-white px-4 rounded">Fetch</button>
      </div>
      <pre className="bg-gray-800 text-cyan-400 p-4 rounded-lg overflow-auto h-32 text-sm">{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}

function CreateCustomStack() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">create-custom-stack</h2>
      <p>CLI tool (npx @chinawatdc/create-custom-stack) - Run in terminal.</p>
    </div>
  )
}

// --- BATCH 2 COMPONENTS ---

function ThaiPhoneFormatterDemo() {
  const [phone, setPhone] = useState('0812345678')
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">thai-phone-formatter</h2>
      <input className="border p-2 w-full mb-4 rounded" value={phone} onChange={e => setPhone(e.target.value)} />
      <div>Formatted: <strong className="text-xl text-blue-600">{formatThaiPhone(phone)}</strong></div>
      <div>Valid: <strong>{isValidThaiPhone(phone) ? '✅ Yes' : '❌ No'}</strong></div>
    </div>
  )
}

function ThaiBankUtilsDemo() {
  const banks = getAllBanks();
  const [selected, setSelected] = useState('kbank')
  const info = getBankInfo(selected)
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">thai-bank-utils</h2>
      <div className="flex gap-2 mb-4 flex-wrap">
        {banks.map(b => (
          <button key={b.code} onClick={() => setSelected(b.code)} className="px-3 py-1 border rounded" style={{ borderColor: b.color, backgroundColor: selected === b.code ? b.color : 'white', color: selected === b.code ? 'white' : b.color }}>
            {b.nameTh}
          </button>
        ))}
      </div>
      {info && (
        <div className="p-4 rounded-xl text-white font-bold" style={{ backgroundColor: info.color }}>
          {info.nameEn} ({info.code.toUpperCase()})
        </div>
      )}
    </div>
  )
}

function PromptPayQRDemo() {
  const [target, setTarget] = useState('0812345678')
  const [amount, setAmount] = useState('150.50')
  const [frameText, setFrameText] = useState('Scan to Pay')
  const [useLogo, setUseLogo] = useState(false)
  
  const payload = generatePayload(target, parseFloat(amount) || 0)
  const logo = useLogo ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjRkZEMzAwIiBkPSJNNTAgMEwyMCAxMDBMMTAwIDQwSDBMODAgMTAwTDUwIDB6Ii8+PC9zdmc+' : undefined;
  
  let svgQr = '';
  try {
    svgQr = generatePromptPaySVG(target, parseFloat(amount) || 0, { logo, frameText: frameText || undefined });
  } catch (e) {}

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">tiny-promptpay-qr (Advanced)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex flex-col gap-4 mb-4">
            <input className="border p-2 w-full rounded" value={target} onChange={e => setTarget(e.target.value)} placeholder="0812345678" />
            <input className="border p-2 w-full rounded" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
            <input className="border p-2 w-full rounded" value={frameText} onChange={e => setFrameText(e.target.value)} placeholder="Frame Text" />
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={useLogo} onChange={e => setUseLogo(e.target.checked)} />
              <span className="text-sm font-semibold">Add Logo</span>
            </label>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg break-all font-mono text-xs">{payload}</div>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border border-gray-200">
          {svgQr && <div className="w-64 h-64 max-w-full shadow-md rounded-2xl overflow-hidden bg-white" dangerouslySetInnerHTML={{ __html: svgQr }} />}
        </div>
      </div>
    </div>
  )
}

function LlmCostDemo() {
  const [model, setModel] = useState('gpt-4o')
  const [input, setInput] = useState('1000')
  const [output, setOutput] = useState('500')
  const cost = estimateCost(model, parseInt(input)||0, parseInt(output)||0)
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">llm-cost-estimator</h2>
      <div className="flex gap-2 mb-4">
        <select className="border p-2 rounded" value={model} onChange={e => setModel(e.target.value)}>
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
          <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
        </select>
        <input className="border p-2 rounded flex-1" type="number" value={input} onChange={e => setInput(e.target.value)} />
        <input className="border p-2 rounded flex-1" type="number" value={output} onChange={e => setOutput(e.target.value)} />
      </div>
      <div className="p-4 bg-green-50 text-green-800 rounded-lg font-bold text-xl">
        Estimated: $${cost.usd.toFixed(4)} (~฿${cost.thb.toFixed(2)})
      </div>
    </div>
  )
}

function UseClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => { if(isOpen) setIsOpen(false) })
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto h-64 relative">
      <h2 className="text-2xl font-semibold mb-4">use-click-outside-esm</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div ref={ref} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 p-8 rounded-xl shadow-2xl border border-red-300">
          <h3 className="font-bold">I am a Modal</h3><p>Click outside to close!</p>
        </div>
      )}
    </div>
  )
}

function TinyJwtDemo() {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiQWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
  const payload = decodeJwt(token)
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">tiny-jwt-decoder</h2>
      <textarea className="border p-2 w-full rounded mb-4 font-mono text-xs h-24" value={token} onChange={e => setToken(e.target.value)} />
      <div className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto font-mono text-sm">
        {payload ? JSON.stringify(payload, null, 2) : 'Invalid Token'}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-6 font-sans">
        <div className="max-w-6xl mx-auto">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Batch 1 */}
            <Route path="/tiny-time-ago" element={<TinyTimeAgo />} />
            <Route path="/thai-id-validator" element={<ThaiIdValidator />} />
            <Route path="/thai-baht-text-esm" element={<ThaiBahtTextDemo />} />
            <Route path="/env-type-checker" element={<EnvTypeChecker />} />
            <Route path="/unified-llm-parser" element={<UnifiedLlmParser />} />
            <Route path="/ai-prompt-manager" element={<AiPromptManager />} />
            <Route path="/thai-address-suggest" element={<ThaiAddressSuggest />} />
            <Route path="/thai-nlp-utils" element={<ThaiNlpUtils />} />
            <Route path="/tiny-fetch-wrapper" element={<TinyFetchWrapper />} />
            <Route path="/create-custom-stack" element={<CreateCustomStack />} />
            
            {/* Batch 2 */}
            <Route path="/thai-phone-formatter" element={<ThaiPhoneFormatterDemo />} />
            <Route path="/thai-bank-utils" element={<ThaiBankUtilsDemo />} />
            <Route path="/tiny-promptpay-qr" element={<PromptPayQRDemo />} />
            <Route path="/llm-cost-estimator" element={<LlmCostDemo />} />
            <Route path="/use-click-outside-esm" element={<UseClickOutsideDemo />} />
            <Route path="/tiny-jwt-decoder" element={<TinyJwtDemo />} />
            <Route path="/ai-stream-reader" element={<div className="p-8 text-center bg-white rounded-xl font-bold">Use readSSEStream(res)</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
