import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WealthCalculator({ setWealth }) {
  const [income, setIncome] = useState('')
  const [expenses, setExpenses] = useState('')

  const calculateWealth = () => {
    const calculatedWealth = Number(income) - Number(expenses)
    setWealth(calculatedWealth)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Wealth Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Monthly Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Monthly Expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
          <Button onClick={calculateWealth} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Calculate Wealth
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

