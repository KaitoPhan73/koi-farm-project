interface FetchConfig extends RequestInit {
  baseURL?: string;
  url: string;
}

const apiClient = async (config: FetchConfig) => {
  const { baseURL, url, headers, ...rest } = config;
  const token = localStorage.getItem("accessToken");

  const fetchHeaders = new Headers(headers);
  if (token) {
    fetchHeaders.append("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${baseURL || ""}${url}`, {
    ...rest,
    headers: fetchHeaders,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error("Failed to parse JSON response", error);
    throw new Error("Failed to parse JSON response");
  }
};

const apiClientWrapper = {
  get: async (url: string, config?: FetchConfig) => {
    return apiClient({ ...config, url, method: "GET" });
  },
  post: async (url: string, data?: any, config?: FetchConfig) => {
    return apiClient({
      ...config,
      url,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
    });
  },
  // Add other methods like put, delete, etc. if needed
};

export default apiClientWrapper;
