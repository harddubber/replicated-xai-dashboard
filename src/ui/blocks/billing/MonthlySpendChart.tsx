import React, { useMemo } from "react";
import { Card } from "@/ui/components/Card1";
import { CardContent } from "@/ui/components/CardContent";
import { ContentWrapper } from "@/ui/components/ContentWrapper";
import { Typography } from "@/ui/primitives/Typography";
import { TooltipTrigger } from "@/ui/components/TooltipTrigger1";
import { FormattedAmount } from "@/ui/primitives/FormattedAmount";

// Mocking Tooltip because it's not in the provided dependencies directly as a single export
const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const TooltipContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);

// Mocking dependencies that aren't provided but are used in the minified code
// Assuming these are standard hooks/utilities in the project
const useTranslation = (ns: string[], key: string) => {
  const translations: Record<string, string> = {
    "monthly-spend": "Monthly snapshot",
    "error": "An error occurred",
    "average": "Average",
    "title": "Monthly snapshot",
    "description": "You spend roughly <Amount/> / month",
  };
  return {
    t: (k: string) => translations[k] || k,
  };
};

const useTeam = () => ({ teamId: "test-team" });

const useQuery = (options: any) => ({
  data: {
    results: [
      { timeUnitValue: "2023-01-01T00:00:00Z", results: [{ value: "100" }] },
      { timeUnitValue: "2023-02-01T00:00:00Z", results: [{ value: "150" }] },
      { timeUnitValue: "2023-03-01T00:00:00Z", results: [{ value: "358" }] },
      { timeUnitValue: "2023-04-01T00:00:00Z", results: [{ value: "80" }] },
    ],
  },
  isPending: false,
  isError: false,
});

const dayjs = (date?: any) => {
  const d = date ? new Date(date) : new Date();
  return {
    subtract: (val: number, unit: string) => dayjs(new Date(d.setMonth(d.getMonth() - val))),
    toDate: () => d,
    format: (fmt: string) => d.toLocaleString("en-US", { month: "short" }),
  };
};

const toDateString = (date: Date) => date.toISOString().split("T")[0];
const protoTimestampToDate = (ts: string) => new Date(ts);

const Trans = ({ t, i18nKey, components }: any) => {
  const text = t(i18nKey);
  if (i18nKey === "description") {
    return (
      <>
        <span>You spend roughly </span>
        {components.Amount}
        <span> / month</span>
      </>
    );
  }
  return text;
};

export interface MonthlySpendChartProps {}

export const MonthlySpendChart: React.FC<MonthlySpendChartProps> = () => {
  const { t } = useTranslation(["billing-overview"], "monthly-spend");
  const { teamId } = useTeam();

  const { data, isPending, isError } = useQuery({
    gcTime: 60000,
    queryKey: ["usage-summary", teamId],
    enabled: !!teamId,
  });

  const stats = useMemo(() => {
    let sum = 0;
    let max = 0;
    let count = 0;
    let months: any[] = [];

    (data?.results || []).forEach((item: any, idx: number) => {
      const val = item.results.reduce((acc: number, curr: any) => acc + parseInt(curr.value, 10), 0);
      sum += val;
      months[idx] = { timestamp: item.timeUnitValue, value: val, normalized: 0 };
      if (val > max) max = val;
      count++;
    });

    months = months.map((m) => ({ ...m, normalized: max > 0 ? m.value / max : 0 }));
    const avg = count === 0 ? 0 : sum / count;

    return { sum, max, avg, months };
  }, [data]);

  const displayMonths = useMemo(() => {
    const result = new Array(4);
    if (stats.months.length === 0) return [];

    const reversed = [...stats.months].reverse();
    for (let i = 0; i < 4; i++) {
      const monthData = reversed[i];
      if (monthData) {
        result[i] = {
          height: `${Math.max(5, Math.round(monthData.normalized * 100))}%`,
          value: monthData.value,
          date: dayjs(protoTimestampToDate(monthData.timestamp)).toDate(),
        };
      } else {
        const prevDate = i > 0 ? result[0].date : null;
        result[i] = {
          height: "5%",
          value: 0,
          date: dayjs(prevDate).subtract(i, "months").toDate(),
        };
      }
    }
    return result.reverse();
  }, [stats]);

  return (
    <Card className="h-full">
      <div className="flex h-full items-end">
        <CardContent className="w-full">
          <ContentWrapper isLoading={isPending} error={isError && t("error")}>
            <div className="relative">
              <div className="relative flex h-[100px] items-end gap-2">
                {stats.months.length > 0 ? (
                  <>
                    {displayMonths.map((m, i) => (
                      <Tooltip key={`${i}-${m.value}`} delayDuration={0}>
                        <TooltipTrigger className="z-10 items-end" style={{ height: m.height }}>
                          <div
                            className={`h-full w-8 rounded ${
                              i === displayMonths.length - 1 ? "bg-primary" : m.value === 0 ? "bg-surface-l3" : "bg-primary"
                            }`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="z-10">
                          {dayjs(m.date).format("MMM")}:{" "}
                          <FormattedAmount value={m.value} variant="cent_ticks" showSubCents={false} />
                        </TooltipContent>
                      </Tooltip>
                    ))}
                    <div
                      className="border-primary/25 absolute inset-x-0 h-px border-b border-dashed"
                      style={{ bottom: `${Math.round((stats.avg / stats.max) * 100)}%` }}
                    >
                      <div className="text-primary flex justify-end py-1 text-xs">{t("average")}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-[45%] w-8 rounded bg-surface dark:bg-surface-l3" />
                    <div className="h-[60%] w-8 rounded bg-surface dark:bg-surface-l3" />
                    <div className="h-[75%] w-8 rounded bg-surface dark:bg-surface-l3" />
                    <div className="h-[90%] w-8 rounded bg-surface dark:bg-surface-l3" />
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-end justify-between gap-3 sm:mt-10">
              <div>
                <Typography variant="heading4" color="regular">
                  {t("title")}
                </Typography>
                <Typography variant="body5" color="subtle" className="mt-1">
                  <Trans
                    t={t}
                    i18nKey="description"
                    components={{
                      Amount: (
                        <span className="text-primary font-medium">
                          <FormattedAmount value={stats.avg} variant="cent_ticks" showSubCents={false} />
                        </span>
                      ),
                    }}
                  />
                </Typography>
              </div>
            </div>
          </ContentWrapper>
        </CardContent>
      </div>
    </Card>
  );
};
