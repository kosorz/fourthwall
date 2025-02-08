import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert/alert"
import { PiEmpty } from "react-icons/pi"

export const EmptyState = () => (
  <Alert>
    <PiEmpty width={16} height={16} />
    <AlertTitle>Miss!</AlertTitle>
    <AlertDescription className="break-words">No results found</AlertDescription>
  </Alert>
)
