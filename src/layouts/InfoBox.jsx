import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useHomework } from "../stores/store"

function InfoBox() {
  const amount = useHomework( state => state.homeworks.length)
  return (
    <Card>
    <CardHeader className="py-2">
      <CardDescription>Homeworks</CardDescription>
      <CardTitle className="text-xl text-center">{amount}</CardTitle>
    </CardHeader>
    {/* <CardContent>
      <div className="text-xs text-muted-foreground">+25% from last week</div>
    </CardContent> */}
    {/* <CardFooter>
      <Progress value={25} aria-label="25% increase" />
    </CardFooter> */}
  </Card>
  )
}

export default InfoBox


