import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../api/jobs';
import { Job } from '../types';

const JOB_TYPE_LABELS: Record<Job['type'], string> = {
  INTERNSHIP: '인턴십',
  PART_TIME: '아르바이트',
  FULL_TIME: '정규직',
  CONTRACT: '계약직',
  VOLUNTEER: '봉사'
};

const JOB_TYPE_COLORS: Record<Job['type'], string> = {
  INTERNSHIP: 'bg-purple-50 text-purple-700',
  PART_TIME: 'bg-green-50 text-green-700',
  FULL_TIME: 'bg-blue-50 text-blue-700',
  CONTRACT: 'bg-orange-50 text-orange-700',
  VOLUNTEER: 'bg-gray-50 text-gray-700'
};

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [isRemote, setIsRemote] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', search, type, isRemote],
    queryFn: () => jobsApi.getJobs({ q: search || undefined, type: type || undefined, isRemote: isRemote || undefined })
  });

  const jobs = data?.data?.data?.jobs ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">채용 공고</h1>
        <p className="text-gray-500 mt-1">인턴십, 아르바이트, 취업 기회를 탐색하세요</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="직무, 회사, 키워드 검색..."
            className="input flex-1 min-w-[200px]"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">전체 유형</option>
            {Object.entries(JOB_TYPE_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isRemote}
              onChange={(e) => setIsRemote(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            재택근무
          </label>
        </div>
      </div>

      {/* Job List */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-400">공고 불러오는 중...</div>
      ) : jobs.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400">검색 결과가 없습니다</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="card hover:shadow-md transition-shadow block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
                  {job.company.charAt(0)}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${JOB_TYPE_COLORS[job.type]}`}>
                  {JOB_TYPE_LABELS[job.type]}
                </span>
              </div>

              <h2 className="font-semibold text-gray-900 text-lg">{job.title}</h2>
              <p className="text-gray-600 text-sm">{job.company}</p>

              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                {job.location && <span>📍 {job.location}</span>}
                {job.isRemote && <span>🏠 재택</span>}
                {job.salary && <span>💰 {job.salary}</span>}
              </div>

              {job.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-3 text-xs text-gray-400">
                지원자 {job._count?.applications ?? 0}명
                {job.deadline && ` · 마감: ${new Date(job.deadline).toLocaleDateString('ko-KR')}`}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
