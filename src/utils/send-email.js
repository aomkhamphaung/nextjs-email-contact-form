export async function sendEmail(data) {
    const apiEndpoint = '/api/email';
  
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send email');
      }
  
      alert(result.message);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }
  