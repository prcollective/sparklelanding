'use client';

export default function Home() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const messageEl = document.getElementById('message');
    
    if (messageEl) {
      messageEl.className = 'text-sm mt-2';
      messageEl.style.display = 'block';
    }
    
    try {
      // Ensure the URL is properly formatted for Supabase REST API
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
      const response = await fetch(`${supabaseUrl}/rest/v1/subscribers`, {
        method: 'POST',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email,
          created_at: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to subscribe' }));
        throw new Error(error.message || 'Failed to subscribe');
      }
      
      if (messageEl) {
        messageEl.textContent = 'Welcome to the club! 🦄';
        messageEl.className = 'text-green-600 text-sm mt-2';
      }
      form.reset();
    } catch (error) {
      console.error('Subscription error:', error);
      if (messageEl) {
        messageEl.textContent = error instanceof Error && error.message.includes('duplicate') 
          ? 'You\'re already subscribed! 🎀' 
          : 'Please try again 🎀';
        messageEl.className = 'text-red-600 text-sm mt-2';
      }
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Rest of your component remains exactly the same */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 md:-top-4 left-1/4 w-3 h-3 md:w-4 md:h-4 bg-pink-200 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 -right-2 md:-right-4 w-3 h-3 md:w-4 md:h-4 bg-purple-200 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 md:w-4 md:h-4 bg-pink-200 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 md:w-4 md:h-4 bg-purple-200 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f9a8d4_0%,_transparent_40%)] opacity-10 md:opacity-20 animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#c084fc_0%,_transparent_40%)] opacity-10 md:opacity-20 animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Main content */}
      <div className="relative z-10 px-4 py-16 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-block animate-float">
              <span className="bg-purple-100 text-purple-800 text-xs md:text-sm font-medium px-3 md:px-4 py-1 md:py-1.5 rounded-full">
                🦄 Safe Fan Tokens for Content Creators
              </span>
            </div>

            {/* Title - improved mobile responsiveness */}
            <div className="relative">
              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] md:leading-tight mx-auto max-w-[320px] sm:max-w-none px-2 md:px-0">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient break-words">
                  {'SparklePony\u00ADClub'}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black/70 max-w-2xl mx-auto px-4 md:px-0">
              A new platform with unique token emission release to prevent rug pulls and enable content creators to engage their fans
            </p>

            {/* Email signup */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 md:px-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />
                <div className="relative bg-white rounded-lg p-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email for creator early access"
                      className="w-full px-4 py-3 rounded-lg text-black bg-white/50 border-2 border-purple-100 focus:border-purple-500 focus:outline-none placeholder-black/40 text-sm md:text-base"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-black text-white font-bold px-6 py-3 rounded-lg hover:bg-black/90 transform transition-all hover:-translate-y-0.5 active:translate-y-0 hover:scale-105 text-sm md:text-base whitespace-nowrap"
                    >
                      Join 🦄
                    </button>
                  </div>
                  <div id="message" className="hidden text-center sm:text-left"></div>
                </div>
              </div>
            </form>

            {/* Feature badges */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 pt-6 md:pt-8 px-4 md:px-0">
              <div className="w-full sm:w-auto flex items-center space-x-2 bg-white border-2 border-purple-200 rounded-2xl p-3 md:p-4 backdrop-blur-sm hover:border-purple-300 transition-all hover:scale-105 hover:shadow-lg">
                <span className="text-lg md:text-xl animate-sparkle">🦄</span>
                <span className="text-black font-medium text-sm md:text-base">Transparent Emissions</span>
              </div>

              <div className="w-full sm:w-auto flex items-center space-x-2 bg-white border-2 border-pink-200 rounded-2xl p-3 md:p-4 backdrop-blur-sm hover:border-pink-300 transition-all hover:scale-105 hover:shadow-lg">
                <span className="text-lg md:text-xl animate-sparkle" style={{ animationDelay: '0.3s' }}>🎀</span>
                <span className="text-black font-medium text-sm md:text-base">For Content Creators</span>
              </div>

              <div className="w-full sm:w-auto flex items-center space-x-2 bg-white border-2 border-purple-200 rounded-2xl p-3 md:p-4 backdrop-blur-sm hover:border-purple-300 transition-all hover:scale-105 hover:shadow-lg">
                <span className="text-lg md:text-xl animate-sparkle" style={{ animationDelay: '0.6s' }}>🌈</span>
                <span className="text-black font-medium text-sm md:text-base">Early Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}