'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WealthCalculator from './components/WealthCalculator'
import DonationForm from './components/DonationForm'
import Leaderboard from './components/Leaderboard'
import DonationHistory from './components/DonationHistory'
import VirtualNewspaper from './components/VirtualNewspaper'
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"

export default function DonationApp() {
  const [wealth, setWealth] = useState(0)
  const [donations, setDonations] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [activeTab, setActiveTab] = useState('donate')

  const handleDonation = (amount) => {
    const newDonation = { amount, date: new Date().toISOString() }
    setDonations([...donations, newDonation])
    updateLeaderboard(amount)
  }

  const updateLeaderboard = (amount) => {
    const newLeaderboard = [...leaderboard]
    const userIndex = newLeaderboard.findIndex(user => user.name === 'Current User')
    if (userIndex !== -1) {
      newLeaderboard[userIndex].total += amount
    } else {
      newLeaderboard.push({ name: 'Current User', total: amount })
    }
    newLeaderboard.sort((a, b) => b.total - a.total)
    setLeaderboard(newLeaderboard)
  }

  const getTabStyle = (tabValue) => {
    const baseStyle = "transition-all duration-300 ease-in-out transform"
    const activeStyle = "scale-105 font-bold"
    return `${baseStyle} ${activeTab === tabValue ? activeStyle : ''}`
  }

  const getTabColor = (tabValue) => {
    switch (tabValue) {
      case 'donate':
        return 'from-purple-500 to-pink-500'
      case 'leaderboard':
        return 'from-blue-500 to-teal-500'
      case 'history':
        return 'from-orange-500 to-red-500'
      case 'impact':
        return 'from-green-500 to-yellow-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <ToastProvider>
    <div className={`min-h-screen bg-gradient-to-br ${getTabColor(activeTab)} py-6 flex flex-col justify-center sm:py-12 transition-all duration-500 ease-in-out`}>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-white/10 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl backdrop-blur-md"></div>
        <div className="relative px-4 py-10 bg-white shadow-xl sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Donation App</h1>
            <Tabs defaultValue="donate" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="donate" className={getTabStyle('donate')}>Donate</TabsTrigger>
                <TabsTrigger value="leaderboard" className={getTabStyle('leaderboard')}>Leaderboard</TabsTrigger>
                <TabsTrigger value="history" className={getTabStyle('history')}>History</TabsTrigger>
                <TabsTrigger value="impact" className={getTabStyle('impact')}>Impact</TabsTrigger>
              </TabsList>
              <TabsContent value="donate">
                <WealthCalculator setWealth={setWealth} />
                <DonationForm wealth={wealth} onDonate={handleDonation} />
              </TabsContent>
              <TabsContent value="leaderboard">
                <Leaderboard leaderboard={leaderboard} />
              </TabsContent>
              <TabsContent value="history">
                <DonationHistory donations={donations} />
              </TabsContent>
              <TabsContent value="impact">
                <VirtualNewspaper donations={donations} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
    <Toaster />
  </ToastProvider>
  )
}

