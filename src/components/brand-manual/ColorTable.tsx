import { METAL, NEUTRAL, SURFACE } from "@/lib/brandTokens";

export type ColorTableRow = {
  name: string;
  hex: string;
  pantone: string;
  role: string;
};

type ColorTableProps = {
  headers: {
    swatch: string;
    name: string;
    hex: string;
    pantone: string;
    role: string;
  };
  rows: readonly ColorTableRow[];
  dark?: boolean;
};

export function ColorTable({ headers, rows, dark = false }: ColorTableProps) {
  const headerBg = dark ? NEUTRAL.tape : SURFACE.prismGlass;
  const headerColor = dark ? METAL.transition : NEUTRAL.lead;

  return (
    <div className="overflow-x-auto rounded-(--radius)">
      <table className="bm-table w-full border-collapse text-left text-xs">
        <thead>
          <tr style={{ background: headerBg, color: headerColor }}>
            <th scope="col" className="w-10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
              {headers.swatch}
            </th>
            <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
              {headers.name}
            </th>
            <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
              {headers.hex}
            </th>
            <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
              {headers.pantone}
            </th>
            <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
              {headers.role}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const rowBg = dark
              ? index % 2 === 0
                ? NEUTRAL.charcoal
                : METAL.base
              : index % 2 === 0
                ? SURFACE.prismElevated
                : SURFACE.prismGlass;

            return (
              <tr
                key={`${row.name}-${row.hex}`}
                style={{
                  background: rowBg,
                  color: dark ? METAL.highlight : NEUTRAL.graphic,
                }}
              >
                <td className="px-3 py-2">
                  <span
                    className="inline-block h-4 w-4 align-middle rounded-(--radius)"
                    style={{ background: row.hex }}
                    aria-hidden="true"
                  />
                </td>
                <td className="px-3 py-2 font-semibold whitespace-nowrap">{row.name}</td>
                <td
                  className="px-3 py-2 font-mono whitespace-nowrap"
                  style={{ color: dark ? METAL.core : NEUTRAL.lead }}
                >
                  {row.hex}
                </td>
                <td
                  className="px-3 py-2 font-mono whitespace-nowrap"
                  style={{ color: dark ? METAL.core : NEUTRAL.slate }}
                >
                  {row.pantone}
                </td>
                <td
                  className="px-3 py-2"
                  style={{ color: dark ? METAL.core : NEUTRAL.slate }}
                >
                  {row.role}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
