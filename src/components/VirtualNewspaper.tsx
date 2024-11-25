import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VirtualNewspaper({ donations }) {
  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Community Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Local Hero Contributes to Community</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            A generous soul has made a significant impact in our community, donating a total of <span className="font-bold text-green-600">${totalDonations}</span> to various causes. Their contributions have helped improve lives and inspire others to give back. This act of kindness reminds us of the power of community and the positive change we can create together.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


