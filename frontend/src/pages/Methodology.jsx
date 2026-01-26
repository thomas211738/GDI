import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './markdown.css';
import readmeContent from "../../../README.md?raw"; 

export default function Methodology() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <div className="flex-grow p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
        <Header />

        <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {readmeContent}
        </ReactMarkdown>
        </div>

        </div>
      </div>

      <Footer />

    </div>
  );
}