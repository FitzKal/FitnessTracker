import type {GoalProgressBarProps} from "../../types/GoalType.ts";

export default function DateProgressBar({ startDate, endDate }: GoalProgressBarProps) {

    const parseDateToLocal = (d: string | Date): Date => {
        if (d instanceof Date) {
            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        }
        const [year, month, day] = d.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    const start = parseDateToLocal(startDate);
    const end = parseDateToLocal(endDate);

    // Current date at local midnight
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let progress = ((today.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
    progress = Math.max(0, Math.min(100, progress));

    const getBarColor = (percentage: number) => {
        if (percentage < 50) return "bg-red-500";
        if (percentage < 75) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <div>
            <span className="flex flex-row-reverse text-sm font-semibold text-black">
        {Math.round(progress)}%
      </span>
            <div className="w-full h-6 bg-gray-200 rounded-md overflow-hidden border-2 ">
                <div
                    className={`h-full ${getBarColor(progress)} transition-all duration-300 ease-out`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
