import { DarkRoomLogo } from "@/components/logos/DarkRoomLogo";
import { METAL, NEUTRAL } from "@/lib/brandTokens";

export type DoorStateItem = {
  door: 0 | 0.5 | 1;
  label: string;
  description?: string;
};

type DoorStatesProps = {
  states: readonly DoorStateItem[];
  caption?: string;
};

export function DoorStates({ states, caption }: DoorStatesProps) {
  return (
    <div
      className="rounded-(--radius) p-5"
      style={{
        background: NEUTRAL.tape,
        color: METAL.highlight,
        boxShadow: "var(--hard-shadow)",
      }}
    >
      <div className="grid grid-cols-3 items-start gap-4">
        {states.map((state) => (
          <div key={state.door} className="flex flex-col items-center gap-2 text-center">
            <DarkRoomLogo
              className="aspect-[1203/756] w-full max-w-44"
              door={state.door}
              title={`Dark Room: ${state.label}`}
            />
            <span
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em]"
              style={{ color: state.door === 0.5 ? METAL.highlight : METAL.core }}
            >
              {state.label}
            </span>
            {state.description ? (
              <span className="text-[11px] leading-snug" style={{ color: METAL.transition }}>
                {state.description}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      {caption ? (
        <p className="mt-4 text-xs" style={{ color: METAL.transition }}>
          {caption}
        </p>
      ) : null}
    </div>
  );
}
