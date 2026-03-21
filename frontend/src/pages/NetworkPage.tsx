import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users';
import { useAuthStore } from '../store/authStore';
import { User } from '../types';

export default function NetworkPage() {
  const { user: me } = useAuthStore();
  const [search, setSearch] = useState('');
  const [university, setUniversity] = useState('');
  const queryClient = useQueryClient();

  const { data: searchData, isLoading } = useQuery({
    queryKey: ['users-search', search, university],
    queryFn: () => usersApi.searchUsers({ q: search || undefined, university: university || undefined }),
    enabled: true
  });

  const { data: connectionsData } = useQuery({
    queryKey: ['my-connections'],
    queryFn: () => usersApi.getConnections(me!.id),
    enabled: !!me?.id
  });

  const connectMutation = useMutation({
    mutationFn: (toUserId: string) => usersApi.sendConnection(toUserId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users-search'] })
  });

  const users: User[] = searchData?.data?.data?.users ?? [];
  const connections: User[] = connectionsData?.data?.data ?? [];
  const filteredUsers = users.filter(u => u.id !== me?.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Search Section */}
      <div className="lg:col-span-2 space-y-4">
        <div className="card">
          <h1 className="text-xl font-bold text-gray-900 mb-4">네트워크 탐색</h1>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 전공, 대학교 검색..."
              className="input flex-1 min-w-[200px]"
            />
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="대학교 필터"
              className="input w-40"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-gray-400">검색 중...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="card text-center py-8 text-gray-400">검색 결과가 없습니다</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredUsers.map((user) => (
              <div key={user.id} className="card">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${user.id}`}
                      className="font-semibold text-gray-900 hover:text-blue-600 transition-colors block truncate"
                    >
                      {user.name}
                    </Link>
                    {user.headline && (
                      <p className="text-xs text-gray-500 truncate">{user.headline}</p>
                    )}
                    {user.university && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {user.university}
                        {user.major && ` · ${user.major}`}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link to={`/profile/${user.id}`} className="btn-secondary text-xs flex-1 text-center">
                    프로필 보기
                  </Link>
                  <button
                    onClick={() => connectMutation.mutate(user.id)}
                    disabled={connectMutation.isPending}
                    className="btn-primary text-xs flex-1"
                  >
                    연결 요청
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Connections Sidebar */}
      <div>
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">
            내 연결 <span className="text-gray-400 font-normal">({connections.length})</span>
          </h2>
          {connections.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">연결된 사람이 없습니다</p>
          ) : (
            <div className="space-y-3">
              {connections.map((conn) => (
                <Link
                  key={conn.id}
                  to={`/profile/${conn.id}`}
                  className="flex items-center gap-3 hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    {conn.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{conn.name}</p>
                    <p className="text-xs text-gray-400 truncate">{conn.university ?? ''}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
