export const fetchProperties = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`
    );
    console.log(process.env.NEXT_PUBLIC_API_DOMAIN);
    if (!response.ok) throw new Error("failed to fetch props");

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
