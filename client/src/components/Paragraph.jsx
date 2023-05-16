import React from 'react';

const ParagraphComponent = ({ text, sentenceLimit }) => {
  const truncateText = (text, sentenceLimit) => {
    const sentences = text.split('.'); // Split the text into individual sentences
    const truncatedSentences = sentences.slice(0, sentenceLimit); // Get the specified number of sentences
    const truncatedText = truncatedSentences.join('. '); // Join the sentences back together
    return truncatedText;
  };

  const truncatedText = truncateText(text, sentenceLimit);

  return <p>{truncatedText}</p>;
};

export default ParagraphComponent;
