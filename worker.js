export default {
  async fetch(request) {

    const url = new URL(request.url)

    // 🔐 token protection
    if (url.searchParams.get("token") !== "abc123") {
      return new Response("Forbidden", { status: 403 })
    }

    // 🔍 allow only Clash clients
    const ua = request.headers.get("User-Agent") || ""

    const allowedUA = [
      "Clash",
      "clash",
      "Meta",
      "FiClash",
      "Stash",
      "okhttp"
    ]

    if (!allowedUA.some(a => ua.includes(a))) {
      return new Response("404 Not Found", { status: 404 })
    }

    // =========================
    // 📦 PROXY LIST ENDPOINT
    // =========================
    if (url.pathname === "/proxies") {

      const proxies = `
proxies:
  - name: "🇧🇩 BD 1"
    type: http
    server: 103.35.110.2
    port: 3232

  - name: "🇧🇩 BD 2"
    type: http
    server: 103.35.111.29
    port: 2327

  - name: "🇧🇩 BD 3"
    type: http
    server: 103.35.110.221
    port: 8267

  - name: "🇧🇩 BD 5"
    type: http
    server: 103.35.111.126
    port: 8267

  - name: "🇧🇩 BD 6"
    type: http
    server: 103.35.111.241
    port: 8267

  - name: "🇧🇩 BD 7"
    type: http
    server: 202.40.187.17
    port: 2327

    
`

      return new Response(proxies, {
        headers: { "Content-Type": "text/plain" }
      })
    }

    // =========================
    // ⚡ MAIN CONFIG
    // =========================
    const config = `
proxy-providers:
  myprovider:
    type: http
    url: "${url.origin}/proxies?token=abc123"
    interval: 3600
    path: ./proxies.yaml
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 60

proxy-groups:
  
  - name: SELECTOR🔥
    type: select
    proxies:
      - LOAD-BALANCE
      - STABLE
      
  - name: STABLE
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
    use:
      - myprovider

  - name: LOAD-BALANCE
    type: load-balance
    strategy: round-robin
    url: http://www.gstatic.com/generate_204
    interval: 60
    use:
      - myprovider

  - name: ALL
    type: select
    use:
      - myprovider


rules:
  # Google services → DIRECT
  - DOMAIN-SUFFIX,google.com,DIRECT
  - DOMAIN-SUFFIX,googleapis.com,DIRECT
  - DOMAIN-SUFFIX,gstatic.com,DIRECT
  - DOMAIN-SUFFIX,googlevideo.com,DIRECT
  - DOMAIN-SUFFIX,youtube.com,DIRECT
  - DOMAIN-SUFFIX,ytimg.com,DIRECT
  - DOMAIN-SUFFIX,ggpht.com,DIRECT
  - DOMAIN-SUFFIX,gvt1.com,DIRECT
  - DOMAIN-SUFFIX,gvt2.com,DIRECT
  - DOMAIN-SUFFIX,gvt3.com,DIRECT
  - DOMAIN-SUFFIX,android.com,DIRECT
  - DOMAIN-SUFFIX,gmail.com,DIRECT
  - DOMAIN-SUFFIX,googleusercontent.com,DIRECT

  # Chrome
  - DOMAIN-SUFFIX,chrome.com,DIRECT
  - DOMAIN-SUFFIX,chromium.org,DIRECT
  - DOMAIN-SUFFIX,googlezip.net,DIRECT

  # Firefox
  - DOMAIN-SUFFIX,mozilla.org,DIRECT
  - DOMAIN-SUFFIX,mozilla.com,DIRECT
  - DOMAIN-SUFFIX,mozilla.net,DIRECT
  - DOMAIN-SUFFIX,firefox.com,DIRECT
  - DOMAIN-SUFFIX,firefox.net,DIRECT

  # Everything else
  - MATCH,SELECTOR🔥
`

    return new Response(config, {
      headers: { "Content-Type": "text/plain" }
    })
  }
}
