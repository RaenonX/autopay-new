import {AxiosError, AxiosResponse} from 'axios';


type GetErrorMessageOpts = {
  err: any,
  getAxiosError?: (response: AxiosResponse) => string | null,
  logError?: boolean,
};

export const getErrorMessage = ({err, getAxiosError, logError = true}: GetErrorMessageOpts): string => {
  if (logError) {
    console.error(err);
  }

  const isAxiosError = err instanceof AxiosError;
  const isJsError = err instanceof Error;

  const response = isAxiosError ? err.response : undefined;

  // Status could be `0` for network error
  if (response && !!response.status) {
    const axiosMessage = getAxiosError && getAxiosError(response);

    if (axiosMessage) {
      return axiosMessage;
    }

    return `${response.status} ${response.statusText} - ${JSON.stringify(response.data)}`;
  }

  if (isAxiosError) {
    return `${err.code} - ${err.message}`;
  }

  if (isJsError) {
    return `${err.message}`;
  }

  return '開啟開發者模式後，截圖錯誤資訊，然後聯繫客服。';
};
