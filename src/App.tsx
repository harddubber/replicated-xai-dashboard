import { ConsoleAppShell } from "@/pages/ConsoleAppShell";
import { MonthlySpendChart } from "@/ui/blocks/billing/MonthlySpendChart";
import { TeamBillingUsageCard } from "@/ui/blocks/billing/TeamBillingUsageCard";
import { DashboardHeader } from "@/ui/blocks/dashboard/DashboardHeader";
import { MainSidebar } from "@/ui/blocks/dashboard/MainSidebar";
import { AppRouterAnnouncer } from "@/ui/components/AppRouterAnnouncer";
import { Card as Card1 } from "@/ui/components/Card1";
import { Card as Card2 } from "@/ui/components/Card2";
import { CardContent } from "@/ui/components/CardContent";
import { DomainStatusBanner } from "@/ui/components/DomainStatusBanner";
import { InternalTeamBadge } from "@/ui/components/InternalTeamBadge";
import { TeamBanner } from "@/ui/components/TeamBanner";
import { TeamLink } from "@/ui/components/TeamLink";
import { ArrowRightIcon } from "@/ui/icons/ArrowRightIcon";
import { ChartIcon } from "@/ui/icons/ChartIcon";
import { CreditCardIcon } from "@/ui/icons/CreditCardIcon";
import { CubeIcon } from "@/ui/icons/CubeIcon";
import { GrokLogoIcon } from "@/ui/icons/GrokLogoIcon";
import { GroupIcon } from "@/ui/icons/GroupIcon";
import { KeyIcon } from "@/ui/icons/KeyIcon";
import { Primitive } from "@/ui/primitives/Primitive2";
import { Typography } from "@/ui/primitives/Typography";
export function App() {
  return (
    <>
      <ConsoleAppShell
        actionQueue={{
          state: {
            canonicalUrl: "/team/a5a0ab9e-1928-4812-8007-d996ebdcb15e",
            renderedSearch: "",
            pushRef: {
              pendingPush: false,
              mpaNavigation: false,
              preserveCustomHistoryState: false,
            },
            focusAndScrollRef: {
              apply: false,
              onlyHashChange: false,
              hashFragment: null,
              segmentPaths: [],
            },
            cache: {
              lazyData: null,
              rsc: (
                <>
                  {[
                    <link
                      rel="stylesheet"
                      href="/_next/static/chunks/91c3b7a8fab92d4e.css"
                      precedence="next"
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <link
                      rel="stylesheet"
                      href="/_next/static/chunks/661004706da34511.css"
                      precedence="next"
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/bf485399cf32797d.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/fcf7886f2d5c02da.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/f8f01c1cc17e0e69.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/accc641d2db4388b.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/a1231474d14ce17f.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/ec6c005375f5d35e.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/04db4335e3a1076c.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/ee547c3d7db58bc9.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/5766d280fbe33507.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/30ed6df166c1d159.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/24c3bda8abb92bac.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/e0f432bc409980a6.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                    <script
                      src="/_next/static/chunks/d7af215b32d0a0f4.js"
                      async
                      nonce="NTVhNWRkNGItMDBjOC00OWYwLWEyMjMtMDdkMThlMWNmYjU0"
                    />,
                  ]}
                </>
              ),
              prefetchRsc: null,
              head: null,
              prefetchHead: null,
              loading: null,
              parallelRoutes: {},
              navigatedAt: 1768056181843,
            },
            tree: [
              "",
              {
                children: [
                  "team",
                  {
                    children: [
                      ["teamId", "a5a0ab9e-1928-4812-8007-d996ebdcb15e", "d"],
                      {
                        children: [
                          "(welcome)",
                          {
                            children: ["__PAGE__", {}, null, null, false],
                          },
                          null,
                          null,
                          false,
                        ],
                      },
                      null,
                      null,
                      false,
                    ],
                  },
                  null,
                  null,
                  false,
                ],
              },
              null,
              null,
              true,
            ],
            nextUrl: "/team/a5a0ab9e-1928-4812-8007-d996ebdcb15e",
            previousNextUrl:
              "/team/a5a0ab9e-1928-4812-8007-d996ebdcb15e/grok-business/overview",
            debugInfo: null,
          },
          dispatch:
            "[Function: (e,t)=>(function(e,t,r){let n={resolve:r,reject:()=>{}};if(t.type!==a.ACTION_RESTORE){let e=new Promise((e,t)=>{n={resolve:e,reject:t}});(0,o.startTransition)(()=>{r(e)})}let l={payload:t,next:null,resolve:n.resolve,reject:n.reject};null===e.pending?(e.last=l,g({actionQueue:e,action:l,setState:r})):t.type===a.ACTION_NAVIGATE||t.type===a.ACTION_RESTORE?(e.pending.discarded=!0,l.next=e.pending.next,g({actionQueue:e,action:l,setState:r})):(null!==e.last&&(e.last.next=l),e.last=l)})(r,e,t)]",
          action: "[Function: async(e,t)=>(0,u.reducer)(e,t)]",
          pending: null,
          last: {
            payload: {
              type: "server-action",
              actionId: "7f939b708bd204e25c15c00efcec071903524fa969",
              actionArgs: [
                {
                  teamId: "a5a0ab9e-1928-4812-8007-d996ebdcb15e",
                  groupBy: "QUERY_FIELD_NONE",
                  timeUnit: "TIME_UNIT_MONTH",
                  timezone: "Europe/Stockholm",
                  fromDate: "2025-01-10",
                  toDate: "2026-01-10",
                  withFilters: false,
                },
              ],
              resolve: "[Function: function () { [native code] }]",
              reject: "[Function: function () { [native code] }]",
            },
            next: null,
            resolve: "[Function: function () { [native code] }]",
            reject: "[Function: function () { [native code] }]",
          },
          onRouterTransitionStart: null,
        }}
        globalErrorState={[
          '[Function: function a(e){let a,s=(0,r.c)(2),{error:l}=e;return s[0]!==l?(a=(0,t.jsx)("html",{children:(0,t.jsx)("body",{children:(0,t.jsx)(n.default,{error:l})})}),s[0]=l,s[1]=a):a=s[1],a}]',
          [],
        ]}
      />
      {}
      {}
      <AppRouterAnnouncer segmentPath={["children"]}>
        <div className="min-h-svh">
          <DashboardHeader
            user={{
              userId: "94b7c80d-68c2-4e0c-84e2-85f5a803a779",
              email: "",
              familyName: "",
              givenName: "david fant",
              xUserId: "2387837053",
              emailConfirmed: false,
              xSubscriptionType: "PremiumPlus",
              organizationId: null,
              organizationRole: 0,
              createTime: 1736511242,
              profileImageUrl:
                "https://assets.x.ai/users/94b7c80d-68c2-4e0c-84e2-85f5a803a779/Tuw7L8e6qRXNxTfj-profile-picture.webp",
            }}
            currentTeamId="a5a0ab9e-1928-4812-8007-d996ebdcb15e"
            accountUrl="https://accounts.x.ai"
            docsUrl="https://docs.x.ai"
            websiteUrl="https://x.ai"
            organization={null}
            organizationRbacRole={{
              error: "5 NOT_FOUND: User is not a member of the organization",
            }}
            menuItems={
              <div className="flex h-full items-center">
                <div className="flex items-center gap-2 pl-3 pr-2">
                  <InternalTeamBadge />
                  <TeamBanner />
                </div>
                {/* <DevModeToggle /> */}
              </div>
            }
          />
          <div className="flex h-[calc(100svh-var(--nav-height))]">
            <MainSidebar
              teams={[
                {
                  blockedReasons: [],
                  aclStrings: [],
                  tierOverrides: [],
                  rateLimitOverrides: [],
                  teamId: "a5a0ab9e-1928-4812-8007-d996ebdcb15e",
                  createTime: {
                    seconds: "1747519675",
                    nanos: 420091000,
                  },
                  createUserId: "94b7c80d-68c2-4e0c-84e2-85f5a803a779",
                  name: "Personal team",
                  description: "Personal team to get started with the xAI API.",
                  user: null,
                  tierId: "100",
                  dataSharingEnabledAt: null,
                  mfaRequired: false,
                  ipRangesMc: null,
                  ipRangesIc: null,
                  allowApiKeysAllModels: true,
                  allowApiKeysAllEndpoints: true,
                  tier: 0,
                },
              ]}
              currentTeamId="a5a0ab9e-1928-4812-8007-d996ebdcb15e"
              isXaiEmployee={false}
            />
            <main className="z-0 flex w-full flex-grow flex-col overflow-y-auto bg-surface-l1 sm:w-[calc(100%-248px)]">
              {}
              {}
              <div className="relative flex min-h-full w-full flex-col">
                <div className="px-6 pb-6">
                  <div className="absolute inset-x-0 top-0 z-0 flex flex-col">
                    <div className="h-64 bg-black" />
                    <svg
                      width="500"
                      height="80"
                      viewBox="0 0 500 80"
                      preserveAspectRatio="none"
                      className="hidden w-full sm:block"
                    >
                      <path
                        d="M0,0 L0,40 Q250,80 500,40 L500,0 Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="relative mx-auto max-w-5xl">
                    <div className="flex items-center justify-between px-6 pb-4 pt-16">
                      <div className="flex w-full flex-col gap-0.5 tracking-tight">
                        <h1 className="text-2xl font-medium text-white">
                          {"Welcome, david fant"}
                        </h1>
                        <h2 className="text-xl font-medium text-white/75">
                          {"Overview of Personal team"}
                        </h2>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <Card2 className="relative overflow-hidden">
                        <div className="space-y-3">
                          <>{false}</>
                          <div>
                            <div className="grid items-center gap-3 px-3 pb-4 pt-2 sm:grid-cols-2 sm:pb-2 sm:pt-0">
                              <div>
                                <Typography
                                  variant="body4"
                                  className="font-medium"
                                >
                                  {"Usage Snapshot for"}{" "}
                                  <span className="text-primary dark:font-bold">
                                    {"January 2026"}
                                  </span>
                                </Typography>
                              </div>
                              <div className="sm:text-right">
                                <Typography variant="body6" color="subtle">
                                  {"Next billing period starts in"} {22}{" "}
                                  {"days"}
                                </Typography>
                              </div>
                            </div>
                            <div className="grid gap-3 lg:grid-cols-12">
                              <div className="lg:col-span-7">
                                <TeamBillingUsageCard />
                              </div>
                              <div className="lg:col-span-5">
                                <MonthlySpendChart />
                              </div>
                            </div>
                          </div>
                          <DomainStatusBanner />
                        </div>
                      </Card2>
                      <Card2 className="relative overflow-hidden">
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                          <Card1 className="hover:ring-primary has-[:focus-visible]:ring-primary dark:hover:ring-primary/25 dark:has-[:focus-visible]:ring-primary/25 group relative h-full shadow-sm ring-1 ring-transparent duration-150 hover:from-surface-l4 hover:to-surface-l1 hover:shadow-md has-[:focus-visible]:from-surface-l4 has-[:focus-visible]:to-surface-l1 has-[:focus-visible]:shadow-md">
                            <CardContent className="flex h-full flex-col">
                              <KeyIcon size={32} />
                              <div className="mt-6 flex flex-grow items-end justify-between gap-3">
                                <div>
                                  <Typography variant="heading4">
                                    <TeamLink
                                      href="/api-keys/create"
                                      target="_self"
                                      className="absolute inset-0 outline-none"
                                    />
                                    {"Create an API key"}
                                  </Typography>
                                  <Typography
                                    variant="body5"
                                    color="subtle"
                                    className="mt-1"
                                  >
                                    {"Start integrating with our API"}
                                  </Typography>
                                </div>
                                <div>
                                  <ArrowRightIcon
                                    size="small"
                                    className="origin-right -rotate-45"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card1>
                          <Card1 className="hover:ring-primary has-[:focus-visible]:ring-primary dark:hover:ring-primary/25 dark:has-[:focus-visible]:ring-primary/25 group relative h-full shadow-sm ring-1 ring-transparent duration-150 hover:from-surface-l4 hover:to-surface-l1 hover:shadow-md has-[:focus-visible]:from-surface-l4 has-[:focus-visible]:to-surface-l1 has-[:focus-visible]:shadow-md">
                            <CardContent className="flex h-full flex-col">
                              <GrokLogoIcon size={32} />
                              <div className="mt-6 flex flex-grow items-end justify-between gap-3">
                                <div>
                                  <Typography variant="heading4">
                                    <TeamLink
                                      href="/grok-business"
                                      target="_self"
                                      className="absolute inset-0 outline-none"
                                    />
                                    {"Manage Grok Business"}
                                  </Typography>
                                  <Typography
                                    variant="body5"
                                    color="subtle"
                                    className="mt-1"
                                  >
                                    {"Manage users and licenses"}
                                  </Typography>
                                </div>
                                <div>
                                  <ArrowRightIcon
                                    size="small"
                                    className="origin-right -rotate-45"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card1>
                          <Card1 className="hover:ring-primary has-[:focus-visible]:ring-primary dark:hover:ring-primary/25 dark:has-[:focus-visible]:ring-primary/25 group relative h-full shadow-sm ring-1 ring-transparent duration-150 hover:from-surface-l4 hover:to-surface-l1 hover:shadow-md has-[:focus-visible]:from-surface-l4 has-[:focus-visible]:to-surface-l1 has-[:focus-visible]:shadow-md">
                            <CardContent className="flex h-full flex-col">
                              <GroupIcon size={32} />
                              <div className="mt-6 flex flex-grow items-end justify-between gap-3">
                                <div>
                                  <Typography variant="heading4">
                                    <TeamLink
                                      href="/users?action=add-user"
                                      target="_self"
                                      className="absolute inset-0 outline-none"
                                    />
                                    {"Invite your team"}
                                  </Typography>
                                  <Typography
                                    variant="body5"
                                    color="subtle"
                                    className="mt-1"
                                  >
                                    {"Collaborate with your team"}
                                  </Typography>
                                </div>
                                <div>
                                  <ArrowRightIcon
                                    size="small"
                                    className="origin-right -rotate-45"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card1>
                          <Card1 className="hover:ring-primary has-[:focus-visible]:ring-primary dark:hover:ring-primary/25 dark:has-[:focus-visible]:ring-primary/25 group relative h-full shadow-sm ring-1 ring-transparent duration-150 hover:from-surface-l4 hover:to-surface-l1 hover:shadow-md has-[:focus-visible]:from-surface-l4 has-[:focus-visible]:to-surface-l1 has-[:focus-visible]:shadow-md">
                            <CardContent className="flex h-full flex-col">
                              <CreditCardIcon size={32} />
                              <div className="mt-6 flex flex-grow items-end justify-between gap-3">
                                <div>
                                  <Typography variant="heading4">
                                    <TeamLink
                                      href="/billing/invoices"
                                      target="_self"
                                      className="absolute inset-0 outline-none"
                                    />
                                    {"View invoices"}
                                  </Typography>
                                  <Typography
                                    variant="body5"
                                    color="subtle"
                                    className="mt-1"
                                  >
                                    {"Track your spending"}
                                  </Typography>
                                </div>
                                <div>
                                  <ArrowRightIcon
                                    size="small"
                                    className="origin-right -rotate-45"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card1>
                          <Card1 className="hover:ring-primary has-[:focus-visible]:ring-primary dark:hover:ring-primary/25 dark:has-[:focus-visible]:ring-primary/25 group relative h-full shadow-sm ring-1 ring-transparent duration-150 hover:from-surface-l4 hover:to-surface-l1 hover:shadow-md has-[:focus-visible]:from-surface-l4 has-[:focus-visible]:to-surface-l1 has-[:focus-visible]:shadow-md">
                            <CardContent className="flex h-full flex-col">
                              <ChartIcon size={32} />
                              <div className="mt-6 flex flex-grow items-end justify-between gap-3">
                                <div>
                                  <Typography variant="heading4">
                                    <TeamLink
                                      href="/usage"
                                      target="_self"
                                      className="absolute inset-0 outline-none"
                                    />
                                    {"Track your usage"}
                                  </Typography>
                                  <Typography
                                    variant="body5"
                                    color="subtle"
                                    className="mt-1"
                                  >
                                    {"Deep dive into your usage"}
                                  </Typography>
                                </div>
                                <div>
                                  <ArrowRightIcon
                                    size="small"
                                    className="origin-right -rotate-45"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card1>
                          <Card1 className="hover:ring-primary has-[:focus-visible]:ring-primary dark:hover:ring-primary/25 dark:has-[:focus-visible]:ring-primary/25 group relative h-full shadow-sm ring-1 ring-transparent duration-150 hover:from-surface-l4 hover:to-surface-l1 hover:shadow-md has-[:focus-visible]:from-surface-l4 has-[:focus-visible]:to-surface-l1 has-[:focus-visible]:shadow-md">
                            <CardContent className="flex h-full flex-col">
                              <CubeIcon size={32} />
                              <div className="mt-6 flex flex-grow items-end justify-between gap-3">
                                <div>
                                  <Typography variant="heading4">
                                    <TeamLink
                                      href="/models"
                                      target="_self"
                                      className="absolute inset-0 outline-none"
                                    />
                                    {"View models"}
                                  </Typography>
                                  <Typography
                                    variant="body5"
                                    color="subtle"
                                    className="mt-1"
                                  >
                                    {"Compare models and costs"}
                                  </Typography>
                                </div>
                                <div>
                                  <ArrowRightIcon
                                    size="small"
                                    className="origin-right -rotate-45"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card1>
                        </div>
                      </Card2>
                      <div className="w-full rounded-2xl border bg-surface p-3 dark:border-none grid gap-3 empty:hidden">
                        <div className="overflow-clip rounded-xl border transition-all border-muted dark:border-muted/50 bg-surface-l1 dark:shadow-none flex h-full w-full grow items-center">
                          <div className="flex h-full grow items-end">
                            <div className="p-6 w-full">
                              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between py-0">
                                <div className="w-full lg:max-w-44 xl:max-w-64">
                                  <div className="flex flex-col justify-between gap-4 sm:flex-row lg:flex-col lg:justify-start">
                                    <div className="space-y-3">
                                      <h4 className="text-base font-medium text-regular">
                                        {"Enterprise teams"}
                                      </h4>
                                      <p className="text-sm text-muted max-w-sm">
                                        {"Join teams you have access to."}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full lg:max-w-xl">
                                  <p className="text-sm text-muted max-w-xs flex-wrap text-center">
                                    {
                                      "There was an error fetching teams you can join."
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </AppRouterAnnouncer>
      <Primitive
        role="region"
        aria-label="Notifications (F8)"
        tabIndex={-1}
        style={{
          pointerEvents: "none",
        }}
      >
        <ol
          tabIndex={-1}
          className="pointer-events-none fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 max-sm:left-0 sm:bottom-0 sm:right-0 sm:top-auto sm:max-w-[420px] sm:flex-col pl-16 pr-2 pt-16 sm:px-4"
        />
      </Primitive>
      <iframe
        height="1"
        width="1"
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          border: "none",
          visibility: "hidden",
        }}
      />
      {"\n"}
      <next-route-announcer
        style={{
          position: "absolute",
        }}
      />
      <span
        id="recharts_measurement_span"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20000px",
          left: "0px",
          padding: "0px",
          margin: "0px",
          border: "none",
          whiteSpace: "pre",
          fontSize: "12px",
          letterSpacing: "normal",
        }}
      >
        {"$0.00"}
      </span>
    </>
  );
}
