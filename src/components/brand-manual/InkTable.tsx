import { INK, METAL, NEUTRAL, SURFACE } from "@/lib/brandTokens";
import { contrastRatio } from "@/lib/contrast";

type InkKey = keyof typeof INK.prism;

const INK_KEYS: readonly InkKey[] = ["cyan", "olive", "yellow", "orange", "magenta"];

type InkTableProps = {
  headers: {
    token: string;
    prismLabel: string;
    darkRoomLabel: string;
    ratioLabel?: string;
  };
  sampleWord?: string;
};

function wcagGrade(ratio: number) {
  return ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "AA Large";
}

export function InkTable({ headers, sampleWord = "Aa" }: InkTableProps) {
  return (
    <div className="overflow-x-auto rounded-(--radius)">
      <table className="bm-table w-full border-collapse text-left text-xs">
        <thead>
          <tr style={{ background: SURFACE.prismGlass, color: NEUTRAL.lead }}>
            <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
              {headers.token}
            </th>
            <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
              {headers.prismLabel}
            </th>
            <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
              {headers.darkRoomLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {INK_KEYS.map((key, index) => {
            const prismHex = INK.prism[key];
            const darkHex = INK.darkRoom[key];
            const prismRatio = contrastRatio(prismHex, NEUTRAL.marfim);
            const darkRatio = contrastRatio(darkHex, NEUTRAL.tape);
            const rowBg = index % 2 === 0 ? SURFACE.prismElevated : SURFACE.prismGlass;

            return (
              <tr key={key} style={{ background: rowBg, color: NEUTRAL.graphic }}>
                <td className="px-3 py-2 font-mono font-semibold whitespace-nowrap">
                  {`--ink-${key}`}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-(--radius) px-2 py-0.5 font-mono text-[11px] font-bold"
                      style={{ background: NEUTRAL.marfim, color: prismHex }}
                    >
                      {sampleWord}
                    </span>
                    <span className="font-mono" style={{ color: NEUTRAL.slate }}>
                      {prismHex}
                    </span>
                    <span
                      className="rounded-(--radius) px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                      style={{ background: SURFACE.prismGlass, color: NEUTRAL.graphic }}
                      title={headers.ratioLabel}
                    >
                      {`${prismRatio.toFixed(2)}:1 · ${wcagGrade(prismRatio)}`}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-(--radius) px-2 py-0.5 font-mono text-[11px] font-bold"
                      style={{ background: NEUTRAL.tape, color: darkHex }}
                    >
                      {sampleWord}
                    </span>
                    <span className="font-mono" style={{ color: NEUTRAL.slate }}>
                      {darkHex}
                    </span>
                    <span
                      className="rounded-(--radius) px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                      style={{ background: NEUTRAL.tape, color: METAL.highlight }}
                      title={headers.ratioLabel}
                    >
                      {`${darkRatio.toFixed(2)}:1 · ${wcagGrade(darkRatio)}`}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
