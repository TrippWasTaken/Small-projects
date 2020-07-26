const url = 'https://api.github.com/users/'

class Repo {
  constructor(repodata) {
    this.name = repodata.name.split('-').join(' ')
    this.description = repodata.description
  }
}

class User {
  constructor(userdata) {
    this.username = userdata.login
    this.name = userdata.name
    this.email = userdata.email
    this.gistNum = userdata.public_gists
    this.avatar = userdata.avatar_url
    this.location = userdata.location
    this.repoURL = userdata.repos_url
  }

  async getRepos(url) {
    let res = await window.fetch(url)
    return res.json()
  }
}

function getInfo(user) {
  return new Promise((res, rej) => {
    window.fetch(url + user).then((res) => res.json()).then((userdata) => {
      res(new User(userdata))
    }).catch(e => {
      rej()
    })
  })
}

document.querySelector('#search-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.querySelector('#search').value;
    console.log(username)
    const nameEl = document.querySelector('#name')
    const usernameEl = document.querySelector('#username')
    const emailEl = document.querySelector('#email')
    const locationEl = document.querySelector('#location')
    const gistsEl = document.querySelector('#gists')
    const repoInfoEl = document.querySelector('#repo-info')

    getInfo(username).then(user => {
        console.log(user)
        user.getRepos(user.repoURL).then(jsonRepos => {

            nameEl.textContent = 'Name:\xa0' + user.name
            usernameEl.textContent = 'Username:\xa0' + user.username
            emailEl.textContent = 'Email:\xa0' + (user.email ? user.email : '-')
            locationEl.textContent = 'Location:\xa0' + (user.location ? user.location : '-')
            gistsEl.textContent = 'Number of Gists:\xa0' + user.gistNum
            document.querySelector('#user-img').src = user.avatar

            
          if (jsonRepos.length === 0)
            return
      
          let repos = jsonRepos.map(repo => new Repo(repo))
          console.log(repos)

          while(repoInfoEl.hasChildNodes()) {
            repoInfoEl.removeChild(repoInfoEl.firstChild)
          }
          
        repos.forEach((repo) => {
            let divWrapper = document.createElement('div')
    
            let header = document.createElement('h4')
            header.textContent = repo.name
    
            let desc = document.createElement('p')
            desc.textContent = repo.description ? repo.description : 'No description'
            divWrapper.appendChild(header)
            divWrapper.appendChild(desc)
            repoInfoEl.appendChild(divWrapper)
          })
          user.repos = repos
        })
      })
});