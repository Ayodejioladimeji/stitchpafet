import axios from "axios";
import cogoToast from "cogo-toast";

const endpoint = process.env.NEXT_PUBLIC_BASE_URL;

// ==============
export const PostRequest = async (url: string, data?: any, token?: string) => {
  try {
    const res = await axios.post(
      endpoint + url,
      data && data,
      token && {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error) {
    cogoToast.error(error?.response?.data?.msg);
    // console.log(error.response.response?.data?.msg);

    return error;
  }
};

export const UploadRequest = async (
  url: string,
  data?: any,
  token?: string
) => {
  try {
    const res = await axios.post(
      endpoint + url,
      data && data,
      token && {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res;
  } catch (error) {
    cogoToast.error(error?.response?.data?.error);
    console.log(error);
    return error;
  }
};

// =================================
export const PatchRequest = async (url: string, data?: any, token?: string) => {
  try {
    const res = await axios.patch(
      endpoint + url,
      data && data,
      token && {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error) {
    cogoToast.error(error?.response?.data?.msg);

    return error;
  }
};

// =================================
export const GetRequest = async (url: string, token?: string) => {
  try {
    const res = await axios.get(
      endpoint + url,
      token && {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error) {
    if (error?.code === "ERR_NETWORK") {
      cogoToast.error("Something went wrong", { hideAfter: 5 });
    }

    if (error?.response?.status === 401) {
      cogoToast.error("Authorization Expired", {
        hideAfter: 5,
      });

      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/";
      }, 2000);
    }
  }
};

export const Getrequest = async (url: string, data?: any) => {
  try {
    const res = await axios.get(endpoint + url, data);

    return res;
  } catch (error) {
    if (error?.code === "ERR_NETWORK") {
      cogoToast.error("Something went wrong", { hideAfter: 5 });
    }
  }
};

export const DeleteRequest = async (url: string, token?: string) => {
  try {
    const res = await axios.delete(
      endpoint + url,
      token && {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error) {
    cogoToast.error(error?.response?.data?.msg);
    // console.log(error.response.response?.data?.msg);

    return error;
  }
};
