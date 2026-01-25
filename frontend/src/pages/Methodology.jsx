import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

// Import the README content as a raw string
// Adjust the path ('../../') depending on where your README is located relative to this file
import readmeContent from "../../../README.md?raw"; 

export default function Methodology() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <div className="flex-grow p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <Header />

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Methodology</h2>
            
            <Card className="rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
              <CardContent className="p-8">
                {/* The 'prose' class styles the markdown. 
                   'dark:prose-invert' automatically adjusts text colors for dark mode.
                */}
                <article className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>
                    {readmeContent}
                  </ReactMarkdown>
                </article>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}