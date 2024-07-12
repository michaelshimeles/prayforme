"use client"
import { prayTab } from '@/utils/actions/pray-tap'
import { Prayer } from '@/utils/types'
import { HandIcon, Scroll } from 'lucide-react'
import { Label } from 'recharts'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

export default function PrayerCard({ prayer }: { prayer: Prayer }) {
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
        {/* <div className="bg-[#F3F3F3] rounded-full p-2">
          <Dialog>
            <DialogTrigger>
              <Scroll className="w-6 h-6 text-[#6B7280]" />

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Encouragement</DialogTitle>
                <DialogDescription>Trust in the Lord Jesus and have faith.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center">
                  <Label className="text-right">
                    Prayer Request
                  </Label>

                </div>

              </div>
              <DialogFooter>
                <div>
                  <Button type="submit">Close</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div> */}
      </div>
    </div>)
}