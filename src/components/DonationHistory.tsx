import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DonationHistory({ donations }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {donations.map((donation, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0">
              <span className="text-green-600 font-semibold">${donation.amount}</span>
              <span className="text-sm text-gray-600">{new Date(donation.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

