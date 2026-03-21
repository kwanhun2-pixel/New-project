import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', university: '', major: '', graduationYear: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.register({
        ...form,
        graduationYear: form.graduationYear ? parseInt(form.graduationYear) : undefined
      });
      setAuth(res.data.data!.user, res.data.data!.token);
      navigate('/');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || '회원가입에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">UniLink</h1>
          <p className="text-gray-500 mt-2">대학생 커리어 네트워킹 시작하기</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {[
            { name: 'name', label: '이름', type: 'text', placeholder: '홍길동', required: true },
            { name: 'email', label: '이메일', type: 'email', placeholder: 'student@university.ac.kr', required: true },
            { name: 'password', label: '비밀번호', type: 'password', placeholder: '최소 8자', required: true },
            { name: 'university', label: '대학교', type: 'text', placeholder: '한국대학교', required: false },
            { name: 'major', label: '전공', type: 'text', placeholder: '컴퓨터공학과', required: false },
            { name: 'graduationYear', label: '졸업 예정 연도', type: 'number', placeholder: '2025', required: false }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                className="input"
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
