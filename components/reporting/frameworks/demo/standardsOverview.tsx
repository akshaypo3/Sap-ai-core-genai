/**
 * v0 by Vercel.
 * @see https://v0.dev/t/s52DjqWl1ru
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import {Button} from "@/components/ui/button";
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"


export default function Component() {
    return (
        <div className="grid gap-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">General</h3>
              <div className="grid grid-cols-1 gap-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                      <ClipboardCheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS 1</h4>
                  </div>
                  
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    General requirements
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Attention Needed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrs1" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>


                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                      <ClipboardCheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS 2</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    General disclosures
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">14/19</span>
              </div>
              <div className="py-2">
                    <Progress value={73} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">113/135</span>
              </div>
              <div className="py-2">
                    <Progress value={84} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrs2" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>



              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Environment</h3>
              <div className="grid grid-cols-1 gap-4">




              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <LeafIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS E1</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Climate change
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">83/134</span>
              </div>
              <div className="py-2">
                    <Progress value={62} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">69/90</span>
              </div>
              <div className="py-2">
                    <Progress value={76} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrse1" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>


                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <LeafIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS E2</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Pollution
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">18/36</span>
              </div>
              <div className="py-2">
                    <Progress value={50} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">31/36</span>
              </div>
              <div className="py-2">
                    <Progress value={86} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrse2" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>


                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <LeafIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS E3</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Water and marine resources
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">15/18</span>
              </div>
              <div className="py-2">
                    <Progress value={84} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">25/34</span>
              </div>
              <div className="py-2">
                    <Progress value={73} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrse3" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>
                

                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <LeafIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS E4</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Biodiversity and eco systems
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">15/17</span>
              </div>
              <div className="py-2">
                    <Progress value={88} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">72/107</span>
              </div>
              <div className="py-2">
                    <Progress value={67} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrse4" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>
                

                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <LeafIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS E5</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Resource use and circular economy
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">24/36</span>
              </div>
              <div className="py-2">
                    <Progress value={66} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">33/52</span>
              </div>
              <div className="py-2">
                    <Progress value={63} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrse5" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>
            
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social</h3>
              <div className="grid grid-cols-1 gap-4">


                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS S1</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Own workforce
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">58/83</span>
              </div>
              <div className="py-2">
                    <Progress value={69} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">110/123</span>
              </div>
              <div className="py-2">
                    <Progress value={89} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrss1" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS S2</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Workers in the value chain
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">4/7</span>
              </div>
              <div className="py-2">
                    <Progress value={57} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">65/69</span>
              </div>
              <div className="py-2">
                    <Progress value={94} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrss2" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS S3</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Affected communities
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">5/7</span>
              </div>
              <div className="py-2">
                    <Progress value={71} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">43/68</span>
              </div>
              <div className="py-2">
                    <Progress value={63} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrss3" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS S4</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Consumers and end-users
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">4/8</span>
              </div>
              <div className="py-2">
                    <Progress value={50} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">53/66</span>
              </div>
              <div className="py-2">
                    <Progress value={80} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrss4" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>



                
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Governance</h3>
              <div className="grid grid-cols-1 gap-4">
                
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                    <BriefcaseIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h4 className="text-base font-bold">ESRS G1</h4>
                  </div>
                  <p className="my-4 text-sm text-gray-500 dark:text-gray-400">
                    Business conduct
                  </p>
                  <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">KPIs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">14/20</span>
              </div>
              <div className="py-2">
                    <Progress value={70} />
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Questions</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">19/36</span>
              </div>
              <div className="py-2">
                    <Progress value={52} />
                  </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500 dark:text-green-400">Not completed</span>
              </div>
            </div>
            <Link href="/dev/reporting/frameworks/esrs/esrsg1" className="w-full">
                <Button className="block w-full">Start Work</Button>
            </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
    )
  }
  
  function BriefcaseIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect width="20" height="14" x="2" y="6" rx="2" />
      </svg>
    )
  }
  
  
  function ClipboardCheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    )
  }
  
  
  function ClipboardIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </svg>
    )
  }
  
  
  function HeartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    )
  }
  
  
  function LeafIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    )
  }
  
  
  function RecycleIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
        <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
        <path d="m14 16-3 3 3 3" />
        <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
        <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
        <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
      </svg>
    )
  }
  
  
  function ShieldIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      </svg>
    )
  }
  
  
  function UsersIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }