

export const useGetKeys = async () => {

  const res = await fetch("/api/bunny/get-keys", {
    method: "GET",
    credentials: "include", 
  });

  const data = await res.json();

  if (data.success) {
    console.log("Bunny Keys:", data.bunnyKeys);
    return data.bunnyKeys;
  } else {
    alert("Not authorized!");
  }
};
