import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Post } from '../types';
import { postsApi } from '../api/posts';
import { useAuthStore } from '../store/authStore';

interface Props {
  post: Post;
  onDelete?: (id: string) => void;
  onLikeToggle?: (id: string, isLiked: boolean) => void;
}

export default function PostCard({ post, onDelete, onLikeToggle }: Props) {
  const { user } = useAuthStore();
  const [isLiked, setIsLiked] = useState(post.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(post._count.likes);

  const handleLike = async () => {
    try {
      const res = await postsApi.likePost(post.id);
      const liked = res.data.isLiked;
      setIsLiked(liked);
      setLikeCount((c) => liked ? c + 1 : c - 1);
      onLikeToggle?.(post.id, liked);
    } catch {
      // ignore
    }
  };

  const handleDelete = async () => {
    if (!confirm('게시글을 삭제하시겠습니까?')) return;
    try {
      await postsApi.deletePost(post.id);
      onDelete?.(post.id);
    } catch {
      // ignore
    }
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <Link to={`/profile/${post.user.id}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
            {post.user.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {post.user.name}
            </p>
            {post.user.headline && (
              <p className="text-xs text-gray-500 line-clamp-1">{post.user.headline}</p>
            )}
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ko })}
          </span>
          {user?.id === post.user.id && (
            <button onClick={handleDelete} className="text-xs text-red-400 hover:text-red-600 transition-colors ml-2">
              삭제
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>

      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-6">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-colors ${isLiked ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-blue-600'}`}
        >
          <span>{isLiked ? '👍' : '👍'}</span>
          <span>{likeCount} 좋아요</span>
        </button>
        <Link
          to={`/posts/${post.id}`}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <span>💬</span>
          <span>{post._count.comments} 댓글</span>
        </Link>
      </div>
    </div>
  );
}
