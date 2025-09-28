import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // إذا الأدمن مسجل دخول بالفعل
  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) navigate("/admin/dashboard");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://192.168.1.2:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // تخزين بيانات الأدمن مع التوكن
      localStorage.setItem("admin", JSON.stringify({ ...data.admin, token: data.token }));

      // التوجيه للوحة التحكم
      navigate("/admin/dashboard");
    } catch (err) {
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "جارٍ تسجيل الدخول..." : "Login"}
        </button>
      </form>
    </div>
  );
}
