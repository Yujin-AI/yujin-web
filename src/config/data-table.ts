import { Icons } from "@/components/icons";

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
    featureFlags: [
        {
            label: "Advanced filter",
            value: "advancedFilter" as const,
            icon: Icons.sliderH,
            tooltipTitle: "Toggle advanced filter",
            tooltipDescription: "A notion like query builder to filter rows.",
        },
        {
            label: "Floating bar",
            value: "floatingBar" as const,
            icon: Icons.alignVerticalSpaceAround,
            tooltipTitle: "Toggle floating bar",
            tooltipDescription:
                "A floating bar that sticks to the top of the table.",
        },
    ],
};
