import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import type { Surah } from "./Quran-browser";
import { Link } from "react-router-dom";

export function SurahList({ surahs }: { surahs: Surah[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {surahs.map((s) => (
        <SurahCard key={s.number} surah={s} />
      ))}
    </div>
  );
}

function SurahCard({ surah }: { surah: Surah }) {
  return (
    <Link to={`/surah/${surah.number}`} className="block no-underline">
      <Card className="transition-colors hover:bg-accent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <span
              aria-label={`Surah number ${surah.number}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-semibold"
            >
              {surah.number}
            </span>
            <div>
              <CardTitle className="text-base font-semibold text-foreground">
                {surah.nameEn}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {surah.ayahs} verses
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="uppercase">
            {surah.revelationType}
          </Badge>
        </CardHeader>
        <CardContent>
          {/* Arabic name with Arabic font, right-to-left direction */}
          <p
            className="font-serif text-lg"
            dir="rtl"
            lang="ar"
            aria-label={`Arabic: ${surah.nameAr}`}
          >
            {surah.nameAr}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
