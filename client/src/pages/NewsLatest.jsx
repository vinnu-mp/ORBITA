import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NewsSection from "../components/news/NewsSection";
import AIExplainModal from "../components/news/AIExplainModal";

export default function NewsLatest() {
  const [aiArticle, setAiArticle] = useState(null);

  return (
    <>
      <NewsSection
        id="latest"
        label="Latest Space News"
        icon="🛰️"
        endpoint="/news/latest"
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
