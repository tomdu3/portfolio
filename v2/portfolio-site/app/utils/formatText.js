export const formatResponseText = (text) => {
    // Convert markdown-style **bold** to <strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert - bullet points to <ul><li>
    formattedText = formattedText.replace(/^-\s+(.*$)/gm, '<li>$1</li>');
    if (formattedText.includes('<li>')) {
      formattedText = `<ul>${formattedText}</ul>`;
    }
    
    // Convert ### headings to <h4>
    formattedText = formattedText.replace(/^###\s+(.*$)/gm, '<h4>$1</h4>');
    
    // Convert line breaks to <br> when they're not already handled by lists
    formattedText = formattedText.replace(/\n/g, '<br>');
    
    return formattedText;
  };