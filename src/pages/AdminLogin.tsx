import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const API_URL = `https://web-production-33f69.up.railway.app`;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // إذا الأدمن مسجل دخول بالفعل
  useEffect(() => {
    const checkAdmin = async () => {
      const adminData = localStorage.getItem("admin");
      if (adminData) {
        const { token } = JSON.parse(adminData);
        try {
          const res = await fetch(`${API_URL}/api/admin/check`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            navigate("/admin/dashboard");
          } else {
            localStorage.removeItem("admin");
          }
        } catch {
          localStorage.removeItem("admin");
        }
      }
    };
    checkAdmin();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "فشل تسجيل الدخول");
        return;
      }

      // تخزين بيانات الأدمن مع التوكن
      localStorage.setItem(
        "admin",
        JSON.stringify({ ...data.admin, token: data.token })
      );

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
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">تسجيل دخول الأدمن</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            placeholder="example@email.com"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">كلمة المرور</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}
