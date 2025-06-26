import React from "react";
import ReactMarkdown from "react-markdown";
// Removed remark-gfm and rehype-raw imports as they are consistently causing compilation errors in this environment.
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
import { Brain, AlertTriangle, BookOpen, Flag } from "lucide-react";

// Card Component - Reusable container with variants
const Card = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-white shadow",
    info: "bg-blue-50 border border-blue-200",
    success: "bg-green-50 border border-green-200",
    warning: "bg-amber-50 border border-amber-200"
  };
  return (
    <div className={`rounded-xl p-5 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// SectionHeader Component - Displays an icon and title for each section
const SectionHeader = ({ icon: Icon, title, color, bg }) => (
  <div className="flex items-center mb-4">
    <div className={`p-2 rounded-lg ${bg} mr-3`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

// FlagItem Component - Displays an individual warning flag
const FlagItem = ({ flag }) => (
  <div className="flex items-start bg-amber-50 rounded-md p-3 border-l-4 border-amber-400">
    <AlertTriangle className="w-4 h-4 text-amber-600 mr-2 mt-0.5" />
    <p className="text-amber-700 text-sm">{flag}</p>
  </div>
);

// Main LLMFeedbackBox Component
const LLMFeedbackBox = ({ story, llm_feedback, flags }) => {
  // If no content is provided, render nothing
  if (!story && !llm_feedback && (!flags || flags.length === 0)) return null;

  return (
    <div className="space-y-6 font-sans">
      {/* AI Review Section */}
      {llm_feedback && (
        <Card variant="info">
          <SectionHeader icon={Brain} title="AI Review" color="text-blue-600" bg="bg-blue-100" />
          {/* ReactMarkdown for rendering LLM feedback.
              remarkPlugins and rehypePlugins are removed to fix compilation issues in this environment.
              This means some advanced Markdown features (like tables or raw HTML) might not render as expected.
          */}
          <ReactMarkdown
            className="prose prose-sm md:prose-base text-blue-800" // Tailwind prose classes applied
            // remarkPlugins={[remarkGfm]} // Removed to resolve compilation error
            // rehypePlugins={[rehypeRaw]} // Removed to resolve compilation error
          >
            {llm_feedback}
          </ReactMarkdown>
        </Card>
      )}

      {/* Important Flags Section */}
      {flags && flags.length > 0 && (
        <Card variant="warning">
          <SectionHeader icon={Flag} title="Important Flags" color="text-amber-600" bg="bg-amber-100" />
          <div className="space-y-3">
            {flags.map((flag, idx) => (
              <FlagItem key={idx} flag={flag} />
            ))}
          </div>
        </Card>
      )}

      {/* Your Investment Journey (Story) Section */}
      {story && (
        <Card variant="success">
          <SectionHeader icon={BookOpen} title="Your Investment Journey" color="text-green-600" bg="bg-green-100" />
          {/* ReactMarkdown for rendering the story, applying prose styles */}
          <ReactMarkdown
            className="prose prose-sm md:prose-base text-gray-800" // Tailwind prose classes applied
            // remarkPlugins={[remarkGfm]} // Removed to resolve compilation error
            // rehypePlugins={[rehypeRaw]} // Removed to resolve compilation error
          >
            {story}
          </ReactMarkdown>
        </Card>
      )}
    </div>
  );
};

export default LLMFeedbackBox;
