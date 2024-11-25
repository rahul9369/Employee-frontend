exports.NODEAPI =
  process.env.NODE_ENV === "production"
    ? "https://employe-backend-nine.vercel.app"
    : "http://localhost:8080";
