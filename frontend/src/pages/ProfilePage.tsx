import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users';
import { useAuthStore } from '../store/authStore';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user: me, updateUser } = useAuthStore();
  const queryClient = useQueryClient();
  const isOwnProfile = id === me?.id;

  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => usersApi.getProfile(id!),
    enabled: !!id
  });

  const connectMutation = useMutation({
    mutationFn: () => usersApi.sendConnection(id!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile', id] })
  });

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, string | number | undefined>) => usersApi.updateProfile(data),
    onSuccess: (res) => {
      updateUser(res.data.data!);
      queryClient.invalidateQueries({ queryKey: ['profile', id] });
      setEditing(false);
    }
  });

  const user = data?.data?.data;

  if (isLoading) {
    return <div className="text-center py-12 text-gray-400">프로필 불러오는 중...</div>;
  }

  if (!user) {
    return <div className="text-center py-12 text-gray-400">사용자를 찾을 수 없습니다</div>;
  }

  const handleEditSave = () => {
    updateMutation.mutate({
      ...editForm,
      graduationYear: editForm.graduationYear ? parseInt(editForm.graduationYear) : undefined
    });
  };

  const connectionStatus = (data?.data?.data as unknown as { connectionStatus?: string })?.connectionStatus;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header Card */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              {user.headline && <p className="text-gray-600 mt-1">{user.headline}</p>}
              {(user.university || user.major) && (
                <p className="text-sm text-gray-500 mt-1">
                  {[user.university, user.major].filter(Boolean).join(' · ')}
                  {user.graduationYear && ` · ${user.graduationYear}년 졸업 예정`}
                </p>
              )}
              {user.location && <p className="text-sm text-gray-400 mt-0.5">📍 {user.location}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            {isOwnProfile ? (
              <button onClick={() => { setEditing(true); setEditForm({ name: user.name, headline: user.headline ?? '', bio: user.bio ?? '', university: user.university ?? '', major: user.major ?? '', graduationYear: user.graduationYear?.toString() ?? '', location: user.location ?? '', website: user.website ?? '' }); }} className="btn-secondary text-sm">
                프로필 편집
              </button>
            ) : (
              connectionStatus === 'NONE' || !connectionStatus ? (
                <button
                  onClick={() => connectMutation.mutate()}
                  disabled={connectMutation.isPending}
                  className="btn-primary text-sm"
                >
                  {connectMutation.isPending ? '요청 중...' : '연결 요청'}
                </button>
              ) : (
                <span className="text-sm text-gray-500 px-4 py-2 border border-gray-200 rounded-lg">
                  {connectionStatus === 'PENDING' ? '요청 대기 중' : '연결됨'}
                </span>
              )
            )}
          </div>
        </div>

        {user.bio && <p className="mt-4 text-gray-700 leading-relaxed">{user.bio}</p>}

        <div className="mt-4 flex gap-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
          <span><strong className="text-gray-900">{user._count?.connectionsFrom ?? 0}</strong> 연결</span>
          <span><strong className="text-gray-900">{user._count?.posts ?? 0}</strong> 게시글</span>
          {user.website && (
            <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              🔗 웹사이트
            </a>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">프로필 편집</h2>
            <div className="space-y-3">
              {[
                { key: 'name', label: '이름' }, { key: 'headline', label: '한 줄 소개' },
                { key: 'bio', label: '자기소개', multiline: true },
                { key: 'university', label: '대학교' }, { key: 'major', label: '전공' },
                { key: 'graduationYear', label: '졸업 예정 연도', type: 'number' },
                { key: 'location', label: '위치' }, { key: 'website', label: '웹사이트 URL' }
              ].map(({ key, label, multiline, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  {multiline ? (
                    <textarea
                      value={editForm[key] ?? ''}
                      onChange={(e) => setEditForm(f => ({ ...f, [key]: e.target.value }))}
                      className="input resize-none h-24"
                    />
                  ) : (
                    <input
                      type={type ?? 'text'}
                      value={editForm[key] ?? ''}
                      onChange={(e) => setEditForm(f => ({ ...f, [key]: e.target.value }))}
                      className="input"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(false)} className="btn-secondary flex-1">취소</button>
              <button onClick={handleEditSave} disabled={updateMutation.isPending} className="btn-primary flex-1">
                {updateMutation.isPending ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      {user.skills && user.skills.length > 0 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">기술 스택</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((s) => (
              <span key={s.skill.id} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {s.skill.name}
                <span className="text-blue-400 text-xs ml-1">
                  {s.level === 'BEGINNER' ? '초급' : s.level === 'INTERMEDIATE' ? '중급' : s.level === 'ADVANCED' ? '고급' : '전문가'}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {user.experiences && user.experiences.length > 0 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">경력</h2>
          <div className="space-y-4">
            {user.experiences.map((exp) => (
              <div key={exp.id} className="flex gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0 font-bold text-sm">
                  {exp.company.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{exp.position}</p>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(exp.startDate).getFullYear()}년 -{' '}
                    {exp.isCurrent ? '현재' : exp.endDate ? `${new Date(exp.endDate).getFullYear()}년` : ''}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                  {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {user.projects && user.projects.length > 0 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">프로젝트</h2>
          <div className="space-y-4">
            {user.projects.map((proj) => (
              <div key={proj.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-gray-900">{proj.title}</h3>
                  <div className="flex gap-2">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">GitHub</a>
                    )}
                    {proj.demoUrl && (
                      <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Demo</a>
                    )}
                  </div>
                </div>
                {proj.description && <p className="text-sm text-gray-600 mt-1">{proj.description}</p>}
                {proj.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
