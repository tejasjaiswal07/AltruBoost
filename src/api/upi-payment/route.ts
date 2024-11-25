import { NextResponse } from 'next/server'

// This is a mock function. In a real application, you would integrate with a UPI payment gateway.
async function processUPIPayment(upiId: string, amount: number) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate success/failure (80% success rate)
  const success = Math.random() < 0.8

  if (success) {
    return { success: true, transactionId: `UPI${Date.now()}` }
  } else {
    throw new Error('Payment failed')
  }
}

export async function POST(request: Request) {
  try {
    const { upiId, amount } = await request.json()

    if (!upiId || !amount) {
      return NextResponse.json({ error: 'Missing UPI ID or amount' }, { status: 400 })
    }

    const result = await processUPIPayment(upiId, amount)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
}

