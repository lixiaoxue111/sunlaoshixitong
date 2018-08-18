import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    /* id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1) */
     id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    'tNum|18-60': 1,
    pNum: Mock.Random.cname(),
    fNum: Mock.Random.cname(),
    pSource: Mock.Random.cname(),
    start: Mock.Random.cname(),
    end: Mock.Random.cname(),
    funds: Mock.Random.cname(),
    accountOutlay: Mock.Random.cname(),
    yAccountOutlay: Mock.Random.cname(),
    accountTime: Mock.Random.cname(),
    first: Mock.Random.cname(),
    rank: Mock.Random.cname(),
    score: Mock.Random.cname(),
    category: Mock.Random.cname(),
    standard: Mock.Random.cname(),
    add: Mock.Random.cname(),
    reward: Mock.Random.cname()
  }));
}

export { LoginUsers, Users };
