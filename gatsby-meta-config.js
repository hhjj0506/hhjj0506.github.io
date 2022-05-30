module.exports = {
  title: `hhjj0506`,
  description: `이것저것 다 하는 블로그`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://hhjj0506.github.io/`,
  ogImage: `/profile.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `hhjj0506/hhjj0506.github.io`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `김형진`,
    bio: {
      role: `개발자`,
      description: ['새로운 것을 좋아하는', '집에 있기 좋아하는', '운동을 좋아하는'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/hhjj0506`, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `hhjj0506@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.06 ~ 08',
        activity: '같이배달 앱 개발',
        links: {
          github: 'https://github.com/marunemo/Hanchelin_Guide',
        },
      },
      {
        date: '2021.12 ~ 2022.02',
        activity: '대안학교 앱 개발',
        links: {
          github: 'https://github.com/Hayun218/CRA',
        },
      },
      {
        date: '2022.06 ~ ',
        activity: '실내 스마트팜 관리를 위한 드론의 3차원 위치 제어 기술 개발',
        links: {
          github: '',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '같이배달 앱 개발',
        description: '학교에서 배달음식을 시킬 때 학생들에게 배달비가 부담되는 문제가 있고, 같이 배달 시킬 사람을 찾는 방법이 제대로 활성화 되어있지 않아 학생들의 편의를 위해 같이 배달 시킬 사람을 찾는 앱을 개발하게 되었습니다. 개발 후 출전한 교내 대회에서 스마트 애플리케이션 공모전 부문 우수상을 수상했습니다.',
        techStack: ['react-native', 'firebase'],
        thumbnailUrl: 'hanchelin.png',
        links: {
          github: 'https://github.com/marunemo/Hanchelin_Guide',
        },
      },
      {
        title: '대안학교 앱 개발',
        description: '교내 전산 동아리에서 진행하게 된 신입 프로젝트입니다. 대안학교에서 교직원과 학부모, 학생들을 모두 이어줄 수 있는 플랫폼이 필요하다고 생각이 되어 개발을 진행하게 됐습니다.',
        techStack: ['flutter', 'firebase'],
        thumbnailUrl: '',
        links: {
          github: 'https://github.com/Hayun218/CRA',
        },
      },
      {
        title: '실내 스마트팜 관리를 위한 드론의 3차원 위치 제어 기술 개발',
        description: '여름방학부터 산업체와 같이 진행하게 되는 프로젝트입니다.',
        techStack: ['ros', 'linux', 'c++', 'python'],
        thumbnailUrl: '',
        links: {
          github: '',
        },
      },
    ],
  },
};
