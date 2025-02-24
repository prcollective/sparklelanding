interface EmailResponse {
    success: boolean
    message: string
  }
  
  export async function sendEmail(email: string): Promise<EmailResponse> {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        protocol: 'https',
        origin: 'api.emailjs.com',
        path: '/api/v1.0/email/send',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          template_params: {
            email: email,
            subscribe_date: new Date().toISOString(),
          },
        }),
      }),
    })
  
    if (!response.ok) {
      throw new Error('Failed to send email')
    }
  
    return await response.json()
  }