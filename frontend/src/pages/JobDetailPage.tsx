import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsApi } from '../api/jobs';
import { Job } from '../types';

const JOB_TYPE_LABELS: Record<Job['type'], string> = {
  INTERNSHIP: '인턴십', PART_TIME: '아르바이트', FULL_TIME: '정규직',
  CONTRACT: '계약직', VOLUNTEER: '봉사'
};

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [coverLetter, setCoverLetter] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsApi.getJob(id!),
    enabled: !!id
  });

  const applyMutation = useMutation({
    mutationFn: () => jobsApi.applyToJob(id!, coverLetter),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      setShowApplyForm(false);
      alert('지원이 완료되었습니다!');
    }
  });

  const job = data?.data?.data;

  if (isLoading) return <div className="text-center py-12 text-gray-400">공고 불러오는 중...</div>;
  if (!job) return <div className="text-center py-12 text-gray-400">공고를 찾을 수 없습니다</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/jobs" className="text-sm text-blue-600 hover:underline mb-4 block">← 목록으로</Link>

      <div className="card mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-2xl text-gray-600">
              {job.company.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-600">{job.company}</p>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                {job.location && <span>📍 {job.location}</span>}
                {job.isRemote && <span>🏠 재택 가능</span>}
                <span className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                  {JOB_TYPE_LABELS[job.type]}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            {job.salary && <p className="text-blue-600 font-semibold">{job.salary}</p>}
            {job.deadline && (
              <p className="text-xs text-gray-400 mt-1">
                마감: {new Date(job.deadline).toLocaleDateString('ko-KR')}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {job.hasApplied ? (
            <span className="btn-secondary opacity-60 cursor-default">✓ 지원 완료</span>
          ) : (
            <button onClick={() => setShowApplyForm(true)} className="btn-primary">
              지원하기
            </button>
          )}
          {job.applyUrl && (
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              외부 지원 페이지
            </a>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <h2 className="font-semibold text-gray-900 mb-3">직무 설명</h2>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
      </div>

      {job.requirements.length > 0 && (
        <div className="card mb-4">
          <h2 className="font-semibold text-gray-900 mb-3">자격 요건</h2>
          <ul className="space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {job.tags.length > 0 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">태그</h2>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">{job.title} 지원하기</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                커버레터 (선택사항)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="input resize-none h-40"
                placeholder="본인의 강점과 지원 동기를 작성해주세요..."
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowApplyForm(false)} className="btn-secondary flex-1">취소</button>
              <button
                onClick={() => applyMutation.mutate()}
                disabled={applyMutation.isPending}
                className="btn-primary flex-1"
              >
                {applyMutation.isPending ? '지원 중...' : '지원 완료'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
