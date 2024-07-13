"use client"
import { prayTab } from '@/utils/actions/pray-tap'
import { Prayer } from '@/utils/types'
import { HandIcon, Scroll } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useState } from 'react'

export default function PrayerCard({ prayer }: { prayer: Prayer }) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between gap-3">
      <p className="text-sm text-muted-foreground">{prayer?.request}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#F3F3F3] rounded-full p-2 hover:cursor-pointer" onClick={async () => {
            await prayTab(prayer?.request_id, prayer?.num_of_prayers)
          }}>
            <HandIcon className="w-6 h-6 text-[#6B7280]" />
          </div>
          <span className="text-sm font-medium">{prayer?.num_of_prayers}</span>
        </div>
        {prayer?.encouragement && <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Scroll className="w-6 h-6 text-[#6B7280]" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Be Encouraged 🙏</DialogTitle>
              <DialogDescription>Trust in the Lord Jesus and have faith.</DialogDescription>
            </DialogHeader>
            <p>{prayer?.encouragement}</p>
            <DialogFooter>
              <Button type="submit" onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>}
      </div>
    </div>)
}