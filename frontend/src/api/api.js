const API_BASE_URL = "http://127.0.0.1:8001";

export async function analyzeFiles(imageFile, audioFile) {
  const formData = new FormData();

  formData.append("image", imageFile);
  formData.append("audio_file", audioFile);

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.detail?.message ||
      errorData.detail ||
      "Analysis failed"
    );
  }

  return response.json();
}