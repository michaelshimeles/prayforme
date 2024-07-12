import { Prayer } from '@/utils/types'
import { HandIcon } from 'lucide-react'
import React from 'react'

export default function PrayerCard({ prayer }: { prayer: Prayer }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">{prayer?.request}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#F3F3F3] rounded-full p-2">
            <HandIcon className="w-6 h-6 text-[#6B7280]" />
          </div>
          <span className="text-sm font-medium">12</span>
        </div>
      </div>
    </div>)
}
