const statusCodes = {
  UNAUTHORIZED: 401,
};

export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    const { response } = error;
    const { status } = response;

    if (status === statusCodes.UNAUTHORIZED) {
      redirect("/login");
      return;
    }

    const errorMessage = response.data && response.data.error ? response.data.error : "Une erreur est survenue.";
    return errorMessage;
  });
}
