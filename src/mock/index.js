import Mock from 'mockjs'
const { Random } = Mock
Mock.setup({
  timeout: '50-200'
})

Random.extend({
  pgm: function() {
    return this.pick(['张二', '李三', '王四'])
  },
  recentMonth: function() {
    return /2018-04-[012][0-9]/
  }
})
class Task {
  constructor() {
    this.code = 'yht6.0-1001'
  }
}

const a = new Task()
console.log(a)

const data = Mock.mock({
  'list|10': [{
    'index|+1': 1001,
    code: 'yht6.0-@index',
    name: '@ctitle(4,6)',
    pgm: '@pgm',
    devMembers: '',
    startDate: /2018-04-[012][0-9]/,
    tester: '',
    tMembers: '',
    testDate: /2018-05-[012][0-9]/,
    pdm: '@pgm',
    endDate: /2018-06-[012][0-9]/,
    bz: ''
  }]
})

console.log(data)

function getRowByCode(code) {
  return data.list.filter(item => item.code === code)[0]
}

Mock.mock('/api/projectList', 'get', req => {
  return {
    success: true,
    data: data
  }
})

Mock.mock('/api/projectUpdate', 'post', req => {
  const row = JSON.parse(req.body)
  const _old = getRowByCode(row.code)
  Object.assign(_old, row)
  return {
    success: true,
    data: []
  }
})
