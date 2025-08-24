import { Card, CardContent } from "../../ui/card.jsx"

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "#00b087",
  iconBgColor = "#00b087/10",
}) {
  return (
    <Card className="bg-white border-[#e7e7e7] rounded-lg shadow-sm w-30 h-14">
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: iconBgColor }}
          >
            <Icon className="w-3 h-3" style={{ color: iconColor }} />
          </div>
          <div>
            <p className="text-xs text-[#737373] leading-tight">{title}</p>
            <p className="text-sm font-bold text-[#464255] leading-tight">{value.toLocaleString()}</p>
            {subtitle && <p className="text-xs text-[#737373] leading-tight">{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
