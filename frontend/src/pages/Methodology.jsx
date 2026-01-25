
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Methodology() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <div className="flex-grow p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <Header />

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Methodology</h2>
            
            <Card className="rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
              <CardContent className="p-8 prose dark:prose-invert max-w-none">
                {/* PASTE YOUR README CONTENT HERE 
                   I have drafted a placeholder based on your codebase:
                */}
                
                <h3>How It Works</h3>
                <p>
                  BU FitRec Traffic is designed to help students plan their workouts by visualizing crowd density trends. 
                  The data presented is a forecast based on historical swipe data collected over previous semesters.
                </p>

                <h3>Tech Stack</h3>
                <ul>
                  <li><strong>Frontend:</strong> React with Vite</li>
                  <li><strong>Styling:</strong> Tailwind CSS & Shadcn UI</li>
                  <li><strong>Visualization:</strong> Recharts for data graphing</li>
                  <li><strong>Authentication:</strong> Firebase (Google Auth)</li>
                </ul>

                <h3>Data Privacy</h3>
                <p>
                  No personal individual user data is tracked or stored. The crowd density metrics are 
                  aggregates used solely for the purpose of predicting gym capacity.
                </p>
                
                <h3>Disclaimer</h3>
                <p>
                  This project is student-run and is not officially affiliated with Boston University 
                  Department of Physical Education, Recreation and Dance.
                </p>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}