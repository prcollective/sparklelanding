'use client'

import { useEffect, useState, useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '', decimals = 0 }: AnimatedCounterProps): JSX.Element {
  const [count, setCount] = useState<number>(0)
  const counterRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            let startTimestamp: number | null = null
            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp
              const progress = Math.min((timestamp - startTimestamp) / duration, 1)
              setCount(progress * end)
              if (progress < 1) {
                window.requestAnimationFrame(step)
              }
            }
            window.requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <div ref={counterRef} className="font-bold">
      {prefix}{count.toFixed(decimals)}{suffix}
    </div>
  )
}

export default function Home(): JSX.Element {
  const [isPhoneVisible, setIsPhoneVisible] = useState(false)
  const [isFasterVisible, setIsFasterVisible] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)
  const fasterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === phoneRef.current) {
              setIsPhoneVisible(true)
            }
            if (entry.target === fasterRef.current) {
              setIsFasterVisible(true)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (phoneRef.current) {
      observer.observe(phoneRef.current)
    }
    if (fasterRef.current) {
      observer.observe(fasterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleClick = () => {
    window.open('https://t.me/BlazerSolBot', '_blank')
  }

  const LightningIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  )

  const features = [
    {
      title: 'MEV Protection',
      description: 'Advanced protection against MEV attacks, ensuring your TG trades are executed safely and efficiently.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Ultra-Fast Execution',
      description: 'Lightning-fast trade execution through Telegram with minimal slippage and maximum efficiency.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Advanced TG Commands',
      description: 'Sophisticated trading commands optimized for Solana DeFi markets and token pairs.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    }
  ]

  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/50 backdrop-blur-xl z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="h-8 w-8 relative">
                  <svg className="absolute inset-0 w-full h-full text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 blur-sm"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text ml-2">BlazerBot</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="#performance" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Performance</a>
                <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                  onClick={handleClick}
                >
                  Start Trading
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 sm:pt-24 pb-16 sm:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left column content */}
            <div className="relative text-center lg:text-left mt-6 sm:mt-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-8">
                <span className="block text-white">{'Trade on TG.'}</span>
                <span 
                  ref={fasterRef}
                  className={`block bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text transition-all duration-1000 transform ${
                    isFasterVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {'Trade Faster.'}
                </span>
              </h1>
              <p className="max-w-2xl text-lg sm:text-xl text-gray-400 mb-6 sm:mb-10 mx-auto lg:mx-0">
                {'Lightning-fast Telegram trading with MEV protection. The fastest Solana TG trading bot with advanced execution.'}
              </p>
              <div className="flex justify-center lg:justify-start">
                <button 
                  className="group relative inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 text-base font-medium rounded-lg text-white overflow-hidden"
                  onClick={handleClick}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <div className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-y-full bg-gradient-to-r from-purple-600 to-blue-500 group-hover:translate-y-0"></div>
                  <span className="relative flex items-center">
                    <LightningIcon />
                    <span className="ml-2">Start Trading Now</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Right column with iPhone mockup */}
            <div 
              ref={phoneRef}
              className={`mt-8 lg:mt-0 relative transition-all duration-1000 transform ${
                isPhoneVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <button 
                onClick={handleClick}
                className="relative mx-auto w-[280px] sm:w-[300px] block transition-transform duration-300 hover:scale-[1.02] focus:outline-none"
              >
                {/* iPhone Frame */}
                <div className="relative rounded-[40px] bg-[#1b1b1b] p-[12px] shadow-xl">
                  {/* Inner iPhone bezel */}
                  <div className="absolute inset-0 rounded-[40px] border-[14px] border-[#1b1b1b] shadow-inner"></div>
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-0 inset-x-0 h-7 bg-[#1b1b1b] rounded-t-[28px] flex justify-center overflow-hidden">
                    <div className="w-[95px] h-[25px] bg-[#1b1b1b] rounded-b-[18px] flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-black rounded-full mr-2"></div>
                      <div className="w-8 h-1.5 bg-black rounded-full"></div>
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="relative rounded-[28px] bg-[#17212b] overflow-hidden w-full h-[550px] sm:h-[600px]">
                    {/* Telegram Header */}
                    <div className="bg-[#1f2936] px-3 py-2 flex items-center justify-between border-b border-gray-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                          <LightningIcon />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">BlazerBot</div>
                          <div className="text-[10px] text-gray-400">online</div>
                        </div>
                      </div>
                      <button className="p-1.5 hover:bg-gray-700/50 rounded-full">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="p-2 space-y-2 overflow-y-auto h-[calc(100%-120px)] bg-[#17212b]">
                      {/* Bot Welcome */}
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                          <LightningIcon />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] text-gray-400 mb-0.5">BlazerBot</div>
                          <div className="bg-[#1f2936] rounded-lg py-1 px-2 text-xs text-gray-200 inline-flex items-center space-x-1">
                            <LightningIcon />
                            <span>/start</span>
                          </div>
                          <div className="text-[9px] text-gray-500 mt-0.5">12:01</div>
                        </div>
                      </div>

                      {/* New Pair Alert */}
                      <div className="bg-[#1f2936] rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-[11px] text-gray-400">New Pump.fun Pair Created</div>
                            <div className="text-sm font-medium text-white">TRUMP/SOL</div>
                          </div>
                        </div>
                        <div className="text-[9px] text-gray-500 mt-1">12:02</div>
                      </div>

                      {/* Buy Trade */}
                      <div className="bg-[#1f2936] rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-[11px] text-gray-400">Trade Executed Buy</div>
                            <div className="text-sm font-medium text-green-500">+1 SOL</div>
                          </div>
                        </div>
                        <div className="text-[9px] text-gray-500 mt-1">12:03</div>
                      </div>

                      {/* Sell Trade */}
                      <div className="bg-[#1f2936] rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-[11px] text-gray-400">Trade Executed Sell</div>
                            <div className="text-sm font-medium text-green-500">+0.5 SOL 👍</div>
                          </div>
                        </div>
                        <div className="text-[9px] text-gray-500 mt-1">12:04</div>
                      </div>
                    </div>

                    {/* Command Input */}
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-[#17212b] border-t border-gray-800">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-[#1f2936] rounded-full px-3 py-1.5">
                          <input 
                            type="text" 
                            placeholder="Type a command..." 
                            className="w-full bg-transparent text-sm text-gray-400 focus:outline-none"
                            readOnly
                          />
                        </div>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
                </div>

                {/* Reflections and shadows */}
                <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-2xl rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div id="performance" className="relative py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {'BlazerBot Advantage'}
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              {'Dominate Solana meme coins with ultra-fast execution and MEV protection'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-black p-6 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg text-blue-500 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{'Latency'}</h3>
                <p className="text-3xl text-white">
                  <AnimatedCounter end={12} prefix="" suffix="ms" decimals={0} />
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-black p-6 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg text-blue-500 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{'Total Volume'}</h3>
                <div className="text-3xl text-white">
                  <AnimatedCounter end={10} prefix="$" suffix="M+" decimals={0} />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-black p-6 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-lg text-purple-500 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{'Completed Trades'}</h3>
                <div className="text-3xl text-white">
                  <AnimatedCounter end={1} prefix="" suffix="M+" decimals={0} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {'Advanced Trading Features'}
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              {'Built for professional Solana TG traders'}
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative p-8 bg-black rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75"></div>
            <div className="relative rounded-2xl overflow-hidden bg-black">
              <div className="relative py-16 px-8 sm:px-16 lg:py-20">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    {'Start Trading on Solana'}
                  </h2>
                  <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                    {'Join over 20,000 Solana traders crushing it with the fastest meme coin trading bot. Don\'t miss the next 100x.'}
                  </p>
                  <div className="mt-8 flex justify-center">
                    <button 
                      className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-lg text-white overflow-hidden"
                      onClick={handleClick}
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <div className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-y-full bg-gradient-to-r from-purple-600 to-blue-500 group-hover:translate-y-0"></div>
                      <span className="relative flex items-center">
                        <LightningIcon />
                        <span className="ml-2">Start Trading Now</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}