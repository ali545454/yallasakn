import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Users, Home, Building2, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { API_URL } from "@/pages/ApartmentDetails";

interface User {
  id: string; // UUID
  full_name: string;
  email: string;
  role: "student" | "owner" | "admin";
}

interface Apartment {
  id: string; // UUID
  title: string;
  address: string;
  price: number;
}

interface Stats {
  users_count: number;
  apartments_count: number;
  reviews_count: number;
  favorites_count: number;
  neighborhoods_count: number;
}

const PRIMARY_COLOR = "#1c7cf2";
const SECONDARY_COLOR = "#10b77f";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchUser, setSearchUser] = useState("");
  const [searchApartment, setSearchApartment] = useState("");
  const navigate = useNavigate();

  const getToken = () => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) return null;
    return JSON.parse(adminData).token;
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }

    // Fetch Users
    fetch(`${API_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then(setUsers)
      .catch(() => navigate("/admin/login"));

    // Fetch Apartments
    fetch(`${API_URL}/api/admin/apartments`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setApartments);

    // Fetch Stats
    fetch(`${API_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setStats);
  }, []);

  const deleteUser = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("فشل حذف المستخدم");
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const deleteApartment = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الشقة؟")) return;
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/apartments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error("فشل حذف الشقة: " + errMsg);
      }
      setApartments(apartments.filter(a => a.id !== id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const filteredUsers = users.filter(u => u.full_name.toLowerCase().includes(searchUser.toLowerCase()));
  const filteredApartments = apartments.filter(a => a.title.toLowerCase().includes(searchApartment.toLowerCase()));

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">لوحة تحكم الأدمن 👑</h1>

      {/* إحصائيات */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="shadow-lg border-l-4" style={{ borderColor: PRIMARY_COLOR }}>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
              <Users className="h-7 w-7" style={{ color: PRIMARY_COLOR }} />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.users_count}</div></CardContent>
          </Card>

          <Card className="shadow-lg border-l-4" style={{ borderColor: SECONDARY_COLOR }}>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">الشقق</CardTitle>
              <Home className="h-7 w-7" style={{ color: SECONDARY_COLOR }} />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.apartments_count}</div></CardContent>
          </Card>

          <Card className="shadow-lg border-l-4" style={{ borderColor: "#f59e0b" }}>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">التقييمات</CardTitle>
              <Building2 className="h-7 w-7" style={{ color: "#f59e0b" }} />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.reviews_count}</div></CardContent>
          </Card>

          <Card className="shadow-lg border-l-4" style={{ borderColor: "#8b5cf6" }}>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">الأحياء</CardTitle>
              <TrendingUp className="h-7 w-7" style={{ color: "#8b5cf6" }} />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.neighborhoods_count}</div></CardContent>
          </Card>
        </div>
      )}

      {/* جدول المستخدمين */}
      <div className="space-y-10">
        <Card className="shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">إدارة المستخدمين</CardTitle>
            <input type="text" placeholder="ابحث عن مستخدم..." className="border p-2 rounded" value={searchUser} onChange={e => setSearchUser(e.target.value)} />
          </CardHeader>
          <CardContent>
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>ID</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الإيميل</TableHead>
                  <TableHead>الدور</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(u => (
                  <TableRow key={u.id} className="hover:bg-gray-50">
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.full_name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        u.role === "admin" ? "bg-red-100 text-red-800" :
                        u.role === "owner" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>{u.role}</span>
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => deleteUser(u.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* جدول الشقق */}
        <Card className="shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">إدارة الشقق</CardTitle>
            <input type="text" placeholder="ابحث عن شقة..." className="border p-2 rounded" value={searchApartment} onChange={e => setSearchApartment(e.target.value)} />
          </CardHeader>
          <CardContent>
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>ID</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>المكان</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApartments.map(a => (
                  <TableRow key={a.id} className="hover:bg-gray-50">
                    <TableCell>{a.id}</TableCell>
                    <TableCell>{a.title}</TableCell>
                    <TableCell>{a.address}</TableCell>
                    <TableCell>{a.price} ج.م</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => deleteApartment(a.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
