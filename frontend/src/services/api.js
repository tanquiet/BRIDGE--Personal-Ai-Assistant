const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function fetchHistory() {
  const response = await fetch(`${API_BASE_URL}/api/history`);
  if (!response.ok) {
    throw new Error("Unable to load history");
  }
  return response.json();
}

export async function uploadPdf(formData) {
  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

export async function streamChat({ message, history, model, theme }) {
  const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
      model,
      theme,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  const data = await response.json();
  return typeof data === "string" ? data.replaceAll("\\n", "\n") : data;
}