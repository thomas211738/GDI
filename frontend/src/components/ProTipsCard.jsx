import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function ProTipsCard() {
  return (
    <Card className="rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800 h-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
          <Activity className="w-5 h-5 mr-2" />
          Pro Tips
        </h3>
        {/* Changed to Grid Layout: 1 col on mobile, 2 cols on desktop */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2">•</span> 
            Early morning (6-8 AM) is consistently the quietest time
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span> 
            Weekends are generally less crowded than weekdays
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span> 
            Avoid lunch hours and right after classes (5-7 PM)
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span> 
            Late evening (8-9 PM) is a good alternative to mornings
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}