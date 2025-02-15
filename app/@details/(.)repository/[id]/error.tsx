"use client"

import { Button } from "@/src/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog/dialog"

type Props = {
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <Dialog open>
      <DialogContent withHistoryBackClose>
        <DialogHeader>
          <DialogTitle className="text-destructive">Heads up!</DialogTitle>
          <DialogDescription className="text-destructive">Something went wrong. Try again later!</DialogDescription>
          <DialogFooter className="!mt-4">
            <Button onClick={reset} variant="destructive" size="lg" className="w-[135px] m-auto">
              Try again
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
