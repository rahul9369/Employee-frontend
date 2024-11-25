exports.NODEAPI =
  process.env.NODE_ENV === "production"
    ? "https://employebackend.onrender.com"
    : "http://localhost:8080";
