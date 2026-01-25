import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function ProTipsCard() {
  return (
    <Card className="rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center dark:text-white">
          <Activity className="w-5 h-5 mr-2" />
          Pro Tips
        </h3>
        {/* Added dark:text-gray-300 to the list */}
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>• Early morning (6-8 AM) is consistently the quietest time</li>
          <li>• Weekends are generally less crowded than weekdays</li>
          <li>• Avoid lunch hours and right after classes (5-7 PM)</li>
          <li>• Late evening (8-9 PM) is a good alternative to mornings</li>
        </ul>
      </CardContent>
    </Card>
  );
}