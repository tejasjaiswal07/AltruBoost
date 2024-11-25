import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Leaderboard({ leaderboard }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {leaderboard.map((user, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.name}</span>
              </div>
              <span className="text-green-600 font-semibold">${user.total}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


