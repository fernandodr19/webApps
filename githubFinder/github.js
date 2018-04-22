class GitHub {
  constructor() {
    this.client_id = '';
    this.client_secret = '';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
      
    var xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', 'credentials.json', true);
    xmlReq.onreadystatechange = function() {
        if (xmlReq.readyState == 4 && xmlReq.status == "200") {
            const myCredentials = JSON.parse(xmlReq.responseText);
            this.client_id = myCredentials.client_id;
            this.client_secret = myCredentials.client_secret;
        }
    }
    xmlReq.send();
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}