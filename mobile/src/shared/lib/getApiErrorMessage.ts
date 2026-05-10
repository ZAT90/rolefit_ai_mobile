type ApiErrorShape = {
  data?: {
    message?: string;
  };
  error?: string;
};

export const getApiErrorMessage = (error: unknown) => {
  const apiError = error as ApiErrorShape;

  return (
    apiError.data?.message ??
    apiError.error ??
    'Something went wrong. Please try again.'
  );
};
