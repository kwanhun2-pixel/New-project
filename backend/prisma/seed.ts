import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const password = await bcrypt.hash('password123', 12);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@university.ac.kr' },
    update: {},
    create: {
      email: 'alice@university.ac.kr',
      password,
      name: '김앨리스',
      headline: '컴퓨터공학 전공 | 풀스택 개발자 지망생',
      bio: '웹 개발과 AI에 관심 많은 대학교 3학년입니다. 스타트업 인턴 경험을 통해 실무 능력을 키우고 있습니다.',
      university: '한국대학교',
      major: '컴퓨터공학',
      graduationYear: 2025,
      location: '서울특별시'
    }
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@university.ac.kr' },
    update: {},
    create: {
      email: 'bob@university.ac.kr',
      password,
      name: '이밥',
      headline: '경영학과 | 마케팅 & 데이터 분석',
      bio: '데이터 기반 마케팅에 관심 있는 경영학과 4학년입니다.',
      university: '서울과학기술대학교',
      major: '경영학',
      graduationYear: 2024,
      location: '서울특별시'
    }
  });

  // Create skills
  const skills = await Promise.all([
    prisma.skill.upsert({ where: { name: 'TypeScript' }, update: {}, create: { name: 'TypeScript', category: '프로그래밍 언어' } }),
    prisma.skill.upsert({ where: { name: 'React' }, update: {}, create: { name: 'React', category: '프론트엔드' } }),
    prisma.skill.upsert({ where: { name: 'Node.js' }, update: {}, create: { name: 'Node.js', category: '백엔드' } }),
    prisma.skill.upsert({ where: { name: 'Python' }, update: {}, create: { name: 'Python', category: '프로그래밍 언어' } }),
    prisma.skill.upsert({ where: { name: '데이터 분석' }, update: {}, create: { name: '데이터 분석', category: '데이터' } })
  ]);

  // Add skills to users
  for (const skill of skills.slice(0, 3)) {
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId: alice.id, skillId: skill.id } },
      update: {},
      create: { userId: alice.id, skillId: skill.id, level: 'INTERMEDIATE' }
    });
  }

  for (const skill of skills.slice(3)) {
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId: bob.id, skillId: skill.id } },
      update: {},
      create: { userId: bob.id, skillId: skill.id, level: 'BEGINNER' }
    });
  }

  // Create sample jobs
  await prisma.job.createMany({
    data: [
      {
        title: '프론트엔드 인턴',
        company: '카카오',
        location: '판교',
        description: 'React와 TypeScript를 활용한 웹 서비스 개발에 참여할 인턴을 모집합니다.',
        requirements: ['React', 'TypeScript', 'JavaScript'],
        salary: '월 200만원',
        type: 'INTERNSHIP',
        isRemote: false,
        tags: ['React', 'TypeScript', '인턴십']
      },
      {
        title: '백엔드 개발 인턴',
        company: '네이버',
        location: '성남',
        description: 'Spring Boot와 Java를 활용한 백엔드 개발 인턴을 모집합니다.',
        requirements: ['Java', 'Spring Boot', 'MySQL'],
        salary: '월 220만원',
        type: 'INTERNSHIP',
        isRemote: false,
        tags: ['Java', 'Spring', '인턴십']
      },
      {
        title: '데이터 분석 아르바이트',
        company: '스타트업 A',
        location: '강남구',
        description: '마케팅 데이터 분석 및 보고서 작성을 도와주실 분을 찾습니다.',
        requirements: ['Python', 'Excel', '통계 기초'],
        type: 'PART_TIME',
        isRemote: true,
        tags: ['Python', '데이터분석', '재택']
      }
    ],
    skipDuplicates: true
  });

  console.log('시드 데이터 생성 완료');
  console.log(`테스트 계정: alice@university.ac.kr / password123`);
  console.log(`테스트 계정: bob@university.ac.kr / password123`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
