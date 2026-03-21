import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../api/posts';
import { useAuthStore } from '../store/authStore';
import PostCard from '../components/PostCard';

export default function FeedPage() {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['feed'],
    queryFn: () => postsApi.getFeed(1, 20)
  });

  const createMutation = useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      setContent('');
      setTags('');
    }
  });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);
    createMutation.mutate({ content, tags: tagList });
  };

  const posts = data?.data?.data?.posts ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-4">
        {/* Create Post */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
              {user?.name?.charAt(0)}
            </div>
            <p className="text-sm text-gray-500">오늘 어떤 생각을 하셨나요?</p>
          </div>
          <form onSubmit={handlePost} className="space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="학교 생활, 인턴 경험, 프로젝트 이야기를 공유해보세요..."
            />
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="태그 (쉼표로 구분): 인턴십, React, 개발"
              />
              <button
                type="submit"
                disabled={!content.trim() || createMutation.isPending}
                className="btn-primary text-sm"
              >
                {createMutation.isPending ? '게시 중...' : '게시하기'}
              </button>
            </div>
          </form>
        </div>

        {/* Posts */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-400">피드 불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-400 text-lg">연결된 사람들의 게시글이 없습니다</p>
            <p className="text-gray-400 text-sm mt-1">네트워크 탭에서 사람들과 연결해보세요</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() => queryClient.invalidateQueries({ queryKey: ['feed'] })}
            />
          ))
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">내 프로필</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.university ?? '대학교 미설정'}</p>
            </div>
          </div>
          {user?.headline && (
            <p className="mt-3 text-sm text-gray-600">{user.headline}</p>
          )}
        </div>

        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">빠른 링크</h2>
          <ul className="space-y-2 text-sm text-blue-600">
            <li><a href="/network" className="hover:underline">→ 네트워크 탐색</a></li>
            <li><a href="/jobs" className="hover:underline">→ 채용 공고 보기</a></li>
            <li><a href={`/profile/${user?.id}`} className="hover:underline">→ 내 프로필 편집</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
