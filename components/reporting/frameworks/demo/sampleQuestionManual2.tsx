/**
 * v0 by Vercel.
 * @see https://v0.dev/t/95PeZK2Qj2u
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Component() {
  return (
    <>
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-medium">ESRS ID: S1-77</div>
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-medium">DR: 57b</div>
          <Link href="https://xbrl.efrag.org/e-esrs/esrs-set1-2023.html#d1e29340-3-1" className="text-blue-500 hover:underline" prefetch={false}>
            Paragraph
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold ">Question</h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-gray-500 dark:text-gray-400">
              Percentage of employee turnover
              </p>
            </div>
          </div>
        </div>
        
        </div>
        <div className="w-full mt-2">
      <Label htmlFor="answer">%</Label>
      <Input type="number" id="answer" placeholder="33" className="block w-full"/>
    </div>
      <div className="w-full">
            <Link href="/dev/reporting/frameworks/esrs/esrss1/s1-77">
                <Button className="mt-2 block w-full bg-slate-500">Submit</Button>
            </Link>
                
          </div>
      </div>
      </>
  )
}
