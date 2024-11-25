'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function DonationForm({ wealth, onDonate }) {
  const [amount, setAmount] = useState('')
  const [upiId, setUpiId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDonation = async () => {
    const donationAmount = Number(amount)
    if (donationAmount > 0 && donationAmount <= wealth && upiId) {
      setIsLoading(true)
      try {
        const response = await fetch('/api/upi-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ upiId, amount: donationAmount }),
        })

        const result = await response.json()

        if (result.success) {
          onDonate(donationAmount)
          setAmount('')
          setUpiId('')
          toast({
            title: "Donation Successful",
            description: `Thank you for your donation of $${donationAmount}. Transaction ID: ${result.transactionId}`,
          })
        } else {
          throw new Error(result.error || 'Payment failed')
        }
      } catch (error) {
        toast({
          title: "Donation Failed",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid amount and UPI ID.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Make a Donation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Donation Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input
            type="text"
            placeholder="UPI ID (e.g., name@upi)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <Button 
            onClick={handleDonation} 
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Donate via UPI'}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-600">Available wealth: ${wealth}</p>
      </CardFooter>
    </Card>
  )
}

