const randomUrl = (min, max) => `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`

class RandomNumService {
  constructor () {

  }

  getRandom (min = 1, max = 6) {
    return fetch(randomUrl(min, max))
    .then(res => res.text())
    .then(num => parseInt(num))
  }
}

export default RandomNumService
