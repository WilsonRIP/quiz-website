import { MainLayout } from '@/components/main-layout'
import { UserScore } from '@/types/quiz'

// Mock data for leaderboard
const leaderboardData: UserScore[] = [
  { id: '1', name: 'Alex', score: 1250 },
  { id: '2', name: 'Jamie', score: 980 },
  { id: '3', name: 'Casey', score: 870 },
  { id: '4', name: 'Jordan', score: 760 },
  { id: '5', name: 'Taylor', score: 720 },
  { id: '6', name: 'Morgan', score: 670 },
  { id: '7', name: 'Riley', score: 620 },
  { id: '8', name: 'Sam', score: 580 },
  { id: '9', name: 'Drew', score: 530 },
  { id: '10', name: 'Cameron', score: 490 },
]

export default function LeaderboardPage() {
  return (
    <MainLayout>
      <div className="container py-10">
        <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
          Quiz Masters Leaderboard
        </h1>
        <p className="text-muted-foreground mb-8">
          Our top quiz takers and their impressive scores.
        </p>

        <div className="bg-card mb-10 overflow-hidden rounded-lg border shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-muted/50 border-b transition-colors ${
                      index < 3 ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white">
                            1
                          </span>
                        )}
                        {index === 1 && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-gray-800">
                            2
                          </span>
                        )}
                        {index === 2 && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                            3
                          </span>
                        )}
                        {index > 2 && (
                          <span className="text-muted-foreground pl-1">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium">
                      {user.score.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            How Scores Are Calculated
          </h2>
          <p className="text-muted-foreground">
            Points are awarded based on quiz difficulty, correctness, and
            completion time. Higher difficulty quizzes are worth more points,
            and faster completion times earn bonus points.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
