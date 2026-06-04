import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NewsSection from "../components/news/NewsSection";
import AIExplainModal from "../components/news/AIExplainModal";

export default function NewsIndia() {
  const [aiArticle, setAiArticle] = useState(null);

  return (
    <>
      <NewsSection
        id="india"
        label="India / ISRO Highlights"
        icon="🇮🇳"
        endpoint="/news/india"
        onAIExplain={setAiArticle}
      />
      <AnimatePresence>
        {aiArticle && (
          <AIExplainModal
            article={aiArticle}
            onClose={() => setAiArticle(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
