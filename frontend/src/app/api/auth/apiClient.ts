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

  return response;
};

const apiClientWrapper = {
  get: async (url: string, config?: FetchConfig) => {
    const response = await apiClient({ ...config, url, method: "GET" });
    return response;
  },
  post: async (url: string, data?: any, config?: FetchConfig) => {
    const response = await apiClient({
      ...config,
      url,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
    });
    return response;
  },
  // Add other methods like put, delete, etc. if needed
};

export default apiClientWrapper;
