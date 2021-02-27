const Mock = require('mockjs');
const Random = Mock.Random;

const produceNewsData = function() {
    let randomList = [];
    for (let i = 0; i < 100; i++) {
      randomList.push(Random.integer(-1000,1000))
    }
    return {
        randomList: randomList
    }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'get', produceNewsData);
