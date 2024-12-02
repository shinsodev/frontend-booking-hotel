import axios from "./customize-axios";

export async function userPay(
  productName,
  description,
  price,
  returnUrl,
  cancelUrl
) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `/payments/create`,
      {
        productName,
        description,
        price,
        returnUrl,
        cancelUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
